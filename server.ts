import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Emergency red flags in pregnancy
const RED_FLAG_KEYWORDS = [
  'heavy bleeding', 'severe bleeding', 'fluid leaking', 'water broke early',
  'severe headache', 'blurred vision', 'seeing spots', 'chest pain',
  'difficulty breathing', 'severe abdominal pain', 'no kicks', 'baby stopped moving',
  'खून बहना', 'पानी गिरना', 'बच्चे की हलचल बंद', 'तेज पेट दर्द'
];

// Server-side Gemini AI endpoint for MaternaNest Guide
app.post('/api/guide', async (req: Request, res: Response) => {
  try {
    const { message, week, language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const lowerMsg = message.toLowerCase();
    const hasRedFlag = RED_FLAG_KEYWORDS.some(kw => lowerMsg.includes(kw.toLowerCase()));

    // If Gemini API is not configured or in development without key, provide structured response
    if (!aiClient) {
      const fallbackResponse = language === 'hi'
        ? `[अस्वीकरण: यह केवल शैक्षिक मार्गदर्शन है, चिकित्सकीय परामर्श नहीं।]

नमस्ते! MaternaNest गाइड में आपका स्वागत है। आपके प्रश्न के संबंध में:
गर्भावस्था के दौरान किसी भी नई दवा, लक्षण या आहार परिवर्तन से पहले अपने पंजीकृत स्त्री रोग विशेषज्ञ (Gynecologist/Obstetrician) से परामर्श अवश्य लें।

भारत सरकार के स्वास्थ्य और परिवार कल्याण मंत्रालय (MoHFW) एवं WHO के अनुसार:
1. नियमित प्रसवपूर्व जांच (ANC) और आयरन-फ़ोलिक एसिड (IFA) का सेवन आवश्यक है।
2. संतुलित आहार लें: हरी सब्जियां, दालें, दूध व पर्याप्त पानी।
3. यदि कोई तीव्र दर्द, रक्तस्राव या तरल स्राव हो, तो तुरंत निकटतम अस्पताल या एम्बुलेंस (108 / 102) से संपर्क करें।`
        : `[Clinical Disclaimer: This response is for educational purposes only and does not constitute medical advice, diagnosis, or treatment.]

Hello! Welcome to MaternaNest Guide. 
Regarding your question:
Always consult your registered obstetrician/gynecologist before starting any supplement, medication, or introducing changes to your prenatal routine.

Per guidelines from the Ministry of Health and Family Welfare (MoHFW, India) and the World Health Organization (WHO):
1. Routine antenatal checkups (ANC) and appropriate Iron & Folic Acid (IFA) supplementation are foundational for maternal and fetal well-being.
2. Maintain a balanced diet rich in leafy greens, protein, calcium, and adequate hydration.
3. Note: If you experience sharp abdominal pain, vaginal bleeding, fluid leakage, or noticeably reduced fetal movements, contact your healthcare provider or maternity emergency services (such as 108/102 in India) without delay.`;

      res.json({
        reply: fallbackResponse,
        hasRedFlag,
        isFallback: true,
        sources: [
          'Ministry of Health and Family Welfare (MoHFW), Govt. of India',
          'World Health Organization (WHO) Maternal & Newborn Health',
          'Federation of Obstetric and Gynaecological Societies of India (FOGSI)'
        ]
      });
      return;
    }

    const systemInstruction = `You are "MaternaNest Guide", an empathetic, highly knowledgeable, and calm maternal health educator on the MaternaNest website.
Current context: User is inquiring about pregnancy ${week ? `at Week ${week}` : ''}.
Language requested: ${language === 'hi' ? 'Hindi (हिंदी)' : 'English'}.

STRICT CLINICAL RULES:
1. Always maintain a warm, reassuring, non-judgmental tone.
2. NEVER prescribe medications or make a clinical diagnosis. Always remind the user that this is educational guidance and their personal obstetrician/healthcare team knows their specific medical history best.
3. If the user mentions any emergency or red-flag symptoms (such as vaginal bleeding, sudden gush of fluid, severe constant abdominal pain, high fever, severe persistent headache, visual disturbances like spots or aura, sudden facial swelling, or significant reduction/absence of fetal movement):
   - You MUST immediately and prominently urge them to seek in-person medical evaluation or call emergency services (108/102 in India or their local emergency helpline).
4. Respect cultural context for Indian mothers (address queries about Indian foods, desi ghee, saffron milk, papaya, coconut water, etc. with modern medical nuance: e.g., ripe papaya in moderation is safe while unripe/semi-ripe contains latex and should be avoided; desi ghee in moderation is fine for calories but does not "lubricate the birth canal").
5. Reference trusted authorities when discussing standards (Ministry of Health & Family Welfare MoHFW, WHO, FOGSI, ACOG).
6. Keep responses clear, beautifully formatted with concise paragraphs or bullet points, and under 250 words.`;

    const promptText = `User Question: "${message}"\n${week ? `Current Gestational Week: Week ${week}` : ''}\nPlease provide a supportive, evidence-based educational answer in ${language === 'hi' ? 'Hindi' : 'English'}.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || '';

    res.json({
      reply,
      hasRedFlag,
      isFallback: false,
      sources: [
        'Ministry of Health and Family Welfare (MoHFW), Govt. of India',
        'World Health Organization (WHO) Maternal & Newborn Guidelines',
        'Federation of Obstetric and Gynaecological Societies of India (FOGSI)'
      ]
    });
  } catch (error) {
    console.error('Gemini API Guide error:', error);
    res.status(500).json({
      error: 'Failed to generate guidance',
      fallbackText: 'Our educational assistant is temporarily unavailable. Please consult your healthcare provider or refer to our Educational Library for verified information.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    product: 'MaternaNest',
    timestamp: new Date().toISOString(),
    aiEnabled: Boolean(apiKey),
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MaternaNest server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

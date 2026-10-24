import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, ShieldAlert, AlertTriangle, ExternalLink, Bot, User } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  hasRedFlag?: boolean;
  sources?: string[];
  timestamp: string;
}

interface MaternaNestGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentWeek?: number;
}

export const MaternaNestGuideModal: React.FC<MaternaNestGuideModalProps> = ({
  isOpen,
  onClose,
  language,
  currentWeek = 20
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text:
        language === 'hi'
          ? `नमस्ते! मैं आपका MaternaNest गाइड हूँ।\n\nमैं गर्भावस्था, पोषण, शारीरिक बदलाव, जांच व प्रसव की तैयारियों से जुड़े आपके प्रश्नों के साक्ष्य-आधारित उत्तर देने के लिए यहाँ हूँ।\n\n[कृपया ध्यान दें: यह केवल शैक्षिक मार्गदर्शन है। किसी भी व्यक्तिगत चिकित्सकीय निदान या असामान्य लक्षण के लिए सदैव अपने डॉक्टर से संपर्क करें।]`
          : `Hello! I am your MaternaNest Guide.\n\nI am here to answer your questions regarding fetal development, maternal nutrition, recommended clinical tests, and childbirth preparation based on established public health guidelines (MoHFW India, WHO, and ACOG).\n\n[Clinical Notice: I provide evidence-based education, not medical diagnoses. Always consult your obstetrician for personal medical care.]`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: [
        'Ministry of Health & Family Welfare (MoHFW), Govt. of India',
        'World Health Organization (WHO) Maternal Care'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = translations[language].guide;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (userPrompt?: string) => {
    const promptToSend = (userPrompt || input).trim();
    if (!promptToSend || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptToSend,
          week: currentWeek,
          language
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || data.fallbackText,
        hasRedFlag: data.hasRedFlag,
        sources: data.sources || [
          'Ministry of Health & Family Welfare (MoHFW), Govt. of India',
          'World Health Organization (WHO)'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text:
          language === 'hi'
            ? 'क्षमा करें, इस समय गाइड सर्वर से संपर्क नहीं हो पा रहा है। कृपया हमारे ज्ञान केंद्र (Library) में प्रमाणित लेख पढ़ें अथवा अपने डॉक्टर से संपर्क करें।'
            : 'Our educational assistant encountered a network connection issue. Please explore our Educational Library for verified guidance or consult your healthcare team.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FAF7F2] border border-[#E3D7C7] rounded-3xl max-w-2xl w-full h-[85vh] max-h-[720px] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1B4958] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D97757] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                {t.title}
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider font-semibold">
                  AI Education
                </span>
              </h3>
              <p className="text-xs text-[#FAD2C0] leading-none mt-0.5">
                {t.subtitle} {currentWeek ? `• Week ${currentWeek}` : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clinical Disclaimer Bar */}
        <div className="px-4 py-2 bg-[#F3EADE] border-b border-[#E3D7C7] text-[11px] text-[#715442] flex items-center gap-2 shrink-0">
          <ShieldAlert className="w-3.5 h-3.5 text-[#D97757] shrink-0" />
          <span>{t.disclaimer}</span>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#1B4958] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-[#1B4958] text-white rounded-br-xs'
                    : 'bg-white border border-[#E3D7C7] text-[#272B35] rounded-bl-xs'
                }`}
              >
                {msg.hasRedFlag && (
                  <div className="mb-2 p-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-1.5 font-medium">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>
                      {language === 'hi'
                        ? 'सावधानी: यह लक्षण आपातकालीन जांच की मांग कर सकता है। तुरंत डॉक्टर या 108/102 एम्बुलेंस से संपर्क करें।'
                        : 'Alert: Your query mentions potential emergency symptoms. Please seek in-person evaluation or call 108/102 immediately.'}
                    </span>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[#EFE5D7] text-[11px] text-[#786C5E]">
                    <span className="font-semibold text-[#1B4958] flex items-center gap-1 mb-1">
                      <ExternalLink className="w-3 h-3 text-[#D97757]" />
                      {t.sources}:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {msg.sources.map((src, idx) => (
                        <li key={idx}>{src}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <span
                  className={`block text-[10px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-[#A09385]'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#D97757] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-[#718096]">
              <div className="w-8 h-8 rounded-full bg-[#1B4958] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-[#E3D7C7] rounded-2xl px-4 py-3 text-[#1B4958] font-medium flex items-center gap-2">
                <span>{language === 'hi' ? 'MaternaNest गाइड विचार कर रहा है...' : 'MaternaNest Guide is reviewing clinical guidelines...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div className="px-4 py-2 border-t border-[#EAE0D2] bg-[#FAF5EE] overflow-x-auto flex gap-2 shrink-0">
          {t.suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-white hover:bg-[#F2ECE1] border border-[#D7CABA] text-[#1B4958] font-medium transition cursor-pointer shrink-0 shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white border-t border-[#E3D7C7] flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#D7CABA] bg-[#FAF7F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4958] text-[#272B35]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-[#1B4958] hover:bg-[#123844] disabled:opacity-40 text-white font-medium text-sm transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t.send}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

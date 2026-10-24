# MaternaNest — Pregnancy Education, Tracking, & Maternal Wellness Platform

A production-grade, privacy-first pregnancy education and clinical tracking companion for expectant mothers, partners, and healthcare educators.

## Key Features

1. **Gestational Age & Due Date Calculator**
   - Naegele's rule calculation with menstrual cycle length adjustments (21 to 35 days).
   - Real-time calculation of completed weeks and days, current trimester, remaining days until EDD, and journey progress percentage.
   - Non-guarantee clinical notice: clearly communicates that only ~4-5% of births occur on the exact EDD and full term spans 37–42 weeks.

2. **40-Week Comprehensive Timeline & Development Deep Dive**
   - Individual dedicated views for all 40 weeks with trimester filtering.
   - Fetal size comparisons with both international and Indian references (e.g., mustard seed, cardamom, amla, Alphonso mango, tender coconut, winter melon).
   - Organ development details, anatomical milestones, and mother's bodily changes.
   - Clinical tests aligned with Indian Ministry of Health & Family Welfare (MoHFW) and WHO guidelines (NT scan, level-2 anomaly scan, OGTT gestational diabetes testing, Td vaccination, and GBS screening).
   - Questions to ask your obstetrician at each stage, with a one-click button to save questions directly into the Appointment Planner.
   - Clinical red-flag emergency symptoms that mandate immediate medical contact.

3. **Evidence-Based Educational Library**
   - Searchable, categorized repository (Fetal Development, Nutrition & Diet, Prenatal Care, Safe Activity & Yoga, Labour & Delivery, Breastfeeding, Newborn Care, Postpartum Mental Health, Indian Traditions & Garbh Sanskar, and Medical Glossary).
   - Bookmark saving, reading time indicators, and verified peer-reviewed citations.
   - Dedicated print-friendly reader with sharing support.

4. **Prenatal Appointment Planner**
   - Track routine visits, ultrasound scans, blood work, and pediatric checkups.
   - Attach customized doctor question checklists to any appointment.
   - RFC-5545 iCalendar (`.ics`) export: import scheduled visits directly into Google Calendar, Apple Calendar, or Outlook without needing 3rd-party OAuth.

5. **Interactive Checklists & Birth Preparedness**
   - Hospital Bag for Mother, Baby, and Partner.
   - Birth Preparation and Newborn Essentials checklists with real-time percentage completion indicators.
   - Ability to add custom items, remove items, or reset to defaults.

6. **Pregnancy Journal & Milestones**
   - Private daily reflections with mood check-in (peaceful, joyful, tired, anxious, excited, nauseous).
   - Common pregnancy symptoms tracking and belly circumference measurements.
   - Milestone badges (First Heartbeat, First Kicks "Quickening", Level-2 Scan, Godh Bharai / Baby Shower).
   - Printable journal view and JSON backup export.

7. **Clinical Educational Tools**
   - **Contraction Timer:** Live duration and frequency timing with the clinical 5-1-1 active labor indicator ("Contractions every 5 minutes, lasting 1 minute, for at least 1 hour").
   - **Fetal Movement (Kick) Counter:** Clinical "Count-to-10" session tool with elapsed timer and safety guidance for reduced movements.

8. **MaternaNest Guide (Server-Side Gemini AI)**
   - Powered by Gemini (`gemini-3.8-flash`) via an Express server route (`/api/guide`).
   - Clinical guardrails: non-diagnostic disclaimer, emergency triage detection, and references to MoHFW India, WHO, and FOGSI guidelines.
   - Cultural awareness: addresses queries about Indian foods (papaya myth vs reality, desi ghee, kesar milk, saffron) with modern nutritional nuance.
   - Graceful offline fallback if the API key or internet connection is unavailable.

9. **Bilingual Localization (English & Hindi - हिन्दी)**
   - Seamless one-click switch between English and Hindi across the entire interface, timeline descriptions, tool labels, and emergency banners.

10. **Privacy, Security & Data Ownership**
    - Client-side data persistence with zero ad tracking.
    - DPDP Act and GDPR compliance with one-click JSON data export and permanent data wipe options.

---

## Technical Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons.
- **Backend:** Node.js, Express, tsx.
- **AI Integration:** `@google/genai` TypeScript SDK (server-side only via `/api/guide`).
- **Calendar:** Client-generated RFC-5545 `.ics` export.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000` with Express backend and Vite middleware.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Start in production:**
   ```bash
   npm start
   ```

import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  Sparkles,
  ClipboardList,
  Heart,
  Activity,
  User,
  Menu,
  X,
  Globe,
  Clock
} from 'lucide-react';
import { Language, GestationalInfo, PregnancyProfile } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  gestationalInfo: GestationalInfo;
  profile: PregnancyProfile;
  onOpenProfile: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  gestationalInfo,
  profile,
  onOpenProfile,
  onOpenGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems = [
    { id: 'home', label: language === 'hi' ? 'होम' : 'Home', icon: Heart },
    { id: 'tracker', label: t.tracker, icon: Clock },
    { id: 'library', label: t.library, icon: BookOpen },
    { id: 'planner', label: t.planner, icon: Calendar },
    { id: 'checklists', label: t.checklists, icon: ClipboardList },
    { id: 'journal', label: t.journal, icon: Heart },
    { id: 'tools', label: t.tools, icon: Activity }
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DFD1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#1B4958] flex items-center justify-center text-[#FDFBF7] shadow-sm group-hover:bg-[#123844] transition-colors">
              {/* Custom Maternal Nest SVG icon */}
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
                <path d="M12 7c-2.5 0-4 1.8-4 4 0 2.8 3.5 6 4 6.5.5-.5 4-3.7 4-6.5 0-2.2-1.5-4-4-4Z" fill="#D97757" stroke="none" />
                <path d="M9 16c1 .8 2 1.2 3 1.2s2-.4 3-1.2" />
              </svg>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold tracking-tight text-[#1B4958] leading-none">
                MaternaNest
              </span>
              <span className="text-[11px] font-medium tracking-wider text-[#A26D55] uppercase mt-1 block">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1B4958] text-white shadow-sm'
                      : 'text-[#4A5568] hover:text-[#1B4958] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FAD2C0]' : 'text-[#8C7A6B]'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Language Toggle, AI Guide, Profile / Gestational pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              title={t.switchLanguage}
              className="px-2.5 py-1.5 rounded-lg border border-[#DACFBF] bg-white text-xs font-semibold text-[#1B4958] hover:bg-[#F6EFE5] transition flex items-center gap-1.5 shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-[#D97757]" />
              <span className="hidden sm:inline">{language === 'en' ? 'हिन्दी' : 'English'}</span>
              <span className="sm:hidden">{language === 'en' ? 'HI' : 'EN'}</span>
            </button>

            {/* AI Guide Trigger */}
            <button
              onClick={onOpenGuide}
              className="px-3 py-1.5 rounded-xl bg-[#D97757] hover:bg-[#C26244] text-white text-xs sm:text-sm font-medium transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FFF0EB]" />
              <span className="hidden sm:inline">{t.guide}</span>
              <span className="sm:hidden">AI Guide</span>
            </button>

            {/* Gestational Badge / Profile Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#DACFBF] bg-white hover:bg-[#F7F2E9] text-xs transition cursor-pointer text-left shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#1B4958]/10 text-[#1B4958] flex items-center justify-center font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="hidden md:block leading-tight">
                <div className="font-semibold text-[#272B35]">
                  {profile.userName ? profile.userName.split(' ')[0] : t.guest}
                </div>
                {gestationalInfo.isValid && (
                  <div className="text-[10px] text-[#D97757] font-medium">
                    {language === 'hi' ? `सप्ताह ${gestationalInfo.weeks}` : `Week ${gestationalInfo.weeks}+${gestationalInfo.days}`}
                  </div>
                )}
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1B4958] hover:bg-[#EFE7D8] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6F0] border-b border-[#E4DACB] px-4 pt-2 pb-6 space-y-1.5 shadow-lg animate-in slide-in-from-top duration-200">
          {gestationalInfo.isValid && (
            <div className="p-3 mb-2 rounded-xl bg-white border border-[#E4DACB] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#718096]">Current Gestation:</span>
                <p className="font-bold text-sm text-[#1B4958]">
                  Week {gestationalInfo.weeks}, Day {gestationalInfo.days} ({gestationalInfo.daysRemaining} days left)
                </p>
              </div>
              <button
                onClick={() => {
                  onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#D97757] font-semibold underline"
              >
                Edit Dates
              </button>
            </div>
          )}

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#1B4958] text-white'
                    : 'text-[#4A5568] hover:bg-[#EFE8DC]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FAD2C0]' : 'text-[#8C7A6B]'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

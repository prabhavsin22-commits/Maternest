import React, { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Printer,
  RotateCcw,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { ChecklistItem, ChecklistCategory, Language } from '../types';
import { translations } from '../i18n/translations';
import { DEFAULT_CHECKLISTS } from '../data/defaultChecklists';

interface ChecklistsViewProps {
  language: Language;
  checklists: ChecklistItem[];
  onSaveChecklists: (items: ChecklistItem[]) => void;
}

export const ChecklistsView: React.FC<ChecklistsViewProps> = ({
  language,
  checklists,
  onSaveChecklists
}) => {
  const [activeCategory, setActiveCategory] = useState<ChecklistCategory>('bag-mom');
  const [newItemText, setNewItemText] = useState('');

  const isHindi = language === 'hi';
  const t = translations[language].checklists;

  const categories: Array<{ id: ChecklistCategory; label: string }> = [
    { id: 'bag-mom', label: t.tabs.mom },
    { id: 'bag-baby', label: t.tabs.baby },
    { id: 'bag-partner', label: t.tabs.partner },
    { id: 'birth-prep', label: t.tabs.birthPrep },
    { id: 'baby-essentials', label: t.tabs.essentials }
  ];

  const currentItems = checklists.filter(i => i.category === activeCategory);
  const completedCount = currentItems.filter(i => i.isDone).length;
  const totalCount = currentItems.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleItem = (id: string) => {
    const updated = checklists.map(item =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    onSaveChecklists(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: activeCategory,
      text: {
        en: newItemText.trim(),
        hi: newItemText.trim()
      },
      isDone: false,
      isCustom: true
    };

    onSaveChecklists([...checklists, newItem]);
    setNewItemText('');
  };

  const handleDeleteItem = (id: string) => {
    const updated = checklists.filter(item => item.id !== id);
    onSaveChecklists(updated);
  };

  const handleResetCategory = () => {
    if (confirm(isHindi ? 'क्या आप इस चेकलिस्ट को प्रारंभिक अवस्था में रीसेट करना चाहते हैं?' : 'Reset this category to default checklist?')) {
      const defaultItemsForCat = DEFAULT_CHECKLISTS.filter(i => i.category === activeCategory);
      const otherItems = checklists.filter(i => i.category !== activeCategory);
      onSaveChecklists([...otherItems, ...defaultItemsForCat]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E3D7C7] no-print">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
            {isHindi ? 'प्रसव एवं अस्पताल तैयारी' : 'Birth Preparedness'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B4958] mt-1">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#55606E] max-w-2xl mt-1.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-[#DACFBF] bg-white hover:bg-[#F2ECE1] text-[#1B4958] text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4 text-[#D97757]" />
            <span>{isHindi ? 'प्रिंट करें' : 'Print Checklist'}</span>
          </button>

          <button
            onClick={handleResetCategory}
            className="px-4 py-2.5 rounded-xl border border-[#DACFBF] bg-white hover:bg-[#F2ECE1] text-[#4A5568] text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-2xs"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <span>{t.resetBtn}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-print">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-[#1B4958] text-white shadow-xs'
                  : 'bg-white border border-[#DACFBF] text-[#4A5568] hover:bg-[#F2ECE1]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Category Progress Bar Card */}
      <div className="bg-white rounded-3xl border border-[#E3D7C7] p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1B4958]">
              {categories.find(c => c.id === activeCategory)?.label}
            </h3>
            <p className="text-xs text-[#718096] mt-0.5">
              {t.progress
                .replace('{completed}', completedCount.toString())
                .replace('{total}', totalCount.toString())
                .replace('{percent}', progressPercent.toString())}
            </p>
          </div>

          <span className="text-2xl font-serif font-bold text-[#D97757]">
            {progressPercent}%
          </span>
        </div>

        {/* Bar */}
        <div className="h-3 w-full bg-[#EAE0D2] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D97757] to-[#1B4958] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Add Item Input Form */}
        <form onSubmit={handleAddItem} className="flex gap-2 pt-2 no-print">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder={t.addItemPlaceholder}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#D7CABA] bg-[#FAF7F2] text-sm text-[#272B35] focus:outline-none focus:ring-2 focus:ring-[#1B4958]"
          />
          <button
            type="submit"
            disabled={!newItemText.trim()}
            className="px-5 py-2.5 rounded-xl bg-[#1B4958] hover:bg-[#123844] disabled:opacity-40 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addBtn}</span>
          </button>
        </form>

        {/* Item List */}
        <div className="space-y-2.5 pt-2">
          {currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleItem(item.id)}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                item.isDone
                  ? 'bg-[#F5FBF7] border-emerald-200'
                  : 'bg-white border-[#E4DACB] hover:border-[#1B4958]'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  className="mt-0.5 text-emerald-600 focus:outline-none"
                >
                  {item.isDone ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#8C7A6B]" />
                  )}
                </button>
                <div className="space-y-0.5">
                  <span
                    className={`text-xs sm:text-sm font-medium leading-relaxed block ${
                      item.isDone ? 'line-through text-[#718096]' : 'text-[#272B35]'
                    }`}
                  >
                    {isHindi ? item.text.hi : item.text.en}
                  </span>
                  {item.isCustom && (
                    <span className="text-[10px] text-[#D97757] font-semibold uppercase tracking-wider block">
                      Custom item
                    </span>
                  )}
                </div>
              </div>

              {item.isCustom && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(item.id);
                  }}
                  className="text-red-400 hover:text-red-600 p-1 rounded-lg transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

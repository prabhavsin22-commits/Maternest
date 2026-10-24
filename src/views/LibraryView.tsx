import React, { useState, useMemo } from 'react';
import { Search, Bookmark, Clock, ArrowRight, BookOpen, X, Sparkles } from 'lucide-react';
import { Article, ArticleCategory, Language } from '../types';
import { translations } from '../i18n/translations';
import { ARTICLES_DATA } from '../data/articlesData';

interface LibraryViewProps {
  language: Language;
  bookmarks: string[];
  onToggleBookmark: (articleId: string) => void;
  onOpenArticle: (article: Article) => void;
  onOpenGuide: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  language,
  bookmarks,
  onToggleBookmark,
  onOpenArticle,
  onOpenGuide
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all' | 'saved'>('all');

  const isHindi = language === 'hi';
  const t = translations[language].library;

  const categories: Array<{ id: ArticleCategory | 'all' | 'saved'; label: string }> = [
    { id: 'all', label: t.categories.all },
    { id: 'saved', label: `${isHindi ? 'सहेजे गए' : 'Saved'} (${bookmarks.length})` },
    { id: 'nutrition', label: t.categories.nutrition },
    { id: 'prenatal', label: t.categories.prenatal },
    { id: 'development', label: t.categories.development },
    { id: 'activity', label: t.categories.activity },
    { id: 'labour', label: t.categories.labour },
    { id: 'breastfeeding', label: t.categories.breastfeeding },
    { id: 'postpartum', label: t.categories.postpartum },
    { id: 'traditions', label: t.categories.traditions },
    { id: 'glossary', label: t.categories.glossary }
  ];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      // Category filter
      if (selectedCategory === 'saved') {
        if (!bookmarks.includes(art.id)) return false;
      } else if (selectedCategory !== 'all') {
        if (art.category !== selectedCategory) return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const titleMatch =
        art.title.en.toLowerCase().includes(q) || art.title.hi.toLowerCase().includes(q);
      const excerptMatch =
        art.excerpt.en.toLowerCase().includes(q) || art.excerpt.hi.toLowerCase().includes(q);
      const tagMatch = art.tags.some(tag => tag.toLowerCase().includes(q));

      return titleMatch || excerptMatch || tagMatch;
    });
  }, [searchQuery, selectedCategory, bookmarks]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title & Search Header */}
      <div className="space-y-4 pb-6 border-b border-[#E3D7C7]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
              {isHindi ? 'प्रमाणित ज्ञान केंद्र' : 'Knowledge Repository'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B4958] mt-1">
              {t.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#55606E] max-w-2xl mt-1.5 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onOpenGuide}
            className="px-4 py-2.5 rounded-xl bg-[#D97757] hover:bg-[#C26244] text-white text-xs font-semibold transition flex items-center gap-2 shrink-0 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FAD2C0]" />
            <span>{isHindi ? 'AI गाइड से पूछें' : 'Ask MaternaNest Guide'}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 text-[#8C7A6B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-[#DACFBF] bg-white text-sm text-[#272B35] focus:outline-none focus:ring-2 focus:ring-[#1B4958] shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#272B35]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
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

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => {
            const isBookmarked = bookmarks.includes(art.id);
            return (
              <article
                key={art.id}
                className="bg-white rounded-3xl border border-[#E3D7C7] p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#D97757] text-[11px] font-bold uppercase tracking-wider">
                      {art.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(art.id);
                      }}
                      className={`p-1.5 rounded-lg border transition ${
                        isBookmarked
                          ? 'bg-[#FAF2EB] border-[#D97757] text-[#D97757]'
                          : 'border-[#E4DACB] text-[#8C7A6B] hover:bg-[#FAF6F0]'
                      }`}
                      title={isBookmarked ? t.bookmarked : t.bookmark}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#D97757]' : ''}`} />
                    </button>
                  </div>

                  <h3
                    onClick={() => onOpenArticle(art)}
                    className="font-serif text-lg font-bold text-[#1B4958] group-hover:text-[#D97757] transition leading-snug cursor-pointer"
                  >
                    {isHindi ? art.title.hi : art.title.en}
                  </h3>

                  <p className="text-xs text-[#55606E] line-clamp-3 leading-relaxed">
                    {isHindi ? art.excerpt.hi : art.excerpt.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0E6D8] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#718096]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readingTime} min
                    </span>
                    <span className="text-[11px] text-[#8C7A6B] truncate max-w-[150px]">
                      {art.author}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenArticle(art)}
                    className="w-full py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#1B4958] text-[#1B4958] hover:text-white border border-[#E3D7C7] hover:border-[#1B4958] text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{t.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#E3D7C7] space-y-3 max-w-lg mx-auto">
          <BookOpen className="w-10 h-10 text-[#8C7A6B] mx-auto opacity-50" />
          <h3 className="font-serif text-lg font-bold text-[#1B4958]">
            {isHindi ? 'कोई लेख नहीं मिला' : 'No Articles Found'}
          </h3>
          <p className="text-xs text-[#718096]">
            {isHindi
              ? 'कृपया अपनी खोज शब्द बदलें या सभी श्रेणियों का चयन करें।'
              : 'Try adjusting your search terms or clearing the category filter.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#1B4958] text-white text-xs font-medium hover:bg-[#123844] transition mt-2 cursor-pointer"
          >
            {isHindi ? 'खोज साफ़ करें' : 'Reset Filters'}
          </button>
        </div>
      )}
    </div>
  );
};

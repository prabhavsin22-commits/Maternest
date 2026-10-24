import React from 'react';
import { X, Bookmark, Printer, Share2, ExternalLink, ShieldCheck, Clock, User } from 'lucide-react';
import { Article, Language } from '../types';

interface ArticleDetailModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isOpen,
  onClose,
  language,
  isBookmarked,
  onToggleBookmark
}) => {
  if (!isOpen || !article) return null;

  const isHindi = language === 'hi';

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isHindi ? article.title.hi : article.title.en,
        text: isHindi ? article.excerpt.hi : article.excerpt.en,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF7F2] border border-[#E3D7C7] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#1B4958] text-white flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-[#CAD9DD]">• {article.readingTime} min read</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl border border-white/20 transition ${
                isBookmarked ? 'bg-[#D97757] text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Save Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
              title="Print Article"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#FAF7F2]">
          {/* Title Area */}
          <div className="space-y-3 pb-6 border-b border-[#E8DFC2]">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B4958] leading-tight">
              {isHindi ? article.title.hi : article.title.en}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#718096]">
              <span className="flex items-center gap-1.5 text-[#272B35] font-medium">
                <User className="w-3.5 h-3.5 text-[#D97757]" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8C7A6B]" />
                Reviewed: {article.lastReviewed}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                MoHFW & WHO Aligned
              </span>
            </div>
          </div>

          {/* Excerpt Lead */}
          <div className="p-4 rounded-2xl bg-[#F4EDE2] border border-[#DECDBB] text-sm sm:text-base font-serif italic text-[#1B4958] leading-relaxed">
            "{isHindi ? article.excerpt.hi : article.excerpt.en}"
          </div>

          {/* Main Content with Markdown-style rendering */}
          <div className="prose prose-sm sm:prose max-w-none text-[#272B35] leading-relaxed space-y-4">
            {(isHindi ? article.content.hi : article.content.en)
              .split('\n\n')
              .map((block, idx) => {
                if (block.startsWith('### ')) {
                  return (
                    <h2 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-[#1B4958] pt-4 pb-1">
                      {block.replace('### ', '')}
                    </h2>
                  );
                }
                if (block.startsWith('#### ')) {
                  return (
                    <h3 key={idx} className="font-serif text-lg font-bold text-[#D97757] pt-2">
                      {block.replace('#### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('- ')) {
                  const items = block.split('\n- ');
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1.5 text-sm text-[#4A5568]">
                      {items.map((it, i) => (
                        <li key={i}>{it.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                    {block}
                  </p>
                );
              })}
          </div>

          {/* Authoritative Sources Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#E3D7C7] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4958] flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-[#D97757]" />
              {isHindi ? 'संदर्भित प्रमाण एवं सार्वजनिक स्वास्थ्य स्रोत' : 'Authoritative Medical & Public Health Sources'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#55606E]">
              {article.sources.map((src, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#D97757] font-bold">•</span>
                  <span>{src}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Notice */}
          <div className="p-4 rounded-xl bg-[#FFF8F5] border border-[#F2D0C6] text-xs text-[#7C2D12]">
            <p>
              <strong>{isHindi ? 'महत्वपूर्ण सूचना:' : 'Clinical Disclaimer:'}</strong>{' '}
              {isHindi
                ? 'यह लेख केवल स्वास्थ्य जागरूकता और शिक्षा के लिए है। किसी भी दवा, सप्लीमेंट या लक्षण के उपचार के लिए अपने प्रसूति रोग विशेषज्ञ से परामर्श अवश्य लें।'
                : 'This article is prepared for educational purposes and should not be substituted for direct medical advice from your physician.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

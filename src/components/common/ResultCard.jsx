import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, RotateCcw, Info, Check, ArrowRight, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResultCard = ({ title, value, unit, subText, onReset, relatedLinks = [], tooltip }) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [shareToast, setShareToast] = useState(false);

    const handleCopy = () => {
        if (!value) return;
        navigator.clipboard.writeText(value.toString().replace(/,/g, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        const shareData = {
            title: title || '계산 결과',
            text: `${title || '계산 결과'}: ${value} ${unit || ''}\n자세한 결과는 모든 계산기에서 확인하세요!`,
            url: window.location.href,
        };

        if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent.toLowerCase())) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
            setShareToast(true);
            setTimeout(() => setShareToast(false), 3000);
        }
    };

    return (
        <div className="mt-6">
            {/* Desktop / Default View */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-[28px] p-8 relative shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/40 dark:bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                        {title || t('result')}
                        {tooltip && (
                            <div className="relative">
                                <Info
                                    size={16}
                                    className="cursor-pointer hover:text-blue-600"
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                />
                                {showTooltip && (
                                    <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-900 text-white text-xs p-2 rounded shadow-lg z-50">
                                        {tooltip}
                                    </div>
                                )}
                            </div>
                        )}
                    </h4>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className="p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 transition-colors"
                            title={t('copy')}
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        {onReset && (
                            <button
                                onClick={onReset}
                                className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 transition-colors"
                                title={t('reset')}
                            >
                                <RotateCcw size={18} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="text-4xl font-bold text-blue-700 dark:text-blue-400 break-all">
                    {value} <span className="text-xl font-normal text-blue-500">{unit}</span>
                </div>
                {subText && <p className="mt-2 text-sm text-blue-600/80 dark:text-blue-300/80">{subText}</p>}

                <div className="mt-6">
                    <button
                        onClick={handleShare}
                        className="w-full flex justify-center items-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-2xl shadow-md transition-all hover:-translate-y-0.5"
                    >
                        <Share2 size={20} />
                        {t('action_share', '결과 공유하기')}
                    </button>
                </div>

                {copied && (
                    <div className="absolute top-4 right-16 bg-black/75 text-white text-xs px-2 py-1 rounded fade-in">
                        Copied!
                    </div>
                )}
                {shareToast && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-gray-800 text-white text-sm px-4 py-2 rounded-full fade-in z-50 whitespace-nowrap shadow-lg">
                        결과와 링크가 클립보드에 복사되었습니다!
                    </div>
                )}
            </div>

            {/* Mobile View (Result Only - Unfixed) */}
            <div className="mt-4 bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl p-5 md:hidden shadow-sm relative overflow-visible">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="max-w-[70%] overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <span className="text-xs text-blue-600/80 dark:text-gray-400 block font-medium mb-1">{title || t('result')}</span>
                        <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">{value} <span className="text-base font-normal text-blue-500">{unit}</span></span>
                    </div>
                    <div className="flex gap-2 relative z-10">
                        <button onClick={handleCopy} className="p-2 bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl transition-colors" title={t('copy')}>
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-blue-600 dark:text-blue-400" />}
                        </button>
                        {onReset && (
                            <button onClick={onReset} className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl text-red-500 transition-colors" title={t('reset')}>
                                <RotateCcw size={18} />
                            </button>
                        )}
                    </div>
                </div>
                {subText && <p className="text-xs text-blue-600/80 dark:text-blue-300/80 mb-4">{subText}</p>}

                <button
                    onClick={handleShare}
                    className="w-full flex justify-center items-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                    <Share2 size={18} />
                    {t('action_share', '결과 공유하기')}
                </button>

                {shareToast && (
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 bg-gray-800 text-white text-[11px] px-3 py-1.5 rounded-full fade-in z-50 whitespace-nowrap shadow-lg">
                        결과와 링크가 복사되었습니다!
                    </div>
                )}
            </div>

            {/* Related Calculators */}
            {relatedLinks.length > 0 && (
                <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{t('related_tools')}</h5>
                    <div className="flex flex-wrap gap-2">
                        {relatedLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                to={link.url}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {link.label}
                                <ArrowRight size={14} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultCard;

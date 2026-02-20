import React, { useState, useRef, useEffect } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ShareMenu = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef(null);

    const shareUrl = "https://all-calculators-seven.vercel.app/";
    const shareTitle = "All Calculators - 모든 계산기 모음";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            name: 'Kakao',
            color: 'bg-[#FEE500] text-[#000000]',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 3c-5.52 0-10 3.51-10 7.84 0 2.8 1.83 5.25 4.61 6.64L5.5 21l3.96-2.61c.83.21 1.68.32 2.54.32 5.52 0 10-3.51 10-7.84S17.52 3 12 3z" />
                </svg>
            ),
            onClick: () => {
                if (navigator.share) {
                    navigator.share({ title: shareTitle, url: shareUrl, text: shareTitle }).catch(console.error);
                } else {
                    window.open(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`, '_blank');
                }
            }
        },
        {
            name: 'NAVER',
            color: 'bg-[#03C75A] text-white',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 font-black text-xs flex items-center justify-center">
                    <text x="12" y="16" textAnchor="middle" fill="currentColor" fontWeight="bold">N</text>
                </svg>
            ),
            url: `https://share.naver.com/web/shareView?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`
        },
        {
            name: 'X',
            color: 'bg-black text-white',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
        },
        {
            name: 'WhatsApp',
            color: 'bg-[#25D366] text-white',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12.031 2.5A9.5 9.5 0 0 0 4.104 18.23l-1.332 4.878 4.986-1.306A9.456 9.456 0 0 0 12.031 21.5a9.5 9.5 0 0 0 0-19zm0 17.4a7.87 7.87 0 0 1-4.008-1.088l-2.88.755.767-2.808A7.864 7.864 0 0 1 4.162 12 7.868 7.868 0 1 1 12.031 19.9zm4.331-5.914c-.237-.118-1.405-.694-1.623-.774-.216-.08-.376-.118-.535.118-.16.237-.614.774-.752.932-.139.158-.277.178-.515.06-1.139-.567-2.071-1.28-2.87-2.522-.16-.25-.017-.386.102-.504.105-.104.237-.277.356-.416.118-.138.16-.237.237-.396.08-.16.039-.297-.02-.416-.06-.118-.535-1.287-.732-1.762-.192-.464-.388-.4-.535-.407-.138-.007-.297-.007-.456-.007s-.416.06-.633.297c-.218.237-.831.811-.831 1.98s.851 2.298.97 2.455c.118.158 1.674 2.555 4.053 3.58 1.157.495 1.602.505 2.138.425.623-.092 1.405-.574 1.603-1.128.198-.554.198-1.03.139-1.128-.06-.1-.218-.158-.456-.277z" />
                </svg>
            ),
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
        },
        {
            name: 'Messenger',
            color: 'bg-gradient-to-tr from-[#00C6FF] to-[#0072FF] text-white',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.898 1.436 5.485 3.684 7.18V22l3.371-1.854C10.012 20.428 10.982 20.5 12 20.5c5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.18 12.35l-2.541-2.73-4.94 2.73 5.409-5.753 2.585 2.73 4.896-2.73-5.41 5.753z" />
                </svg>
            ),
            url: `fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`
        },
        {
            name: 'Telegram',
            color: 'bg-[#229ED9] text-white',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.897-.666 3.511-1.529 5.854-2.538 7.028-3.027 3.344-1.393 4.037-1.636 4.49-1.644z" />
                </svg>
            ),
            url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
        },
        {
            name: 'LINE',
            color: 'bg-[#00C300] text-white',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 10.3c0-4.37-4.14-8.03-9.92-8.03S4.16 5.93 4.16 10.3c0 3.91 3.3 7.18 8 7.9 1.57.47 1.8.85 1.76 1.48-.04.48-.18 1.44-.22 1.74-.06.35.21.78.36.93.18.17.65.17 1.25-.17 2.97-1.61 9.4-5.59 9.4-11.88h-.71zm-9.35 1.54h-1.58v1.51h1.58v1.07h-2.64V7.95h2.64v1.07h-1.58v1.39h1.58v1.43zM6.9 7.95v6.47H5.84V7.95h1.06zm4.7 6.47h-1.05V7.95h1.05l2.48 4.74V7.95h1V14.4h-.97l-2.51-4.81v4.83zm3.92-6.47v6.47h-1.06V7.95h1.06z" />
                </svg>
            ),
            url: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`
        }
    ];

    const handleShare = (link) => {
        if (link.onClick) {
            link.onClick();
        } else if (link.url) {
            window.open(link.url, '_blank', 'noopener,noreferrer');
        }
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                aria-label={t('action_share') || 'Share'}
                title={t('action_share') || 'Share'}
            >
                <Share2 size={20} className="text-gray-700 dark:text-gray-200" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl py-3 border border-gray-100 dark:border-gray-700 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in duration-200">
                    <div className="px-4 pb-2 mb-2 border-b border-gray-100 dark:border-gray-700 text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                        {t('action_share') || 'Share via'}
                    </div>

                    <div className="grid grid-cols-4 gap-y-4 gap-x-2 px-3 py-2">
                        {shareLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleShare(link)}
                                className="flex flex-col items-center gap-1.5 group"
                                title={link.name}
                            >
                                <div className={`w-11 h-11 flex items-center justify-center rounded-2xl shadow-sm group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-200 ${link.color}`}>
                                    {link.icon}
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300 truncate w-full text-center group-hover:text-blue-500 transition-colors">
                                    {link.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="px-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <button
                            onClick={handleCopyLink}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <LinkIcon size={16} />
                                {t('action_copy_link') || 'Copy Link'}
                            </span>
                            {copied && <Check size={16} className="text-emerald-500" />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareMenu;

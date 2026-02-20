import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToHash = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Add a temporary highlight effect
                    element.classList.add('ring-4', 'ring-blue-500/50', 'transition-all', 'duration-500');
                    setTimeout(() => {
                        element.classList.remove('ring-4', 'ring-blue-500/50');
                    }, 2000);
                }
            }, 100); // Slight delay to ensure rendering
        }
    }, [hash]);
};

export default useScrollToHash;

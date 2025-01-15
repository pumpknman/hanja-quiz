import React, { useEffect } from 'react';

function AdBanner({ isMobile }) {
    useEffect(() => {
        // Google AdSense Script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.setAttribute('data-ad-client', 'YOUR_ADSENSE_CLIENT_ID'); // Replace with your AdSense Client ID
        document.body.appendChild(script);
        return () => document.body.removeChild(script); // Clean up
    }, []);

    return (
        <div
            style={{
                position: isMobile ? 'fixed' : 'static', // 모바일: 고정 / PC: 기본 배치
                bottom: isMobile ? 0 : 'auto',
                right: isMobile ? 0 : 'auto',
                width: isMobile ? '100%' : '300px', // 모바일: 화면 폭 / PC: 고정 크기
                textAlign: 'center',
                backgroundColor: isMobile ? '#f8f9fa' : 'transparent',
                zIndex: 1000,
            }}
        >
            {/* Google AdSense Banner */}
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    width: isMobile ? '100%' : '300px',
                    height: isMobile ? '50px' : '250px',
                }}
                data-ad-client="YOUR_ADSENSE_CLIENT_ID" // Replace with your AdSense Client ID
                data-ad-slot="YOUR_AD_SLOT_ID" // Replace with your Ad Slot ID
                data-ad-format={isMobile ? 'auto' : 'rectangle'}
            ></ins>
        </div>
    );
}

export default AdBanner;

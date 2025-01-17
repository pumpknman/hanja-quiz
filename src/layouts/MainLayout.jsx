import React from 'react';
import { Box } from '@mui/material';

function MainLayout({ children }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(#0F1214, #0C1A27)',
                backgroundAttachment: 'fixed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { xs: 2, md: 0 }, // 모바일은 여백 추가
                boxSizing: 'border-box',
            }}
        >
            {/* 메인 콘텐츠 박스 */}
            <Box
                sx={{
                    width: { xs: '100%', md: 815 }, // 모바일: 가로 전체, PC: 815 고정
                    height: { xs: '100%', md: 815 }, // 모바일: 세로 전체, PC: 815 고정
                    maxWidth: 815,
                    maxHeight: 815, // PC에서 최대 815 고정
                    backgroundColor: '#0F1214',
                    borderRadius: { xs: '15px', md: '15px' },
                    border: '1px solid #1B1F24',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // 약간의 그림자
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    overflow: 'hidden', // 콘텐츠가 넘칠 경우 스크롤 방지
                    position: 'relative',
                }}
            >
                {children}
            </Box>

            {/* 구글 AdSense 세로 배너 (PC 전용) */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' }, // 모바일에서는 숨김
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '160px', // 세로 배너 기본 크기
                    backgroundColor: 'transparent', // 광고 배경 투명
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '160px', height: '600px' }}
                    data-ad-client="YOUR_ADSENSE_CLIENT_ID"
                    data-ad-slot="YOUR_AD_SLOT"
                ></ins>
            </Box>

            {/* 모바일 하단 고정 배너 */}
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' }, // PC에서는 숨김
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50px', // 가로 배너 높이
                    backgroundColor: '#0F1214', // 배경색
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', height: '50px' }}
                    data-ad-client="YOUR_ADSENSE_CLIENT_ID"
                    data-ad-slot="YOUR_AD_SLOT"
                ></ins>
            </Box>
        </Box>
    );
}

export default MainLayout;

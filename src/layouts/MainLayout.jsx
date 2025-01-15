// src/layouts/MainLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

function MainLayout({ children }) {
    const location = useLocation();

    // 현재 페이지가 ResultPage인지 확인
    const isResultPage = location.pathname === '/result';

    if (isResultPage) {
        // ResultPage 전용 레이아웃
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
                    overflowY: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start', // 상단 정렬
                    p: 4,
                }}
            >
                {children} {/* ResultPage 콘텐츠만 렌더링 */}
            </Box>
        );
    }

    // 다른 페이지의 기본 레이아웃
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
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2, // 모바일 화면에서 패딩 추가
            }}
        >
            <Box
                sx={{
                    width: { xs: '90%', sm: 600, md: 750, lg: 815 }, // 반응형 너비
                    height: 815, // 고정 높이
                    backgroundColor: '#0F1214',
                    borderRadius: '15px',
                    border: '1px solid #1B1F24',
                    overflow: 'hidden', // 내용이 박스에서 넘치지 않도록 설정
                }}
            >
                {children} {/* 기본 페이지 콘텐츠 */}
            </Box>
        </Box>
    );
}

export default MainLayout;

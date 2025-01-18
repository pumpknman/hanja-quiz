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
        </Box>
    );
}

export default MainLayout;

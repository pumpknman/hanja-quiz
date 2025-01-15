import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

function MainLayout({ children }) {
    const location = useLocation();

    // 현재 페이지가 ResultPage인지 확인
    const isResultPage = location.pathname === '/result';

    if (isResultPage) {
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
                    minHeight: '100vh',
                    width: '100vw',
                    overflowY: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start', // 상단 정렬
                    padding: 2,
                    boxSizing: 'border-box',
                }}
            >
                {children}
            </Box>
        );
    }

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
                minHeight: '100vh',
                width: '100vw',
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '90%',
                    maxWidth: 815,
                    height: 815,
                    backgroundColor: '#0F1214',
                    borderRadius: '15px',
                    border: '1px solid #1B1F24',
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default MainLayout;

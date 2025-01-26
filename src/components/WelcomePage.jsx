import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                padding: { xs: 2, sm: 4 }, // 모바일과 PC에서 적절한 여백 추가
            }}
        >
            {/* 제목 */}
            <Typography
                variant="h3"
                fontWeight={900}
                color="#33333e"
                mb={2}
                sx={{ textAlign: 'center' }}
            >
                🎉 환영합니다!
            </Typography>
            <Typography
                variant="body1"
                color="#33333e"
                mb={4}
                sx={{ textAlign: 'center' }}
            >
                한자 급수별 퀴즈 사이트에 오신 것을 환영합니다. 지금 바로 시작해 보세요!
            </Typography>

            {/* 시작 버튼 */}
            <Button
                variant="contained"
                onClick={() => navigate('/level-select')}
                sx={{
                    px: 4,
                    py: 1.5,
                    backgroundColor: '#33333e',
                    '&:hover': { backgroundColor: '#33333e' },
                    fontSize: '1.2rem',
                }}
            >
                시작하기
            </Button>
        </Box >
    );
}

export default WelcomePage;

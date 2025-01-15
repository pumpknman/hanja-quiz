import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();

    return (
        // 815×815 박스의 자식 영역
        <Box
            sx={{
                width: '100%',
                height: '100%',
                // 중앙 정렬은 이미 MainLayout에서 해줬으므로
                // 여기서는 원하는 레이아웃만
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h2" gutterBottom color="#fff" sx={{ fontWeight: '500' }}>
                환영합니다!
            </Typography>
            <Typography variant="body1" color="#ccc" sx={{ mb: 4 }}>
                🎓 한자를 배우는 가장 재미있는 방법!<br />
                📝 급수별 실력을 확인하고 목표를 달성하세요!<br />
                🚀 지금 시작해볼까요?
            </Typography>
            <Box
                sx={{
                    width: 0,
                    height: 30,
                }}></Box>
            <Button variant="contained" onClick={() => navigate('/level-select')}>
                <h1>
                    🚀시작하기
                </h1>
            </Button>
            <Box
                sx={{
                    width: 0,
                    height: 50,
                }}></Box>
            <Typography variant="body1" color="#ccc" sx={{ mb: 4 }}>
                <small>자료 출처: 사단법인 한국어문회</small>
            </Typography>

        </Box>
    );
}

export default WelcomePage;

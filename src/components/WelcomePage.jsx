import React from 'react';
import { Box, Typography, Button } from '@mui/material';
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
            <Typography variant="h4" gutterBottom color="#fff">
                환영합니다!
            </Typography>
            <Typography variant="body1" color="#ccc" sx={{ mb: 4 }}>
                한자 급수별 퀴즈 사이트
            </Typography>
            <Button variant="contained" onClick={() => navigate('/level-select')}>
                시작하기
            </Button>
        </Box>
    );
}

export default WelcomePage;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(#0F1214, #0C1A27)',
                color: '#fff',
                textAlign: 'center',
                px: 2,
                py: 4,
                boxSizing: 'border-box',
            }}
        >
            {/* 큰 404 텍스트 */}
            <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2 }}>
                404
            </Typography>

            {/* 설명 텍스트 */}
            <Typography variant="h5" sx={{ mb: 2 }}>
                페이지를 찾을 수 없습니다. 😢
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#ccc' }}>
                요청하신 페이지가 존재하지 않거나 잘못된 경로로 이동하셨습니다.
            </Typography>

            {/* 홈으로 돌아가기 버튼 */}
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                    px: 4,
                    py: 1,
                    backgroundColor: '#1673ff',
                    '&:hover': { backgroundColor: '#125bcc' },
                }}
            >
                홈으로 돌아가기
            </Button>
        </Box>
    );
}

export default NotFoundPage;

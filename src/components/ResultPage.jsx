import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Alert, Stack } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import Confetti from 'react-confetti';

function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const answers = location.state?.answers || [];
    const level = location.state?.level || 'N/A';
    const timeElapsed = location.state?.timeElapsed || 0;

    const totalQuestions = answers.length;
    const correctAnswers = answers.filter((ans) => ans.isCorrect).length;
    const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);

    // 불꽃놀이 상태
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // 5초 후 불꽃놀이 효과 중지
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    // 시간 포맷 변환 (00:00)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <Box
            sx={{
                width: 815,
                minHeight: 'auto',
                backgroundColor: '#0F1214',
                borderRadius: 15,
                border: '1px solid #1B1F24',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
                p: 4,
                overflowY: 'auto',
                position: 'relative', // Confetti가 박스 기준으로 정렬되지 않도록
            }}
        >
            {/* 불꽃놀이 효과 */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={600}
                />
            )}

            {/* 결과 텍스트 */}
            <Typography variant="h4" mb={2} color="#fff" textAlign="center">
                총 {totalQuestions}문제 중 {correctAnswers}문제 정답!
            </Typography>
            <Typography variant="h6" mb={4} color="#fff" textAlign="center">
                ✅ 정답률: {correctPercentage}% | 🎚️급수: {formatLevelLabel(level)} | ⌛시간: {formatTime(timeElapsed)}
            </Typography>

            {/* Gauge 컴포넌트 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Gauge
                    value={correctPercentage}
                    startAngle={-110}
                    endAngle={110}
                    max={100}
                    sx={{
                        width: 300,
                        [`& .MuiGauge-valueText`]: {
                            fontSize: 24,
                        },
                    }}
                    text={({ value }) => `${value}%`}
                />
            </Box>

            {/* 문제 리뷰 리스트 */}
            <Typography variant="h5" mb={2} color="#fff">
                문제 리뷰
            </Typography>
            <Stack spacing={2} sx={{ width: '100%' }}>
                {answers.map((answer, idx) => (
                    <Alert
                        key={idx}
                        severity={answer.isCorrect ? 'success' : 'error'}
                        sx={{
                            bgcolor: answer.isCorrect ? 'success.light' : 'error.light',
                            color: '#ffffff',
                        }}
                    >
                        <strong>{answer.hanja}</strong>
                        <br />
                        정답: {answer.correctAnswer}
                        <br />
                        내가 선택한 답: {answer.userAnswer}
                    </Alert>
                ))}
            </Stack>

            {/* 다시 풀기 버튼 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4,
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => navigate('/level-select')}
                    sx={{
                        px: 4,
                        py: 1,
                        bgcolor: '#1673ff',
                        '&:hover': { bgcolor: '#125bcc' },
                    }}
                >
                    다시 풀기
                </Button>
            </Box>
        </Box>
    );
}

function formatLevelLabel(param) {
    if (param.startsWith('teuk')) {
        return param === 'teuk' ? '특급' : '특급 II';
    }
    if (param.includes('_2')) {
        const base = param.replace('_2', '');
        return `${base}급 II`;
    }
    return `${param}급`;
}

export default ResultPage;

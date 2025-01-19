import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Alert, Stack } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import Confetti from 'react-confetti';

function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [answers, setAnswers] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('resultState'));
        return location.state?.answers || savedState?.answers || [];
    });
    const [level, setLevel] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('resultState'));
        return location.state?.level || savedState?.level || 'N/A';
    });
    const [timeElapsed, setTimeElapsed] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('resultState'));
        return location.state?.timeElapsed || savedState?.timeElapsed || 0;
    });

    const totalQuestions = answers.length;
    const correctAnswers = answers.filter((ans) => ans.isCorrect).length;
    const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);

    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        localStorage.setItem(
            'resultState',
            JSON.stringify({ answers, level, timeElapsed })
        );

        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [answers, level, timeElapsed]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(#0F1214, #0C1A27)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: { xs: 1, md: 0 },
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    width: { xs: "95%", md: 815 },
                    height: { xs: "95%", md: 815 },
                    maxWidth: 815,
                    maxHeight: 815,
                    backgroundColor: "#0F1214",
                    borderRadius: { xs: "15px", md: "15px" },
                    border: "1px solid #1B1F24",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    boxSizing: "border-box",
                    overflowY: "auto",
                    padding: 4,
                    '&::-webkit-scrollbar': {
                        width: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#444',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#1B1F24',
                    },
                }}
            >
                {showConfetti && (
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        numberOfPieces={200}
                        recycle={false}
                    />
                )}

                <Typography variant="h4" mb={2} color="#fff" textAlign="center" sx={{ fontWeight: 900 }}>
                    총 {totalQuestions}문제 중<br /> {correctAnswers}문제 정답!
                </Typography>
                <Typography variant="h6" mb={4} color="#fff" textAlign="center">
                    ✅정답률: {correctPercentage}% | {formatLevelLabel(level)} | ⌛{formatTime(timeElapsed)}
                </Typography>

                <Box sx={{ width: '100%' }}>
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
                                <AlertTitle sx={{ fontSize: '1.3rem', fontWeight: '600' }}>
                                    {answer.hanja}
                                </AlertTitle>
                                정답: {answer.correctAnswer}
                                <br />
                                내가 선택한 답: {answer.userAnswer}
                            </Alert>
                        ))}
                    </Stack>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            localStorage.removeItem('resultState');
                            navigate('/level-select');
                        }}
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

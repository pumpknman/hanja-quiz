import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Fade } from '@mui/material';

function QuizPage() {
    const { level } = useParams();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const problemCount = Number(searchParams.get('count')) || 10;

    const [allData, setAllData] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [highlightedCorrect, setHighlightedCorrect] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [fadeInQuestion, setFadeInQuestion] = useState(true); // 문제 애니메이션 상태
    const [fadeInButtons, setFadeInButtons] = useState(false); // 버튼 애니메이션 상태

    useEffect(() => {
        const path = getJsonPath(level);
        fetch(path)
            .then((res) => res.json())
            .then((data) => {
                setAllData(data);
            })
            .catch((err) => console.error(err));
    }, [level]);

    useEffect(() => {
        if (allData.length > 0) {
            const chosen = getRandomElements(allData, problemCount);
            const prepared = chosen.map((row) => {
                const correct = parseMeaning(row.meaning);
                const wrongPool = allData.filter((x) => x.hanja !== row.hanja);
                const randomWrongs = getRandomElements(wrongPool, 3).map((w) => parseMeaning(w.meaning));
                const fourOptions = shuffleArray([correct, ...randomWrongs]);
                return {
                    ...row,
                    correctAnswer: correct,
                    options: fourOptions,
                };
            });
            setQuizData(prepared);
            setFadeInButtons(true);
        }
    }, [allData, problemCount]);

    function handleSelectAnswer(option) {
        if (!currentQuestion) return;
        setSelectedAnswer(option);

        const isCorrect = option === currentQuestion.correctAnswer;
        const answerObj = {
            hanja: currentQuestion.hanja,
            correctAnswer: currentQuestion.correctAnswer,
            userAnswer: option,
            isCorrect,
        };
        setAnswers((prev) => [...prev, answerObj]);

        if (!isCorrect) {
            setHighlightedCorrect(currentQuestion.correctAnswer);
        }

        setTimeout(() => {
            setFadeInQuestion(false);
            setFadeInButtons(false);
            setTimeout(() => goNext(answerObj), 500);
        }, 2000);
    }

    function goNext(answerObj) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < quizData.length) {
            setFadeInQuestion(true);
            setFadeInButtons(false);
            setTimeout(() => setFadeInButtons(true), 100);
            setCurrentIndex(nextIndex);
            setSelectedAnswer(null);
            setHighlightedCorrect(null);
        } else {
            navigate('/result', {
                state: {
                    answers: [...answers, answerObj],
                    level,
                    timeElapsed,
                },
            });
        }
    }

    const currentQuestion = useMemo(() => {
        if (quizData.length === 0) return null;
        return quizData[currentIndex];
    }, [quizData, currentIndex]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    if (!currentQuestion) {
        return (
            <Box sx={{ color: '#fff', p: 2 }}>
                <Typography>문제를 불러오는 중...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                color: '#fff',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="subtitle1" mb={2}>
                급: {formatLevelLabel(level)} | 진행 시간: {formatTime(timeElapsed)} | {currentIndex + 1}/{quizData.length}
            </Typography>

            <Fade in={fadeInQuestion} timeout={500}>
                <Typography variant="h2" mb={4} sx={{ color: '#fff' }}>
                    {currentQuestion.hanja}
                </Typography>
            </Fade>

            {currentQuestion.options?.map((option, idx) => (
                <Fade key={idx} in={fadeInButtons} timeout={500}>
                    <Button
                        variant="contained"
                        disabled={selectedAnswer !== null}
                        onClick={() => handleSelectAnswer(option)}
                        size="large"
                        sx={{
                            width: { xs: '80%', sm: 435 },
                            height: 65,
                            mb: 2,
                            backgroundColor:
                                selectedAnswer === option
                                    ? option === currentQuestion.correctAnswer
                                        ? '#4caf50'
                                        : '#ef5350'
                                    : option === highlightedCorrect
                                        ? '#4caf50'
                                        : '#1673ff',
                            '&.Mui-disabled': {
                                backgroundColor:
                                    selectedAnswer === option
                                        ? option === currentQuestion.correctAnswer
                                            ? '#4caf50'
                                            : '#ef5350'
                                        : option === highlightedCorrect
                                            ? '#4caf50'
                                            : '#1673ff',
                                color: '#fff',
                            },
                        }}
                    >
                        {option}
                    </Button>
                </Fade>
            ))}
        </Box>
    );
}

export default QuizPage;

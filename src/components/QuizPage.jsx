import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Fade } from '@mui/material';
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

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

    const [fadeInQuestion, setFadeInQuestion] = useState(true);
    const [fadeInButtons, setFadeInButtons] = useState(true);

    // Load saved state on mount
    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('quizState'));
        if (savedState && savedState.level === level) {
            setQuizData(savedState.quizData || []);
            setCurrentIndex(savedState.currentIndex || 0);
            setAnswers(savedState.answers || []);
            setTimeElapsed(savedState.timeElapsed || 0);
        }
    }, [level]);

    // Save state whenever it changes
    useEffect(() => {
        localStorage.setItem(
            'quizState',
            JSON.stringify({ level, quizData, currentIndex, answers, timeElapsed })
        );
    }, [level, quizData, currentIndex, answers, timeElapsed]);

    // Fetch data if not already loaded
    useEffect(() => {
        if (quizData.length > 0) return; // Skip if quizData already loaded

        const path = getJsonPath(level);
        fetch(path)
            .then((res) => res.json())
            .then((data) => {
                const savedState = JSON.parse(localStorage.getItem('quizState'));
                if (savedState && savedState.level === level && savedState.quizData?.length > 0) {
                    setQuizData(savedState.quizData); // Use previously saved quizData
                } else {
                    const chosen = getRandomElements(data, problemCount);
                    const prepared = chosen.map((row) => {
                        const correct = parseMeaning(row.meaning);
                        const wrongPool = data.filter((x) => x.hanja !== row.hanja);
                        const randomWrongs = getRandomElements(wrongPool, 3).map((w) => parseMeaning(w.meaning));
                        const fourOptions = shuffleArray([correct, ...randomWrongs]);
                        return {
                            ...row,
                            correctAnswer: correct,
                            options: fourOptions,
                        };
                    });
                    setQuizData(prepared);
                }
                setAllData(data);
            })
            .catch((err) => console.error(err));
    }, [level, problemCount, quizData]);

    // Timer for elapsed time
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const currentQuestion = useMemo(() => {
        if (quizData.length === 0) return null;
        return quizData[currentIndex];
    }, [quizData, currentIndex]);

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

        if (analytics) {
            logEvent(analytics, "answer_selected", {
                level,
                question: currentQuestion.hanja,
                user_answer: option,
                is_correct: isCorrect,
            });
        }

        if (!isCorrect) {
            setHighlightedCorrect(currentQuestion.correctAnswer);
        }

        setTimeout(() => {
            setFadeInQuestion(false);
            setFadeInButtons(false);
            setTimeout(() => goNext(answerObj), 500);
        }, 1000);
    }

    function goNext(answerObj) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < quizData.length) {
            setFadeInQuestion(true);
            setFadeInButtons(true);
            setCurrentIndex(nextIndex);
            setSelectedAnswer(null);
            setHighlightedCorrect(null);
        } else {
            localStorage.removeItem('quizState'); // Clear saved state
            navigate('/result', {
                state: {
                    answers: [...answers, answerObj],
                    level,
                    timeElapsed,
                },
            });

            if (analytics) {
                logEvent(analytics, "quiz_completed", {
                    level,
                    total_questions: quizData.length,
                    correct_answers: answers.filter(a => a.isCorrect).length,
                    time_taken: timeElapsed,
                });
            }
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    if (!currentQuestion) {
        return (
            <Box sx={{ color: '#fff', p: 2, justifyContent: 'center' }}>
                <Typography>문제를 불러오는 중...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                color: '#000',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h6" mb={2}>
                {formatLevelLabel(level)} │⌛{formatTime(timeElapsed)} │📝 {currentIndex + 1} / {quizData.length}
            </Typography>

            <Fade in={fadeInQuestion} timeout={500}>
                <Typography variant="h1" mb={4} sx={{ color: '#362767' }}>
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
                            height: 45,
                            mb: 2,
                            backgroundColor:
                                selectedAnswer === option
                                    ? option === currentQuestion.correctAnswer
                                        ? '#4caf50'
                                        : '#ef5350'
                                    : option === highlightedCorrect
                                        ? '#4caf50'
                                        : '#8d4de3',
                            '&.Mui-disabled': {
                                backgroundColor:
                                    selectedAnswer === option
                                        ? option === currentQuestion.correctAnswer
                                            ? '#4caf50'
                                            : '#ef5350'
                                        : option === highlightedCorrect
                                            ? '#4caf50'
                                            : '#8d4de3',
                                color: '#fff',
                            },
                        }}
                    >
                        <h3>{option}</h3>
                    </Button>
                </Fade>
            ))}
        </Box>
    );
}

/* Utility Functions */
function getJsonPath(param) {
    if (param.startsWith('teuk')) {
        return `/data/${param}.json`;
    }
    return `/data/lvl${param}.json`;
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

function parseMeaning(meaningStr) {
    try {
        const nested = JSON.parse(meaningStr);
        return nested.flat(Infinity).join(' ');
    } catch {
        return meaningStr.replace(/[\[\]']/g, '').replace(/,\s+/g, ' ');
    }
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function getRandomElements(arr, count) {
    if (arr.length <= count) return [...arr];
    return shuffleArray(arr).slice(0, count);
}

export default QuizPage;

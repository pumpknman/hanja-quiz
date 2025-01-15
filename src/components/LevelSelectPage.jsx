// src/components/LevelSelectPage.jsx
import React, { useState } from 'react';
import { Box, Grid, Button, Typography, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LevelSelectPage() {
    const navigate = useNavigate();

    // 문제 수 (기본 10)
    const [problemCount, setProblemCount] = useState(10);

    // 문제 수 선택 핸들러
    const handleCountChange = (event) => {
        setProblemCount(event.target.value);
    };

    // 급수 목록
    const levels = [
        { label: '8급', route: '8' },
        { label: '7급', route: '7' },
        { label: '7급 II', route: '7_2' },
        { label: '6급', route: '6' },
        { label: '6급 II', route: '6_2' },
        { label: '5급', route: '5' },
        { label: '5급 II', route: '5_2' },
        { label: '4급', route: '4' },
        { label: '4급 II', route: '4_2' },
        { label: '3급', route: '3' },
        { label: '3급 II', route: '3_2' },
        { label: '2급', route: '2' },
        { label: '1급', route: '1' },
        { label: '특급', route: 'teuk' },
        { label: '특급 II', route: 'teuk_2' },
    ];

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                p: 4,
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h4" color="#fff" sx={{ mb: 3 }}>
                급수 선택
            </Typography>

            {/* 문제 수 선택 Select */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="#fff" sx={{ mb: 1 }}>
                    문제 수를 선택하세요
                </Typography>
                <Select
                    value={problemCount}
                    onChange={handleCountChange}
                    sx={{ width: 120, bgcolor: '#fff' /* 배경 흰색 예시 */ }}
                >
                    <MenuItem value={10}>10문제</MenuItem>
                    <MenuItem value={20}>20문제</MenuItem>
                    <MenuItem value={30}>30문제</MenuItem>
                </Select>
            </Box>

            {/* 급수 버튼들 */}
            <Grid container spacing={2}>
                {levels.map((lvl) => (
                    <Grid item key={lvl.route}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                // 예) /quiz/3_2?count=10
                                navigate(`/quiz/${lvl.route}?count=${problemCount}`);
                            }}
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: 2,
                                backgroundColor: '#1673ff',
                                '&:hover': {
                                    backgroundColor: '#125bcc',
                                },
                            }}
                        >
                            <Typography variant="body1" color="#fff" align="center">
                                {lvl.label}
                            </Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default LevelSelectPage;

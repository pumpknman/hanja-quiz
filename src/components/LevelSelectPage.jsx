import React, { useState } from 'react';
import { Box, Button, Grid2, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const levels = [
    '8급', '7급', '7급 II', '6급', '6급 II',
    '5급', '5급 II', '4급', '4급 II',
    '3급', '3급 II', '2급', '1급', '특급', '특급 II',
];

function LevelSelectPage() {
    const navigate = useNavigate();
    const [problemCount, setProblemCount] = useState(10);

    const handleLevelSelect = (level) => {
        let levelKey = level;

        if (level === '특급 II') {
            levelKey = 'teuk_2';
        } else if (level === '특급') {
            levelKey = 'teuk';
        } else {
            levelKey = level.replace('급 II', '_2').replace('급', '');
        }

        navigate(`/quiz/${levelKey}?count=${problemCount}`);
    };

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
            {/* 제목 */}
            <Typography
                variant="h3"
                color="#33333e"
                mb={3} // 간격 증가
                sx={{
                    textAlign: 'center',
                }}
            >
                급수를 선택하세요
            </Typography>

            {/* 문제 수 선택 드롭다운 */}
            <FormControl
                sx={{
                    minWidth: 200,
                    mb: 3, // 간격 증가
                }}
            >
                <InputLabel id="problem-count-label" sx={{ color: '#362767' }}>
                    문제 수
                </InputLabel>
                <Select
                    labelId="problem-count-label"
                    value={problemCount}
                    onChange={(e) => setProblemCount(e.target.value)}
                    sx={{
                        color: '#362767',
                        backgroundColor: '#f8f8f8',
                        borderRadius: 10,
                    }}
                >
                    <MenuItem value={10}>10문제</MenuItem>
                    <MenuItem value={20}>20문제</MenuItem>
                    <MenuItem value={30}>30문제</MenuItem>
                </Select>
            </FormControl>

            {/* 급수 버튼 */}
            <Box
                sx={{
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 300px)', // 스크롤 가능한 영역 높이 제한
                    width: '100%',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                <Grid2
                    container
                    spacing={2}
                    justifyContent="center"
                    sx={{
                        maxWidth: '100%',
                        px: 2,
                    }}
                >
                    {levels.map((level, idx) => (
                        <Grid2 item xs={4} sm={4} md={3} key={idx}>
                            <Button
                                variant="contained"
                                onClick={() => handleLevelSelect(level)}
                                sx={{
                                    width: { xs: '80px', sm: '100px' },
                                    height: { xs: '80px', sm: '100px' },
                                    backgroundColor: '#8d4de3',
                                    '&:hover': { backgroundColor: '#362767' },
                                    color: '#fff',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                {level}
                            </Button>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    );
}

export default LevelSelectPage;

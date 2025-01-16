import React, { useState } from 'react';
import { Box, Button, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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
                width: '100%', // 100vw 대신 100%로 수정
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                px: 2,
                py: 4,
                boxSizing: 'border-box',
                overflowY: 'auto',
                backgroundColor: '#0F1214',
                position: 'relative', // 레이아웃 문제 해결
                margin: '0 auto', // 중앙 정렬
            }}
        >
            {/* 제목 */}
            <Typography
                variant="h4"
                color="#fff"
                mb={4}
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
                    mb: 4,
                }}
            >
                <InputLabel id="problem-count-label" sx={{ color: '#fff' }}>
                    문제 수
                </InputLabel>
                <Select
                    labelId="problem-count-label"
                    value={problemCount}
                    onChange={(e) => setProblemCount(e.target.value)}
                    sx={{
                        color: '#fff',
                        backgroundColor: '#1B1F24',
                        borderRadius: 1,
                    }}
                >
                    <MenuItem value={10}>10문제</MenuItem>
                    <MenuItem value={20}>20문제</MenuItem>
                    <MenuItem value={30}>30문제</MenuItem>
                </Select>
            </FormControl>

            {/* 급수 버튼 */}
            <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{
                    maxWidth: '100%', // Grid의 최대 너비 설정
                    px: 2, // 좌우 여백 추가
                }}
            >
                {levels.map((level, idx) => (
                    <Grid item key={idx}>
                        <Button
                            variant="contained"
                            onClick={() => handleLevelSelect(level)}
                            sx={{
                                width: 100,
                                height: 100,
                                backgroundColor: '#1673ff',
                                '&:hover': { backgroundColor: '#125bcc' },
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
                    </Grid>
                ))}
            </Grid>

            {/* 하단 여백 */}
            <Box
                sx={{
                    height: { xs: 100, sm: 50 },
                }}
            />
        </Box>
    );
}

export default LevelSelectPage;

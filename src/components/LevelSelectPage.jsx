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
    const [problemCount, setProblemCount] = useState(10); // 문제 수 선택 상태

    const handleLevelSelect = (level) => {
        const levelKey = level.replace('급 II', '_2').replace('급', '');
        navigate(`/quiz/${levelKey}?count=${problemCount}`);
    };

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: 4, // 상하 여백 추가
                boxSizing: 'border-box',
                overflowY: 'auto',
            }}
        >
            {/* 제목 */}
            <Typography variant="h4" color="#fff" mb={4}>
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
            <Grid container spacing={2} justifyContent="center">
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
                            }}
                        >
                            {level}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            {/* 하단 공간 확보 */}
            <Box
                sx={{
                    height: 50, // 하단에 추가 여백
                }}
            />
        </Box>
    );
}

export default LevelSelectPage;

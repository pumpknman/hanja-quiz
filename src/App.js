import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import MainLayout from './layouts/MainLayout';
import WelcomePage from './components/WelcomePage';
import LevelSelectPage from './components/LevelSelectPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import NotFoundPage from './components/NotFoundPage';
import theme from './theme'; // theme.js import

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 기본 스타일 리셋 */}
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/level-select" element={<LevelSelectPage />} />
            <Route path="/quiz/:level" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* 404 페이지 */}
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

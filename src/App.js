// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import MainLayout from './layouts/MainLayout';
import WelcomePage from './components/WelcomePage';
import LevelSelectPage from './components/LevelSelectPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import './styles/fonts.css';
import theme from './theme'; // 테마 파일 import

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/level-select" element={<LevelSelectPage />} />
            <Route path="/quiz/:level" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

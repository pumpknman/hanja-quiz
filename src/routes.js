import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LevelSelectPage from './components/LevelSelectPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/level-select" element={<LevelSelectPage />} />
                <Route path="/quiz/:level" element={<QuizPage />} />
                <Route path="/result" element={<ResultPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;

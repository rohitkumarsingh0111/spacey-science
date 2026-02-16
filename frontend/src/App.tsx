import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import { User } from './types/types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('spacey-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('spacey-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('spacey-user');
  };

  if (loading) {
    return (
      <div className="space-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🚀</div>
          <div className="text-xl text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/topics" /> : <HomePage onLogin={handleLogin} />} 
        />
        <Route 
          path="/topics" 
          element={user ? <TopicsPage user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/lesson/:topicId" 
          element={user ? <LessonPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/quiz/:topicId" 
          element={user ? <QuizPage user={user} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransferPage from './pages/TransferPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`app-shell theme-${theme}`}>
        <header className="header">
          <div>
            <h1 className="header-label">🏦 Банк-Клиент</h1>
          </div>
          <nav className="nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              Профиль
            </NavLink>
            <NavLink 
              to="/transfer" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              Перевод
            </NavLink>
            <button 
              className="theme-button" 
              onClick={toggleTheme}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transfer" element={<TransferPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="footer">
          © 2024 Банковские карты. Учебный проект
        </footer>
      </div>
    </Router>
  );
}

export default App;
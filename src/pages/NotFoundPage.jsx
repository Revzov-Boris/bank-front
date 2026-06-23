import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
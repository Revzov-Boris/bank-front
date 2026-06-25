import React, { useState, useEffect } from 'react';
import UserProfile from '../components/profile/UserProfile';
import CardList from '../components/cards/CardList';
import { cardService } from '../services/cardService';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchUserData = async () => {
    try {
      const data = await cardService.getUserProfile();
      setUser(data);
    } catch (err) {
      setError('Не удалось загрузить данные пользователя');
      console.error(err);
    }
  };

  const fetchCards = async (page = 0) => {
    try {
      setLoading(true);
      const data = await cardService.getUserCards(page, pagination.size);
      
      let cardsData = [];
      if (data._embedded && data._embedded.cards) {
        cardsData = data._embedded.cards.map(item => item);
      } else if (Array.isArray(data)) {
        cardsData = data;
      }

      setCards(cardsData);
      
      if (data.page) {
        setPagination({
          page: data.page.number,
          size: data.page.size,
          total: data.page.totalElements,
          totalPages: data.page.totalPages,
        });
      }
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить карты');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCards(0);
  }, []);

  const handleRetry = () => {
    fetchCards(pagination.page);
  };

  return (
    <div className="page-grid">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        👤Мой профиль
      </h1>
      
      {user && <UserProfile user={user} />}
      
      <div>
        <h2 className="card-title">Мои карты</h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
          Всего карт: {pagination.total}
        </p>
      </div>

      <CardList 
        cards={cards} 
        loading={loading} 
        error={error} 
        onRetry={handleRetry}
      />

      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => fetchCards(pagination.page - 1)}
            disabled={pagination.page === 0}
          >
            Предыдущая
          </button>
          <span className="pagination-info">
            Страница {pagination.page + 1} из {pagination.totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={() => fetchCards(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages - 1}
          >
            Следующая
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
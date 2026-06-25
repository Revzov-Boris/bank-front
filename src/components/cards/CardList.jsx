import React from 'react';
import CardItem from './CardItem';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';

const CardList = ({ cards, loading, error, onRetry }) => {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;
  if (!cards || cards.length === 0) {
    return (
      <div>
        У вас нет активных карт
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
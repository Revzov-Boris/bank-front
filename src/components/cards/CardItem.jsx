import React from 'react';

const CardItem = ({ card }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'status-active';
      case 'BLOCK': return 'status-block';
      case 'EXPIRED': return 'status-expired';
      default: return '';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Не указана';
    return new Date(date).toLocaleDateString('ru-RU');
  };

  const formatBalance = (balance) => {
    if (balance === null || balance === undefined) return '0.00';
    return Number(balance).toFixed(2);
  };

  return (
    <div className="card-item">
      <div className="card-header">
        <div>
          <div className="card-bank">{card.bankTitle || 'Банк'}</div>
          <div className="card-number">**** {card.lastFourDigits || '****'}</div>
        </div>
        <span className={`card-status ${getStatusClass(card.status)}`}>
          {card.status || 'Неизвестно'}
        </span>
      </div>
      <div className="card-details">
        <div className="card-detail-row">
          <span className="card-detail-label">ID карты</span>
          <span style={{ fontWeight: '500', color: '#3b82f6' }}>#{card.id}</span>
        </div>
        <div className="card-detail-row">
          <span className="card-detail-label">Тип карты</span>
          <span>{card.type || 'Не указан'}</span>
        </div>
        <div className="card-detail-row">
          <span className="card-detail-label">Срок действия</span>
          <span>{formatDate(card.expiryDate)}</span>
        </div>
        <div className="card-balance">
          {formatBalance(card.balance)} ₽
        </div>
      </div>
    </div>
  );
};

export default CardItem;
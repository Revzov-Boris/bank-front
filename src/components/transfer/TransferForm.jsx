import React, { useState } from 'react';

const TransferForm = ({ onSubmit, loading, error, success }) => {
  const [formData, setFormData] = useState({
    cardFromId: '',
    cardToId: '',
    money: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.cardFromId) errors.cardFromId = 'Выберите карту отправителя';
    if (!formData.cardToId) errors.cardToId = 'Выберите карту получателя';
    if (formData.cardFromId === formData.cardToId) {
      errors.cardToId = 'Карты должны быть разными';
    }
    if (!formData.money || formData.money <= 0) {
      errors.money = 'Введите сумму больше 0';
    }
    if (formData.money && isNaN(formData.money)) {
      errors.money = 'Введите корректное число';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        cardFromId: parseInt(formData.cardFromId),
        cardToId: parseInt(formData.cardToId),
        money: parseFloat(formData.money),
      });
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Перевод между картами</h2>
      
      {error && (
        <div className="notification notification-error">
          <strong>Ошибка перевода</strong>
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="notification notification-success">
          <strong>Успешно!</strong>
          <p>Перевод выполнен успешно</p>
        </div>
      )}

      <form className="transfer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">ID карты отправителя</label>
          <input
            type="number"
            name="cardFromId"
            className={`form-input ${validationErrors.cardFromId ? 'error' : ''}`}
            value={formData.cardFromId}
            onChange={handleChange}
            placeholder="Введите ID карты"
            disabled={loading}
          />
          {validationErrors.cardFromId && (
            <span className="form-error">{validationErrors.cardFromId}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">ID карты получателя</label>
          <input
            type="number"
            name="cardToId"
            className={`form-input ${validationErrors.cardToId ? 'error' : ''}`}
            value={formData.cardToId}
            onChange={handleChange}
            placeholder="Введите ID карты"
            disabled={loading}
          />
          {validationErrors.cardToId && (
            <span className="form-error">{validationErrors.cardToId}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Сумма перевода (₽)</label>
          <input
            type="number"
            name="money"
            className={`form-input ${validationErrors.money ? 'error' : ''}`}
            value={formData.money}
            onChange={handleChange}
            placeholder="Введите сумму"
            step="0.01"
            min="0.01"
            disabled={loading}
          />
          {validationErrors.money && (
            <span className="form-error">{validationErrors.money}</span>
          )}
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Отправка...' : 'Выполнить перевод'}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
import React, { useState } from 'react';

const TransferForm = ({ onSubmit, loading, error, success }) => {
  const [formData, setFormData] = useState({
    fromCardId: '',
    toCardId: '',
    amount: '',
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
    if (!formData.fromCardId) errors.fromCardId = 'Выберите карту отправителя';
    if (!formData.toCardId) errors.toCardId = 'Выберите карту получателя';
    if (formData.fromCardId === formData.toCardId) {
      errors.toCardId = 'Карты должны быть разными';
    }
    if (!formData.amount || formData.amount <= 0) {
      errors.amount = 'Введите сумму больше 0';
    }
    if (formData.amount && isNaN(formData.amount)) {
      errors.amount = 'Введите корректное число';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        fromCardId: parseInt(formData.fromCardId),
        toCardId: parseInt(formData.toCardId),
        amount: parseFloat(formData.amount),
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
            name="fromCardId"
            className={`form-input ${validationErrors.fromCardId ? 'error' : ''}`}
            value={formData.fromCardId}
            onChange={handleChange}
            placeholder="Введите ID карты"
            disabled={loading}
          />
          {validationErrors.fromCardId && (
            <span className="form-error">{validationErrors.fromCardId}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">ID карты получателя</label>
          <input
            type="number"
            name="toCardId"
            className={`form-input ${validationErrors.toCardId ? 'error' : ''}`}
            value={formData.toCardId}
            onChange={handleChange}
            placeholder="Введите ID карты"
            disabled={loading}
          />
          {validationErrors.toCardId && (
            <span className="form-error">{validationErrors.toCardId}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Сумма перевода (₽)</label>
          <input
            type="number"
            name="amount"
            className={`form-input ${validationErrors.amount ? 'error' : ''}`}
            value={formData.amount}
            onChange={handleChange}
            placeholder="Введите сумму"
            step="0.01"
            min="0.01"
            disabled={loading}
          />
          {validationErrors.amount && (
            <span className="form-error">{validationErrors.amount}</span>
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
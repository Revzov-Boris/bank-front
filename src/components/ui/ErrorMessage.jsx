import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="notification notification-error">
      <strong>Ошибка</strong>
      <p>{message}</p>
      {onRetry && (
        <button 
          className="btn-primary"
          onClick={onRetry}
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
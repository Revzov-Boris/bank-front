import React, { useState } from 'react';
import TransferForm from '../components/transfer/TransferForm';
import { cardService } from '../services/cardService';

const TransferPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTransfer = async (transferData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await cardService.createTransfer(transferData);
      setSuccess(true);
    } catch (err) {
      console.log("ОШИБКА: " + err)
      console.log("ОШИБКА: " + typeof(err))
      console.log("ОШИБКА: " + err.message)
      let errorData = JSON.parse(err.message);
      let errorMessage = errorData.message || "Произошла ошибка при выполнении перевода"
      setError(errorMessage);
      console.error('Transfer error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-grid" style={{ maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Перевод между картами
      </h1>
      <TransferForm 
        onSubmit={handleTransfer}
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  );
};

export default TransferPage;
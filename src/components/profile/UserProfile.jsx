import React from 'react';
import { format } from 'date-fns';

const UserProfile = ({ user }) => {
  if (!user) return null;

  const formatDate = (date) => {
    if (!date) return 'Не указана';
    return format(new Date(date), 'dd.MM.yyyy');
  };

  return (
    <div className="card">
      <h2 className="card-title">Личная информация</h2>
      <div className="profile-grid">
        <div className="profile-item">
          <span className="profile-label">Имя</span>
          <span className="profile-value">{user.firstName || 'Не указано'}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Фамилия</span>
          <span className="profile-value">{user.secondName || 'Не указано'}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Отчество</span>
          <span className="profile-value">{user.thirdName || 'Не указано'}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Дата рождения</span>
          <span className="profile-value">{formatDate(user.birthDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
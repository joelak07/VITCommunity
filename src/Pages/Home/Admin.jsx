import React from 'react';
import './home.css';

const Admin = ({ message, time }) => {
  return (
    <div className='admincont'>
      <h3>{message}</h3>
      <p>{time}</p>
    </div>
  );
};

export default Admin;

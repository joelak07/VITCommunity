import React from 'react';
import './subjectobj.css';
import { useNavigate } from 'react-router-dom';

const SubjectObj = ({ subjectCode, subjectName }) => {
  const navigate = useNavigate();
    const handleClick = () => {
      navigate('/notespage', { state: {subjectCode:subjectCode} });
    };
  return (
    <div className='subjectobj' onClick={handleClick}>
      <h2>{subjectCode}</h2>
      <h3>{subjectName}</h3>
    </div>
  );
};

export default SubjectObj;

import React from 'react';
import '../Notes/subjectobj.css';
import { useNavigate } from 'react-router-dom';

const Prevqpclosed = ({ coursecode, papername}) => {
  const navigate = useNavigate();
  const handleClick = () => {
     navigate('/pqpage', { state: { subjectCode: coursecode, subjectName:papername } });
  };
  return (
    <div className='subjectobj' onClick={handleClick}>
      <h2>{coursecode}</h2>
      <h3>{papername}</h3>
    </div>
  );

}

export default Prevqpclosed
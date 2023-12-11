import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = location.pathname === '/home' || location.pathname === '/previousqp' || location.pathname === '/pqpage' || location.pathname === '/notes' || location.pathname === '/notespage' || location.pathname === '/community';  
  const name = localStorage.getItem('userName') || '';
  const isRestrictedPath = ['/previousqp','/pqpage','/notes','/notespage'].includes(location.pathname);
  const shouldDisplayButtons = isRestrictedPath;

  const handleLogout = () => {
    localStorage.removeItem('userName');
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const handleNavigate = (path, state) => {
    navigate(path, { state: { ...state, name } });
  };

  return (
    <div className='Navbar'>
      <div className="leftnav">
        <h2>VIT</h2><span>Community</span>
      </div>
      <div className="rightnav">
        {shouldDisplayButtons && (
          <>
            <button className='backbut' onClick={() => navigate(-1)}>Go Back</button>
            <button className='backbut' onClick={() => handleNavigate('/home')}>Home</button>
            <button className='paperbut' onClick={() => handleNavigate('/previousqp', { name: 'YourStateValue' })}>Previous Papers</button>
            <button className='notesbut' onClick={() => handleNavigate('/notes', { name: 'YourStateValue' })}>Notes</button>
          </>
        )}
        {isRootPath && (
          <button className='logoutbut' onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;

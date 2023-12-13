import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = location.pathname === '/home' || location.pathname === '/previousqp' || location.pathname === '/pqpage' || location.pathname === '/notes' || location.pathname === '/notespage' || location.pathname === '/community';  
  const name = localStorage.getItem('userName') || '';
  const isRestrictedPath = ['/previousqp','/pqpage','/notes','/notespage', '/community'].includes(location.pathname);
  const shouldDisplayButtons = isRestrictedPath;  

  const handleLogout = () => {
    const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      nav.classList.remove('responsive');
    }
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
    const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      nav.classList.remove('responsive');
    }
    navigate(path, { state: { ...state, name } });
  };

  const handleResp = () => {
    const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      nav.classList.remove('responsive');
    } else {
      nav.classList.add('responsive');
    }
  };

  return (
    <div className='Navbar' id="respNav">
      <div className="leftnav">
        <h2>VIT</h2><span>Community</span>
      </div>
      <div className="rightnav">
        {shouldDisplayButtons && (
          <>
            <button className='backbut' onClick={() => handleNavigate('/home')}>Home</button>
            <button className='paperbut' onClick={() => handleNavigate('/community', { name: 'YourStateValue' })}>Community</button>
            <button className='paperbut' onClick={() => handleNavigate('/previousqp', { name: 'YourStateValue' })}>Previous Papers</button>
            <button className='notesbut' onClick={() => handleNavigate('/notes', { name: 'YourStateValue' })}>Notes</button>
          </>
        )}
        {isRootPath && (
          <button className='logoutbut' onClick={handleLogout}>
            Logout
          </button>
        )}
        {shouldDisplayButtons && 
          <button className='iconbut' onClick={handleResp}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        }
      </div>
      {location.pathname==='/home' && (
        <div className='homeNav'>
        <button className='logoutbut' onClick={handleLogout}>
        Logout
        </button>
        </div>
        )
      }
    </div>
  );
}

export default Navbar;

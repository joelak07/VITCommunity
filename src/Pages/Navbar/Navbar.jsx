import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMinus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = location.pathname === '/home' || location.pathname === '/previousqp' || location.pathname === '/pqpage' || location.pathname === '/notes' || location.pathname === '/notespage' || location.pathname === '/community'|| location.pathname === '/feedback' || location.pathname === '/profile';
  const name = localStorage.getItem('userName') || '';
  const isRestrictedPath = ['/previousqp', '/pqpage', '/notes', '/notespage', '/community', '/feedback', '/profile'].includes(location.pathname);
  const shouldDisplayButtons = isRestrictedPath;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      nav.classList.remove('responsive');
    }
    setIsMenuOpen(false);
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
    setIsMenuOpen(false);
    navigate(path, { state: { ...state, name } });
  };

  const closeNav = () => {
    const html = document.documentElement;
    const nav = document.getElementById('respNav');
    setIsMenuOpen(false);
    nav.classList.remove('responsive');
    html.removeEventListener('click', closeNavOnClick);
  }

  const closeNavOnClick = (event) => {
    const path = event.composedPath();
    if (path.some(elem => elem.id === 'respNav')) {
      return;
    }
    closeNav();
  }

  const handleResp = () => {
    /*const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      nav.classList.remove('responsive');
    } else {
      nav.classList.add('responsive');
    }*/
    const html = document.documentElement;
    const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      closeNav();
    }
    else {
      setIsMenuOpen(true);
      nav.classList.add('responsive');
      html.addEventListener('click', closeNavOnClick);
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
            <button className='paperbut' onClick={() => handleNavigate('/feedback', { name: 'YourStateValue' })}>Feedback</button>
          </>
        )}
        {isRootPath && (
          <>
          <button className='paperbut' onClick={() => handleNavigate('/profile', { name: 'YourStateValue' })}>Profile</button>
          <button className='logoutbut' onClick={handleLogout}>
            Logout
          </button>
          
          </>
        )}
        {shouldDisplayButtons &&
          <button className='iconbut' id='iconbutcontent' onClick={handleResp}>
            <FontAwesomeIcon icon={isMenuOpen?faMinus:faBars} className='navobut' />
          </button>
        }
      </div>
      {location.pathname === '/home' && (
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

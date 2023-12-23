import React, { useEffect, useState } from 'react';
import './leader.css'
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import Point from './Point'

const Leader = () => {

  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('points', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });

        setTopUsers(users);
        console.log('Top 10 Users:', users);
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className='leaderboard'>
      <h1>Leaderboard🏆</h1>
      <div className="leaders">
        <div className="headerlead">
          <div className="pbox">
            <h3>Rank</h3>
          </div>
          <div className="pbox">
            <h3>Reg No</h3>
          </div>
          <div className="pbox">
            <h3>Name</h3>
          </div>
          <div className="pbox">
            <h3>Score</h3>
          </div>
        </div>
        <div className="leaderslist">
        {topUsers.map((user, index) => (
            <Point key={user.id} rank={index + 1} regno={user.id} name={user.name} score={user.points} />
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Leader
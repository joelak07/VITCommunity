import React, { useState, useEffect } from 'react';
import './community.css';
import Post from './Post';
import Popup from './Popup';
import { db } from '../../firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

const Community = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const user = localStorage.getItem('systemname');
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, 'posts'));
        const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort postsData based on time in descending order
        const sortedPosts = postsData.sort((a, b) => new Date(b.time) - new Date(a.time));

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handlepost = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(collection(db, 'posts')), {
        name: user,
        content: post,
        time: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0,
        fires:0,
      });
      alert('Post added successfully');
      closePopup();
      window.location.reload();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="community">
      <div className="communitycont">
        <div className="namebar">
          <h2>Feed</h2>
          <div className="topright">
            <button className="postbuton" onClick={openPopup}>
              ✒️ Post
            </button>
          </div>
        </div>
        <div className="content">
          {posts.map((post) => (
            <Post
              key={post.id}
              content={post.content}
              student={post.name}
              time={post.time}
              likes={post.likes}
              postId={post.id}
              dislikes={post.dislikes}
            />
          ))}
        </div>
      </div>

      {/* Render the Popup component conditionally based on isPopupVisible state */}
      {isPopupVisible && (
        <Popup onClose={closePopup}>
          <div className="popupcontent">
            <h2>Your Voice</h2>
            <h3>{user}</h3>
            <form>
              <textarea
                placeholder="Content"
                rows={5}
                onChange={(e) => setPost(e.target.value)}
                required
              />
              <button type="submit" onClick={handlepost}>
                Speak
              </button>
            </form>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Community;

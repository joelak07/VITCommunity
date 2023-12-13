import {Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Navbar from './Pages/Navbar/Navbar';
import Signup from './Pages/SignUp/Signup';
import Previousqp from './Pages/PreviousQP/Previousqp';
import Community from './Pages/Community/Community';
import NotesShare from './Pages/Notes/NotesShare';
import Notespage from './Pages/Notes/Notespage';
import Pqpage from './Pages/PreviousQP/Pqpage';

function App() {
  return (
    <div>
      {/* <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/previousqp" element={<Previousqp/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/notes" element={<NotesShare/>} />
          <Route path="/notespage" element={<Notespage/>} />
          <Route path="/pqpage" element={<Pqpage/>} />
          <Route path="*" element={<Login />} />
          
        </Routes> */}
        <h1>Under Maintenance</h1>
    </div>
  );
}

export default App;

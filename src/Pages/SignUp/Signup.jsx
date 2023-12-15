import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import './signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [campus, setCampus] = useState('');
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState('');
  const [branch, setBranch] = useState([]);
  const [brach, setBrach]=useState('');
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [batch, setBatch] = useState('');
  const [regno, setRegno] = useState('');


  const navigate = useNavigate();
  const name = localStorage.getItem('userName');
  useEffect(()=>{
    const nav = document.getElementById('respNav');
    if (nav.classList.contains('responsive')) {
      nav.classList.remove('responsive');
    }
    if(name===null){
      navigate('/');
      return;
    }
  },[name, navigate]);

  useEffect(() => {
    if (location.state && location.state.regno) {
      setRegno(location.state.regno);
    } else {
      console.error('User information not found in location state');
      navigate('/error');
      
    }
  }, [location.state,navigate]);

  useEffect(() => {
    if (location.state && location.state.userName) {
      setUserName(location.state.userName);
    } else {
      console.error('User information not found in location state');
      navigate('/error');
    }
  }, [location.state,navigate]);

  useEffect(() => {
    if (location.state && location.state.regno) {
      setBatch("20" + location.state.regno.substring(0, 2));
    } else {
      console.error('User information not found in location state');
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      if (campus) {
        try {
          const querySnapshot = await getDocs(collection(db, campus));
          const schoolsData = querySnapshot.docs.map(doc => doc.id);
          setSchools(schoolsData);
          console.log('Schools:', schoolsData);
        } catch (error) {
          console.error('Error fetching schools:', error);
        }
      }
    };

    fetchData();
  }, [campus]);

  useEffect(() => {
    const fetchBranches = async () => {
      if (school) {
        try {
          const schoolDocRef = doc(db, campus, school);
          const schoolDocSnapshot = await getDoc(schoolDocRef);

          if (schoolDocSnapshot.exists()) {
            const branchesData = schoolDocSnapshot.data().branch || [];
            setBranch(branchesData);
            console.log('Branches:', branchesData);
          }
        } catch (error) {
          console.error('Error fetching branches:', error);
        }
      }
    };

    fetchBranches();
  }, [campus, school]);

  const handleSchoolChange = (event) => {
    const selectedSchool = event.target.value;
    setSchool(selectedSchool);
  };

  const handleBranchChange = (event) => {
    const selectedBranch = event.target.value;
    setBrach(selectedBranch);
  };

  const handleCampusChange = (event) => {
    const selectedCampus = event.target.value;
    setCampus(selectedCampus);
  };

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    if(campus==='' || school==='' || brach===''){
      alert('Please fill all the fields');
      return;
    }
    try {
      const firstLoginTime =new Date().toLocaleDateString() +" "  + new Date().toLocaleTimeString();
      await setDoc(doc(collection(db, "users"), regno), {
        name: userName.substring(0, userName.length - 10),
        batch: batch,
        campus: campus,
        school: school,
        branch: brach,
        sem: document.getElementById('sem').value,
        logins:1,
        logintime: [firstLoginTime],  
      });
      console.log("Document written with ID: ", regno);
      navigate('/home', { state: { userName:userName.substring(0,userName.length-10)} });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className='signup'>
      <div className="signupcont">
        <h2 className="signup-heading">Sign up</h2>
        <form action="" className="signup-form">
          <label htmlFor="name" className="form-label">Name:</label>
          <input id="name" type="text" value={userName.substring(0, userName.length - 10)} readOnly className="form-input" />

          <label htmlFor="batch" className="form-label">Batch:</label>
          <input id="batch" type="text" value={batch} readOnly className="form-input" />

          <label htmlFor="campus" className="form-label">Select Campus:</label>
          <select id="campus" name="campus" value={campus} onChange={handleCampusChange} required className="form-select">
            <option value="">Select your campus</option>
            <option value="chennai">Chennai</option>
            <option value="vellore">Vellore</option>
          </select>

          <label htmlFor="schools" className="form-label">Select School:</label>
          <select id="schools" required name="schools" onChange={handleSchoolChange} className="form-select">
            <option value="">Select your school</option>
            {schools.map((schoolId) => (
              <option key={schoolId} value={schoolId}>
                {schoolId}
              </option>
            ))}
          </select>

          <label htmlFor="branch" className="form-label">Select Branch:</label>
          <select id="branch" name="branch" className="form-select" required onChange={handleBranchChange}>
            <option value="">Select your branch</option>
            {branch.map((branchId) => (
              <option key={branchId} value={branchId}>
                {branchId}
              </option>
            ))}
          </select>

          <label htmlFor="sem" className="form-label">Semester:</label>
          <select name="sem" id="sem" className="form-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <br />
          <button className="signup-button" onClick={handleSignup}>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/Context';
import { getFirestore, collection,addDoc  } from 'firebase/firestore';
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { getAuth } from 'firebase/auth';
  


export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { Firebase } = useContext(FirebaseContext);
  
  const navigate = useNavigate();
  const auth  =getAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: username });

      const firestore = getFirestore();
      await addDoc(collection(firestore, 'user'), {
        id: user.uid,
        username: username,
        phone: phone,
      });

      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  
  

  return (
    <div>
      <div className="signupParentDiv">
        <img className='logo' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value = {username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value = {email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value = {phone}
            onChange={(e)=>setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value = {password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to = "/login">
        <a style={{color:"black", textDecoration: "none"}}>Login</a>
        </Link>
      </div>
    </div>
  );
}

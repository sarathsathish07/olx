import React, { useState,useContext } from 'react';
import {useNavigate,Link} from "react-router-dom"
import { FirebaseContext } from '../../Store/Context';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from 'firebase/auth';



import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email,setEmail]= useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const { Firebase } = useContext(FirebaseContext);
  const auth = getAuth()
 
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  

  return (
    <div>
      <div className="loginParentDiv">
        <img className='logo' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
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
          <button>Login</button>
        </form>
      <Link to = "/signup">
        <a style={{color:"black"}}>Signup</a>
        </Link>
      </div>
    </div>
  );
}

export default Login;

import React,{useContext} from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Store/Context';
import {useNavigate} from "react-router-dom"
import { Firebase } from '../../firebase/config'; 



function Header() {


  const {user} = useContext(AuthContext);

  const navigate = useNavigate()
  


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/">
          <OlxLogo></OlxLogo>
          </Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        {user ? (
             
              <span>{`Welcome ${user.displayName}`}</span>
            
          ) : (
            <Link to="/login"> 
              <span style={{color:"black"}}>Login</span>
            </Link>
          )}
          <hr />
          
        </div>

        {user && (
          <span 
            onClick={() => {
              Firebase.auth.signOut();
              navigate('/login');
            }}
          >
            Logout
          </span>
        )}

        <div className="sellMenu">
        <Link to={user ? '/create' : '/login'}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

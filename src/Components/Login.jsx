import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CSSstyles/Login.css';
import Headerl from './Headerl';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can implement your login logic here
    // For simplicity, let's just check if the username and password match "admin"
    if (username === 'admin' && password === 'admin') {
      // If the login is successful, redirect to the corresponding page based on the selected category
      switch (selectedCategory) {
        case 'representative':
          navigate('/representative-page');
          break;
        case 'team-lead':
          navigate('/team-lead-page');
          break;
        case 'operations':
          navigate('/operations-page');
          break;
        default:
          alert('Invalid category');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
    <Headerl/>
    <div className="login-box">
      <form>
      <h3 className="welcome">Enter your credentials to login!</h3>
        <div className='in-box'>
          <label className="email">Email:</label>
          <input
            className="box"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="pass-box">
          <label className="email">Password:</label>
          <input
            className='p-box'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="category">
          <label>Role:</label>
          <div className="toggle-container">
            <label>
              <input
                type="radio"
                name="category"
                value="representative"
                checked={selectedCategory === 'representative'}
                onChange={handleCategoryChange}
              />
              Representative
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="team-lead"
                checked={selectedCategory === 'team-lead'}
                onChange={handleCategoryChange}
              />
              Team Lead
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="operations"
                checked={selectedCategory === 'operations'}
                onChange={handleCategoryChange}
              />
              Operations
            </label>
          </div>
        </div>
        <button className="loginbutton" type="button" onClick={handleLogin}>
          Login
        </button>
        <p className="reg-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;

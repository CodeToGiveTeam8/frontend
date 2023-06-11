import React from 'react';
import './CSSstyles/home.css';
import logo from '../Images/transparentlogo.png'
import regImage from './loginpage.jpg'; 
import './CSSstyles/Help.css'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
      marginTop: theme.spacing(4),
      textAlign: 'center',
      color: theme.palette.primary.main,
    },
    titleSpan: {
      color: theme.palette.primary.main,
    },
  }));

function Home() {
    const classes = useStyles();

    const handleLoginClick = () => {
        window.location.href = '/login';
      };
    
      const handleRegisterClick = () => {
        window.location.href = '/register';
      };
  return (
    <div className="App1">
      <header className="App-header1">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <div className="button-container">
          <button className="login-button" onClick={handleLoginClick}>Login</button>
          <button className="register-button" onClick={handleRegisterClick}>Register</button>
        </div>
      </header>
    

      <div className="content-wrapper">
        <div className="image-wrapper">
          <img src={regImage} alt="Registration" className="image-styling" />
        </div>
        <div className="faqss">
          <h2 className="homeheading">Bal Asha Trust</h2>
          <p className="hometext">Bal Asha Trust is one of India’s most trusted. We give life changing quality care to abandoned and destitute children. Our team provides systematic approach of care to our children so they are safe, healthy, educated and happy! We want every child to grow in a family, so we work hard to reunite children with their families or place them in loving and caring Adoptive families children through a legal process. 
          <br />
<br />
We actively support vulnerable children and strengthen families in their difficult times through our Nutrition, Medical, Education and Awareness programmes. We are recipients of the prestigious Ahilyabai Holkar award from the Government of Maharashtra.</p>
        </div>
      
    </div>
    </div>
  );
}

export default Home;
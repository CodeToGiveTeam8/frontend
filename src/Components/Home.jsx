import React from 'react';
import './CSSstyles/home.css';
import logo from '../Images/transparentlogo.png'
import Typography from "@material-ui/core/Typography";
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
      <div className="background-image"></div>
      <div>
        <Typography variant="h3" className={classes.title}>
        Welcome to the <br /> <span className={classes.titleSpan}>Bal Asha</span>{' '}
        <br /> Portal
        </Typography>
      </div>
    </div>
  );
}

export default Home;
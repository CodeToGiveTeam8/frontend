import { React, useState, useRef } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import logo from "../../Images/logoBAT.png";
import AddEntry from "../AddEntry";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./styles.css";
import Cookies from "universal-cookie";
import {useNavigate, Link} from "react-router-dom";


const NavBar = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [email,setEmail] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const APICall = (configObject)=>{
    return new Promise((resolve,reject)=>{
      fetch(configObject.url,{
        method:configObject.method?configObject.method:'GET',
        body:configObject.body?JSON.stringify(configObject.body):null,
        headers:configObject.headers?configObject.headers:{},
      }).then((response)=>resolve([response.status,response.json()]))
    })
  }

  const handleSubmitEmail = async(e) => {
      try {
        const body = {
          "from" : "beckysicky@gmail.com",
          "to" : email,
          "subject" : "Works need to be done."
      }
        const cookies = new Cookies()
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:"http://localhost:8081/user/mail",
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization': token},
          body : body,
        }
        const responseData = await APICall(configObject)
        setOpen(false);
      } catch (error) {
        console.error('Error:', error);
      }
};


  const logOut = () => {
    const cookies = new Cookies();  
    cookies.remove("accessToken");
    navigate('/');

  }

  const handleItemSelect = (eventKey) => {
    // Handle language selection logic here
  };

  return (
    <div>
      <Nav className="navbar-container">
        <Nav.Item className="navbar-logo">
          <img className="navbar-logo-image" src={logo} alt="logo" />
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navbar-link" href="/help">
            Help
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navbar-link" onClick={toggleModal}>
            Add New Entry
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className="navbar-link" onClick={handleClickOpen}>
            Get Updates
          </Nav.Link>
          
        </Nav.Item>
        <Nav.Item className="navbar-dropdown">
          <Dropdown className="navbar-dropdown">
            <Dropdown.Toggle
              className="navbar-dropdown-toggle"
              variant="outline-dark"
              id="language-dropdown"
            >
              Language
            </Dropdown.Toggle>
            <Dropdown.Menu className="navbar-dropdown-menu">
              <Dropdown.Item
                className="navbar-dropdown-item"
                eventKey="english"
              >
                English
              </Dropdown.Item>
              <Dropdown.Item className="navbar-dropdown-item" eventKey="hindi">
                Hindi
              </Dropdown.Item>
              <Dropdown.Item
                className="navbar-dropdown-item"
                eventKey="marathi"
              >
                Marathi
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navbar-link" onClick={logOut}>
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
         
          <div style={{height: '550px', overflow: 'auto', overflowX: 'hidden'}}>
  <AddEntry />
</div>
            {/* <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button> */}
          </div>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Get Updates</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To get updates about your tasks, please enter your email address here. We
            will send updates to your email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name1"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitEmail}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NavBar;

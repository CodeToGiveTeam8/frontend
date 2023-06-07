import { React, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import logo from "../../Images/logoBAT.png";
import AddEntry from "../AddEntry";
import "./styles.css";

const NavBar = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }


  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the backend here
  };

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
          <Nav.Link className="navbar-link" href="#">
            Help
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navbar-link" onClick={toggleModal}>
            Add New Entry
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link className="navbar-link" href="#">
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
          <Nav.Link className="navbar-link" href="#">
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
    </div>
  );
};

export default NavBar;

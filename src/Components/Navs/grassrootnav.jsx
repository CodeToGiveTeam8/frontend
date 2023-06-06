import { React, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import logo from "../../Images/logoBAT.png";
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

  const [childId, setChildId] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


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
          <h2>Add New Child</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="childId">Child ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="childId"
                  name="childId"
                  value={childId}
                  readOnly
                />
              </div>
              <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          className="form-control"
          id="gender"
          name="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          className="form-control-file"
          id="photo"
          name="photo"
          onChange={(event) => setPhoto(event.target.files[0])}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          className="form-control"
          id="category"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Select Category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
      </div>
      {/*<div className="form-group">
        <label htmlFor="state">State:</label>
        <input
          type="text"
          className="form-control"
          id="state"
          name="state"
          value={state}
          onChange={(event) => setState(event.target.value)}
        />
      </div>
       <div className="form-group">
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="date"
          className="form-control"
          id="start_date"
          name="start_date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="end_date">End Date:</label>
        <input
          type="date"
          className="form-control"
          id="end_date"
          name="end_date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </div> */}
            </form>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

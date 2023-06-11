import React from 'react'
import { Dropdown, Nav} from 'rsuite';
import "./CSSstyles/Headerl.css";
import logo from "../Images/logoBAT.png";

function Headerl() {
    const handleItemSelect = (eventKey, event) => {
        // Handle the selected item event here
        console.log('Selected item:', eventKey);
    };
  return (
    <Nav className='main-nav'>
      <Nav.Item className='logoimg'>
        <img class="logoimg" src={logo} alt="logo"></img>
      </Nav.Item>
      {/* <Nav.Item className='dropdown'>
            <Dropdown title="Language" className="Language" onSelect={handleItemSelect}> 
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="english">English</Dropdown.Item>
                    <Dropdown.Item eventKey="hindi">Hindi</Dropdown.Item>
                    <Dropdown.Item eventKey="marathi">Marathi</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav.Item > */}
    </Nav>
  );
}

export default Headerl

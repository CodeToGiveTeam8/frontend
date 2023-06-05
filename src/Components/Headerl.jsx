import React from 'react'
import { Dropdown, Nav} from 'rsuite';
import "./CSS styles/Headerl.css";

function Headerl() {
    const handleItemSelect = (eventKey, event) => {
        // Handle the selected item event here
        console.log('Selected item:', eventKey);
    };
  return (
    <Nav className='main-nav'>
      <Nav.Item className='logoimg'>
        <img class="logoimg" src="Images/logoBAT.png" alt="logo"></img>
      </Nav.Item>
      <Nav.Item className='dropdown'>
            <Dropdown title="Language" onSelect={handleItemSelect}> 
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="english">English</Dropdown.Item>
                    <Dropdown.Item eventKey="hindi">Hindi</Dropdown.Item>
                    <Dropdown.Item eventKey="marathi">Marathi</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav.Item >
    </Nav>
  );
}

export default Headerl
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import "./CSSstyles/Register.css";
import Headerl from "./Headerl";
import bgimage from "../Images/reg.jpg"

const Register = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [teamLeadName, setTeamLeadName] = useState("");

  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const mobileRegex = /^[0-9]{10}$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!emailRegex.test(event.target.value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Handle changes to the password field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (!passwordRegex.test(event.target.value)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter one lowercase letter, and one number');
    } else {
      setPasswordError('');
    }
  };

  // Handle changes to the mobile number field
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
    if (!mobileRegex.test(event.target.value)) {
      setMobileError('Please enter a valid mobile number');
    } else {
      setMobileError('');
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //I've just added some validations add more
    if(name.trim().length === 0){
      console.log("throw error...name is bad");
    }else if(!(email.includes('@'))){
      console.log("throw error....email is bad")
    }
    else if(mobile.trim().length !== 10){
      console.log("throw error...mobile is bad...")
    }

    //body to send for backend
    const objectBody = {
      name,dob,email,mobile,password,photo,gender,role:'GRASSROOT', team_lead : teamLeadName
    }
    console.log(objectBody)
    //the config object
    const configObject = {
      url:"http://localhost:8081/user/register",
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:objectBody
    }
    const responseData = await fetch(configObject.url,{
      method:configObject.method?configObject.method:'POST',
      body:configObject.body?JSON.stringify(configObject.body):null,
      headers:configObject.headers?configObject.headers:{},
    })
    console.log(responseData)
    //if registration is successful,redirect to login
    if(responseData.status === 200){
      navigate("/grassDashboard");
    }

    if (responseData.status === 400) {
      setMessage('Email already exists');
    }
    // Handle form submission here
    if (password === confirmPassword) {
      // Passwords match, do something
    } else {
      alert("Passwords do not match");
    }
  };

  const [message, setMessage] = useState('');

  const handlePhotoChange = (event) => {
    console.log(event.target.files[0])
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log(event.target)
      setPhoto(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ backgroundImage:`url(${bgimage})`,backgroundRepeat:"no-repeat",backgroundSize:"cover", backgroundPosition: "center"}}>
      <Headerl />
      <div className="register1">
        <form onSubmit={handleSubmit} className="form-register">
          <h2>Register</h2>
          <div className="row2">
            <div className="column">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  required
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {emailError && <div>{emailError}</div>}
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  required
                  value={mobile}
                  onChange={handleMobileChange} />
              </div>
              {mobileError && <div>{mobileError}</div>}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={handlePasswordChange} />
              {passwordError && <div>{passwordError}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="column">
              <div className="photo-upload">
                {photo ? (
                  <img src={photo} alt="Preview" className="photo-preview" />
                ) : (
                  <>
                    <label htmlFor="photo-upload" className="upload-label">
                      Click photo to upload
                    </label>
                    <input
                      type="file"
                      id="photo-upload"
                      onChange={handlePhotoChange}
                      accept="image/*"
                    />
                  </>
                )}
              </div>
              <div  className="dropdowns">
                <label htmlFor="role" >Role</label>
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a role</option>
                <option value="GRASSROOT">Grassroot</option>
                  <option value="OPERATION">Operation</option>
                  <option value="TEAMLEAD">Team Lead</option>
                </select>
                {role === 'GRASSROOT' && (
                <div className="form-group">
                <label htmlFor="teamlead">Team Lead Name</label>
                <input
                  type="text"
                  id="teamlead"
                  value={teamLeadName}
                  onChange={(e) => setTeamLeadName(e.target.value)}
                />
              </div>
      )}
                <label htmlFor="gender">Gender</label>
                <select id = "gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="MALE">Male</option>
                  <option value = "FEMALE">Female</option>
                  <option value = "OTHER">Other</option>
                </select>
              </div>
              
            </div>
          </div>
          <button type="submit" className='Register-sub'>Register</button>
          {message && <div>{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;

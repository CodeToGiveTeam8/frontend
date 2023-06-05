import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './CSSstyles/Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender,setGender] = useState(' ');
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    //I've just added some validations add more
    if(name.trim().length == 0){
      console.log("throw error...name is bad");
    }else if(!(email.includes('@'))){
      console.log("throw error....email is bad")
    }
    else if(mobile.trim().length != 10){
      console.log("throw error...mobile is bad...")
    }

    //body to send for backend
    const objectBody = {
      name,dob,email,mobile,password,username,photo,gender,role:'GRASSROOT'
    }
    //the config object
    const configObject = {
      url:"/user/register",
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:objectBody
    }
    const responseData = await fetch(configObject.url,{
      method:configObject.method?configObject.method:'GET',
      body:configObject.body?JSON.stringify(configObject.body):null,
      headers:configObject.headers?configObject.headers:{},
    })
    //if registration is successful,redirect to login
    if(responseData.status === 200){
      navigate("/login");
    }
    // Handle form submission here
  };

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
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="row">
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
          <label htmlFor="gender">Gender</label>
          <select className="form-control" onChange={(e)=>{setGender(e.target.value)}} defaultValue={"MALE"}>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        Click or drag photo to upload
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
        </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
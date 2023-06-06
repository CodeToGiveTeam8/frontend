import React, { useState } from "react";
import "./CSSstyles/Register.css";
import Headerl from "./Headerl";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    if (password === confirmPassword) {
      // Passwords match, do something
    } else {
      alert("Passwords do not match");
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setPhoto(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Headerl />
      <div className="register">
        <form onSubmit={handleSubmit} className="form-register">
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
                  <option value="OPERATION">Operation</option>
                  <option value="GRASSROOT">Grassroot</option>
                  <option value="TEAMLEAD">Team Lead</option>
                </select>
                <label htmlFor="gender">Gender</label>
                <select id = "gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="MALE">Male</option>
                  <option value = "FEMALE">Female</option>
                  <option value = "OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

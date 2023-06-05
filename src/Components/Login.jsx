import {React,useState} from 'react'
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';


function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const cookies = new Cookies();  //needed to parse cookies

  const addCookies = (accessToken)=>{
    cookies.set("accessToken",accessToken,{ path: '/' })//path : '/' means cookie can be accessible everywhere in the app
  }

  const getAccessToken = (configObject)=>{
    return new Promise((resolve,reject)=>{
      fetch(configObject.url,{
        method:configObject.method?configObject.method:'GET',
        body:configObject.body?JSON.stringify(configObject.body):null,
        headers:configObject.headers?configObject.headers:{},
      }).then((response)=>resolve(response.json()))
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const objectBody = {
      email,password
    }
    const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
    const configObject = {
      url:"/user/login",
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization': token},
      body:objectBody
    }
    const responseData = await getAccessToken(configObject)
    const accessToken = responseData['access-token']
    addCookies(accessToken)
    //navigating after successful login
    navigate('/grassDashboard');
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="row">
        <div className="column">

       
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login
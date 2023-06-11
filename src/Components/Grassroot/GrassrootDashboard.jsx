import React, { useState,useEffect } from 'react';
import Cookies from 'universal-cookie';
import '../CSSstyles/GrassrootDash.css';
import NavBar from '../Navs/grassrootnav';
import { useNavigate } from 'react-router-dom';

const GrassrootDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    const encodedId = encodeURIComponent(id);
    navigate(`/details/${encodedId}`);
  };

  const cookies = new Cookies(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [userDetail,setUserDetail] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.filter((item) => {
    // console.log(item)
    const lowercaseQuery = searchQuery.toLowerCase();
    return (
      item?.childId?.toString().includes(lowercaseQuery) ||
      item?.name?.toLowerCase().includes(lowercaseQuery) ||
      item?.category?.toLowerCase().includes(lowercaseQuery) ||
      item?.user_name?.toLowerCase().includes(lowercaseQuery) ||
      item?.orphanage?.toLowerCase().includes(lowercaseQuery)
    );
  });

  const APICall = (configObject)=>{
    return new Promise((resolve,reject)=>{
      fetch(configObject.url,{
        method:configObject.method?configObject.method:'GET',
        body:configObject.body?JSON.stringify(configObject.body):null,
        headers:configObject.headers?configObject.headers:{},
      }).then((response)=>resolve([response.status,response.json()]))
    })
  }

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("time's up");
    }, 10*1000);
  });

  const sendRequest = (promise1,promise2)=>{
    return new Promise((resolve,reject)=>{
      Promise.race([promise1,promise2]).then((value)=>{
        resolve(value);
      })
    })
  }

  const getCachedValue = (key)=>{
    return new Promise(async(resolve,reject)=>{
      resolve(localStorage.getItem(key))
    })
  }

  const handleRowClick = (id) => {
    handleNavigation(id)
  };

  const handleStatusChange = (e,childId,index)=>{
    const fetchData = async () => {
      try {
        const objectBody = { "childId" : `${childId}`, "status" : `${e.target.value}` }
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:"http://localhost:8081/child/status/edit",
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization': token},
          body:objectBody
        }
        const responseData = await APICall(configObject)
        const resCode = await responseData[0]
        if(resCode==200){
          window.location.reload();
        }else{
          alert(`Cannot change the status!`)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:"http://localhost:8081/home",
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData = await sendRequest(APICall(configObject),timeoutPromise);
        if(responseData === "time's up"){
          if(await getCachedValue("home")){
            responseData = JSON.parse(await getCachedValue("home"))
          }else{
            throw new Error("Network Error");
          }
        }
        localStorage.setData("home",JSON.stringify(responseData));
        const data = await responseData[1]
        // console.log(responseData)
        // console.log(data.data)
        setData(data.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:"http://localhost:8081/user",
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData = await sendRequest(APICall(configObject),timeoutPromise);
        if(responseData === "time's up"){
          if(await getCachedValue("user")){
            responseData = JSON.parse(await getCachedValue("user"))
          }else{
            throw new Error("Network Error");
          }
        }
        localStorage.setData("user",JSON.stringify(responseData));
        const data = await responseData[1]
        // console.log(responseData)
        // console.log(data)
        setUserDetail(data.data)
        console.log(data.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
    fetchUserData();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  return (
    <div style={{ backgroundColor:"white" }}>
    <NavBar/>
      <h2 style={{ marginTop: '20px' }}>Welcome {userDetail && userDetail.name}!</h2>
      <div style={{ marginTop: '2% !important' }} className='ophome'>
      {/* <h3>Grassroot Dashboard</h3> */}
        <input 
          type="text" 
          placeholder='Search...'
          value={searchQuery} 
          onChange={handleSearch} 
          className="search-bar" />
        <table style={{cursor:'pointer', marginTop: '2%'}}>
          <thead>
            <tr>
              <th>Child-Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>Case progress</th>
              <th>Deadline</th>
              <th>Social worker</th>
              <th>Orphanage</th>
            </tr>
          </thead>
          <tbody>
            {filteredData && filteredData.map((item,ind) => (
              <tr key={item.childId}>
                <td onClick={() => handleRowClick(item.childId)}>{item.childId}</td>
                <td onClick={() => handleRowClick(item.childId)}>
                  <a href="">{item.name}</a>
                </td>
                <td onClick={() => handleRowClick(item.childId)}>{item.category}</td>
                <td>
                  <select value={item.status} onChange={(e) => handleStatusChange(e,item.childId,ind)}>
                      <option value="NOT STARTED">NOT STARTED</option>
                      <option value="WORKING">WORKING</option>
                      <option value="DONE">DONE</option>
                      <option value="STOPPED">STOPPED</option>
                    </select>
                </td>
                <td onClick={() => handleRowClick(item.childId)}>{item.deadline|| "NA"}</td>
                <td onClick={() => handleRowClick(item.childId)}>{item.user_name}</td>
                <td onClick={() => handleRowClick(item.childId)}>{item.orphanage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrassrootDashboard;

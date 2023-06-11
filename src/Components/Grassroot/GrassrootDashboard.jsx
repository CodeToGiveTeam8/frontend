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
        const responseData = await APICall(configObject)
        const data = await responseData[1]
        // console.log(responseData)
        // console.log(data.data)
        setData(data.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  return (
    <div style={{ backgroundColor:"white" }}>
    <NavBar/>
      <div className='ophome'>
      <h3>Grassroot Dashboard</h3>
        <input 
          type="text" 
          placeholder='Search...'
          value={searchQuery} 
          onChange={handleSearch} 
          className="search-bar" />
        <table style={{cursor:'pointer'}}>
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
                <td onClick={() => handleRowClick(item.childId)}>{item.name}</td>
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

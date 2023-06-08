import React, { useState,useEffect } from 'react';
import Cookies from 'universal-cookie';
import '../CSSstyles/GrassrootDash.css';
import NavBar from '../Navs/grassrootnav';


const GrassrootDashboard = () => {
  const cookies = new Cookies();  
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.filter((item) => {
    
    console.log(item)
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
      }).then((response)=>resolve(response.json()))
    })
  }

  const handleRowClick = (id) => {
    console.log('Clicked row with ID:', id);
  };

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
        const data = responseData['data']
        console.log(responseData)
        console.log(data)
        setData(data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    

    fetchData();
  }, []);

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
        <table>
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
            {filteredData.map((item) => (
              <tr key={item.childId} onClick={() => handleRowClick(item.childId)}>
                <td>{item.childId}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.deadline|| "NA"}</td>
                <td>{item.user_name}</td>
                <td>{item.orphanage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrassrootDashboard;

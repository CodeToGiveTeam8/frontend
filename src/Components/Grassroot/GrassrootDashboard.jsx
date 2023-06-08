import React, { useState } from 'react';
import '../CSSstyles/GrassrootDash.css';
import NavBar from '../Navs/grassrootnav';


const GrassrootDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    {
      id: 1,
      name: 'John Doe',
      category: 'Abandon',
      caseProgress: 'Publish photo of the child in 2 National News Papers and 1 National TV Channel (DD)',
      deadline: '2023-06-30',
      socialWorker: 'Jane Smith',
      orphanage: 'Hope House'
    },
    {
      id: 2,
      name: 'Jane Smith',
      category: 'Surrender',
      caseProgress: 'Contact Local Police Department to find the biological parents',
      deadline: '2023-07-15',
      socialWorker: 'John Doe',
      orphanage: 'Sunshine Home'
    },
    // Add more data objects as needed...
  ]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return (
      item.id.toString().includes(lowercaseQuery) ||
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery) ||
      item.socialWorker.toLowerCase().includes(lowercaseQuery) ||
      item.orphanage.toLowerCase().includes(lowercaseQuery)
    );
  });

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
              <th>Id</th>
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
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.caseProgress}</td>
                <td>{item.deadline}</td>
                <td>{item.socialWorker}</td>
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

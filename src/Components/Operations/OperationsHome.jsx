import React, { useState } from 'react';
import '../CSSstyles/OperationsHome.css';
import Headerl from '../Headerl';

const OperationsHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    {
      id: 1,
      name: 'John Doe',
      category: 'Abandon',
      caseProgress: 40,
      deadline: '2023-06-30',
      socialWorker: 'Jane Smith',
      orphanage: 'Hope House'
    },
    {
      id: 2,
      name: 'Jane Smith',
      category: 'Surrender',
      caseProgress: 80,
      deadline: '2023-07-15',
      socialWorker: 'John Doe',
      orphanage: 'Sunshine Home'
    },
    // Add more data objects as needed...
  ]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Headerl />
    <div className='ophome'>
      <input 
      type="text" 
      placeholder='Search by name...'
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
              <td>{item.caseProgress}%</td>
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

export default OperationsHome;
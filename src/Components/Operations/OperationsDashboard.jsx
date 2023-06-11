import React, { useState } from 'react';
import '../CSSstyles/OperationsDash.css';
import Headerl from '../Navs/operationsnav';
import Graph from './Graph'
import Pie from './Pie'

const OperationsDashboard = () => {
  const [progress, setProgress] = useState({
    abandon: 20,
    surrender: 50,
    admitted: 80
  });

  const [urgentCases, setUrgentCases] = useState([
    {
      id: 1,
      name: 'Rishi Kumar',
      orphanageName: 'Hope House',
      socialWorkerName: 'Sooraj',
      selected: false
    },
    {
      id: 2,
      name: 'Sruthi Nair',
      orphanageName: 'Don Bosco',
      socialWorkerName: 'Rahul Menon',
      selected: false
    },
    {
      id: 3,
      name: 'Karthik K',
      orphanageName: 'Little Flower',
      socialWorkerName: 'Sara Ahmed',
      selected: false
    }
  ]);

  const handleCaseSelect = (id) => {
    const updatedCases = urgentCases.map((caseItem) => {
      if (caseItem.id === id) {
        return {
          ...caseItem,
          selected: !caseItem.selected
        };
      } else {
        return caseItem;
      }
    });
    setUrgentCases(updatedCases);
  };

  return (
    <div>
    <Headerl />
    <div className='container'>
    <div className="row">
         <Graph />
         <Pie />
      </div>
      <div className="row">
        
          <table className="table">
            <thead>
              <tr>
              <th>Check</th>
                <th>Name</th>
                <th>Orphanage Name</th>
                <th>Social Worker Name</th>
                
              </tr>
            </thead>
            <tbody>
              {urgentCases.map((caseItem) => (
                <tr key={caseItem.id}>
                <td>
                    <input
                      type="checkbox"
                      checked={caseItem.selected}
                      onChange={() => handleCaseSelect(caseItem.id)}
                    />
                  </td>
                  <td>{caseItem.name}</td>
                  <td>{caseItem.orphanageName}</td>
                  <td>{caseItem.socialWorkerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>
     
      </div>
    </div>
  );
};

export default OperationsDashboard;
import React, { useState } from 'react';
import '../CSSstyles/OperationsDash.css';
import Headerl from '../Headerl';

const OperationsDashboard = () => {
  const [progress, setProgress] = useState({
    abandon: 20,
    surrender: 50,
    admitted: 80
  });

  const [urgentCases, setUrgentCases] = useState([
    {
      id: 1,
      name: 'John Doe',
      orphanageName: 'Hope House',
      socialWorkerName: 'Jane Smith',
      selected: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      orphanageName: 'Sunshine Home',
      socialWorkerName: 'John Doe',
      selected: false
    },
    {
      id: 3,
      name: 'Mark Johnson',
      orphanageName: 'Little Angels',
      socialWorkerName: 'Sara Williams',
      selected: false
    }
    // Add more urgent cases as needed...
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
        <div className="col">
          <div className="progress">Progress of Categories</div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill abandon"
              style={{ width: `${progress.abandon}%` }}
            ></div>
            </div>
            <div className="progress-bar-container">
            <div
              className="progress-bar-fill surrender"
              style={{ width: `${progress.surrender}%` }}
            ></div>
            </div>
            <div className="progress-bar-container">
            <div
              className="progress-bar-fill admitted"
              style={{ width: `${progress.admitted}%` }}
            ></div>
          </div>
        </div>
        <div className="col">
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
      <div className="row">
        <div className="col">
          <div className="graph">Graph 1</div>
        </div>
        <div className="col">
          <div className="graph">Graph 2</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default OperationsDashboard;
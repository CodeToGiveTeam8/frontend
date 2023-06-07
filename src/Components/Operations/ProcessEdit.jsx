import React, { useState } from 'react';
import '../CSSstyles/ProcessEdit.css';

function ProcessEdit() {
  // Assuming you have an array of data containing S.No., Step, and Sub-steps
  const initialData = [
    { sNo: 1, step: 'Work on and complete documentation', subSteps: [{ subStep: 'Newspaper Publication', completed: false }, { subStep: 'TV Telecasting', completed: false }, { subStep: 'File Missing Compliant, if not already done', completed: false }] },
    { sNo: 2, step: 'Submit to DCPU and get NOC', subSteps: [{ subStep: 'Submit child’s report for DCPU for NOC', completed: false }, { subStep: 'Receive DCPU NOC', completed: false }] },
    { sNo: 3, step: 'Work on and complete documentationWork on and complete documentationWork on and complete documentationWork on and complete documentationWork on and complete documentation', subSteps: [{ subStep: 'Sub-step 3.1', completed: false }, { subStep: 'Sub-step 3.2', completed: false }, { subStep: 'Sub-step 3.3', completed: false }, { subStep: 'Sub-step 3.4', completed: false }] },
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckboxChange = (stepIndex, subStepIndex) => {
    const updatedData = [...data];
    const checked = !updatedData[stepIndex].subSteps[subStepIndex].completed;
    updatedData[stepIndex].subSteps[subStepIndex].completed = checked;
    setData(updatedData);

    if (checked) {
      setShowPopup(true); // Show the pop-up only when the checkbox is checked
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the pop-up
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Step</th>
            <th>Sub-steps</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, stepIndex) => (
            <React.Fragment key={stepIndex}>
              <tr>
                <td rowSpan={item.subSteps.length}>{item.sNo}</td>
                <td rowSpan={item.subSteps.length}>{item.step}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.subSteps[0].completed || false}
                    onChange={() => handleCheckboxChange(stepIndex, 0)}
                  />
                  {item.subSteps[0].subStep}
                </td>
              </tr>
              {item.subSteps.slice(1).map((subStep, subStepIndex) => (
                <tr key={subStepIndex}>
                  <td>
                    <input
                      type="checkbox"
                      checked={subStep.completed || false}
                      onChange={() => handleCheckboxChange(stepIndex, subStepIndex + 1)}
                    />
                    {subStep.subStep}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Do you want to upload a file?</h2>
            <input type="file" />
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProcessEdit
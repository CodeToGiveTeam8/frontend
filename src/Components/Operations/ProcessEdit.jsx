import React, { useState,useEffect } from 'react';
import '../CSSstyles/ProcessEdit.css';
import Cookies from 'universal-cookie';


function ProcessEdit() {
  // Assuming you have an array of data containing S.No., Step, and Sub-steps
  const initialData = [];
  const cookies = new Cookies();  //needed to parse cookies

  const [data, setData] = useState(initialData);
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false); // Close the pop-up
  };

  const getProcessData = (configObject)=>{
    return new Promise((resolve,reject)=>{
      fetch(configObject.url,{
        method:configObject.method?configObject.method:'GET',
        body:configObject.body?JSON.stringify(configObject.body):null,
        headers:configObject.headers?configObject.headers:{},
      }).then((response)=>resolve(response.json()))
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:"http://localhost:8081/process/?category=ABANDONED",
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData = await getProcessData(configObject)
        const data = responseData['data']
        setData(data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

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
                <td rowSpan={item.subProcess.length + 1}>{item.orderNo}</td>
                <td rowSpan={item.subProcess.length + 1}>{item.process[0].name}</td>
              </tr>
              {item.subProcess.map((subStep, subStepIndex) => (
                <tr key={subStepIndex}>
                  <td>
                    <input disabled type="checkbox"/>
                    {subStep.name}
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
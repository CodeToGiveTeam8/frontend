// import React, { useState, useMemo } from 'react';
// import { MaterialReactTable } from 'material-react-table';
// import '../CSSstyles/GDetails.css';
// import NavBar from '../Navs/grassrootnav';

// function GDetails() {  
//   const initialData = [
//     { sNo: 1, step: 'Work on and complete documentation', subSteps: [{ subStep: 'Newspaper Publication', completed: false }, { subStep: 'TV Telecasting', completed: false }, { subStep: 'File Missing Compliant, if not already done', completed: false }] },
//     { sNo: 2, step: 'Submit to DCPU and get NOC', subSteps: [{ subStep: 'Submit child’s report for DCPU for NOC', completed: false }, { subStep: 'Receive DCPU NOC', completed: false }] },
//     { sNo: 3, step: 'Work on and complete documentationWork on and complete documentationWork on and complete documentationWork on and complete documentationWork on and complete documentation', subSteps: [{ subStep: 'Sub-step 3.1', completed: false }, { subStep: 'Sub-step 3.2', completed: false }, { subStep: 'Sub-step 3.3', completed: false }, { subStep: 'Sub-step 3.4', completed: false }] },
//   ];

//   const [data, setData] = useState(initialData);
//   const [showPopup, setShowPopup] = useState(false);

//   const handleCheckboxChange = (stepIndex, subStepIndex) => {
//     const updatedData = [...data];
//     const checked = !updatedData[stepIndex].subSteps[subStepIndex].completed;
//     updatedData[stepIndex].subSteps[subStepIndex].completed = checked;
//     setData(updatedData);

//     if (checked) {
//       setShowPopup(true); 
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false); 
//   };

//   return (
//     <div>
//     <NavBar />
//     <div className="table-container">
      
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>S.No.</th>
//             <th>Step</th>
//             <th>Sub-steps</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, stepIndex) => (
//             <React.Fragment key={stepIndex}>
//               <tr>
//                 <td rowSpan={item.subSteps.length}>{item.sNo}</td>
//                 <td rowSpan={item.subSteps.length}>{item.step}</td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={item.subSteps[0].completed || false}
//                     onChange={() => handleCheckboxChange(stepIndex, 0)}
//                   />
//                   {item.subSteps[0].subStep}
//                 </td>
//               </tr>
//               {item.subSteps.slice(1).map((subStep, subStepIndex) => (
//                 <tr key={subStepIndex}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={subStep.completed || false}
//                       onChange={() => handleCheckboxChange(stepIndex, subStepIndex + 1)}
//                     />
//                     {subStep.subStep}
//                   </td>
//                 </tr>
//               ))}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>

//       {showPopup && (
//         <div className="popup-container">
//           <div className="popup">
//             <h2>Do you want to upload a file?</h2>
//             <input type="file" />
//             <button onClick={closePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// }

// export default GDetails;
import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const data = [
  {
    name: {
      firstName: '1',
      lastName: 'Work on and complete documentation',
    },
    address: '261 Erdman Ford',
  },
  {
    name: {
      firstName: '2',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
  },
  {
    name: {
      firstName: '3',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
  },
  {
    name: {
      firstName: '4',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
  },
];

const GDetails = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName',
        header: 'S.No.',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Step',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Sub-steps',
        size: 200,
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
    />
  );
};

export default GDetails;







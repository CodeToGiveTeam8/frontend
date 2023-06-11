import React, { useState } from 'react';
import MyDropDown from './process/MyDropDown';


function ProcessEdit() {
  const initialData = [
    {
      processName : 'Abandoned',
      processFlow : [
        { sNo: 1, step: 'Step 1', subSteps: [{ subStep: 'Sub-step 1.1', completed: false }, { subStep: 'Sub-step 1.2', completed: false }, { subStep: 'Sub-step 1.3', completed: false }] },
        { sNo: 2, step: 'Step 2', subSteps: [{ subStep: 'Sub-step 2.1', completed: false }, { subStep: 'Sub-step 2.2', completed: false }] },
        { sNo: 3, step: 'Step 3', subSteps: [{ subStep: 'Sub-step 3.1', completed: false }, { subStep: 'Sub-step 3.2', completed: false }, { subStep: 'Sub-step 3.3', completed: false }, { subStep: 'Sub-step 3.4', completed: false }] },
      ]
    },
    {
      processName : 'Orphaned',
      processFlow : [
        { sNo: 1, step: 'Step 11', subSteps: [{ subStep: 'Sub-step 11.1', completed: false }, { subStep: 'Sub-step 11.2', completed: false }, { subStep: 'Sub-step 11.3', completed: false }] },
        { sNo: 2, step: 'Step 21', subSteps: [{ subStep: 'Sub-step 21.1', completed: false }, { subStep: 'Sub-step 21.2', completed: false }] },
        { sNo: 3, step: 'Step 31', subSteps: [{ subStep: 'Sub-step 31.1', completed: false }, { subStep: 'Sub-step 31.2', completed: false }, { subStep: 'Sub-step 31.3', completed: false }, { subStep: 'Sub-step 31.4', completed: false }] },
      ]
    },
    {
      processName : 'Surrendered',
      processFlow : [
        { sNo: 1, step: 'Step 12', subSteps: [{ subStep: 'Sub-step 12.1', completed: false }, { subStep: 'Sub-step 12.2', completed: false }, { subStep: 'Sub-step 12.3', completed: false }] },
        { sNo: 2, step: 'Step 22', subSteps: [{ subStep: 'Sub-step 22.1', completed: false }, { subStep: 'Sub-step 22.2', completed: false }] },
        { sNo: 3, step: 'Step 32', subSteps: [{ subStep: 'Sub-step 32.1', completed: false }, { subStep: 'Sub-step 32.2', completed: false }, { subStep: 'Sub-step 32.3', completed: false }, { subStep: 'Sub-step 32.4', completed: false }] },
      ]
    }
  ];
  const [selectedStage,setSelectedStage] = useState('');


return (
  <div style={{marginTop:'150px'}}>
    {initialData.map((element)=>{
      if(selectedStage === ''){
        return <div><button>addTask</button><MyDropDown processFlow={element.processFlow} name={element.processName} selectedStage={selectedStage} setSelectedStage = {setSelectedStage} show={true}></MyDropDown></div>
      }
      if(element.processName === selectedStage){
        return <MyDropDown processFlow={element.processFlow} name={element.processName} selectedStage={selectedStage} setSelectedStage = {setSelectedStage} show={true}></MyDropDown>
      }
      return <MyDropDown processFlow={element.processFlow} name={element.processName} selectedStage={selectedStage} setSelectedStage = {setSelectedStage} show={false}></MyDropDown>
    })}
    {selectedStage === '' && <button>addTask</button>}
  </div>
)
}
export default ProcessEdit
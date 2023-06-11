import React, { useEffect, useState } from 'react';
import MyDropDown from './process/MyDropDown';
import NavBar from '../Navs/grassrootnav';
import "./process/css/process.css"
import Cookies from 'universal-cookie';

function ProcessEdit() {
  /*const initialData = [
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
  */

  const [dataObj,setDataObj] = useState([]);
  const cookies = new Cookies(); 

  const APICall = (configObject)=>{
    return new Promise((resolve,reject)=>{
      fetch(configObject.url,{
        method:configObject.method?configObject.method:'GET',
        body:configObject.body?JSON.stringify(configObject.body):null,
        headers:configObject.headers?configObject.headers:{},
      }).then((response)=>resolve(response.json()))
    })
  }


  
  const changeObject = (taskName,obj)=>{
    setDataObj((prev)=>{
      const newObj = [...prev];
      for(let i=0;i<newObj.length;i++){
        if(newObj[i].processName === taskName){
            newObj[i] ={...newObj[i],processFlow:obj};
        }
      }
      return newObj;
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
        const responseData = await APICall(configObject)
        const data = responseData['data']
        console.log(data)
        const processFlow = [];
        
        for(let i=0;i<data.length;i++){
          let subSteps = []
          for(let i=0;i<data[i].process.subProcess.length;i++){
            subSteps.push({id:data[i].process.subProcess[i].id,subStep : data[i].process.subProcess[i].name,documents : data[i].process.subProcess[i].documents})
          }
          processFlow.push({sNo : data[i].process.id, step: data[i].process.name, subSteps});
        }

        const processObj1 = {
          processName: 'Abandoned',
          processFlow
        };
        const configObject1 = {
          url:"http://localhost:8081/process/?category=SURRENDERED",
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData1 = await APICall(configObject1)
        const data1 = responseData1['data']
        const processFlow1 = [];
        
        for(let i=0;i<data1.length;i++){
          let subSteps = []
          for(let i=0;i<data1[i].process.subProcess.length;i++){
            subSteps.push({id:data1[i].process.subProcess[i].id,subStep : data1[i].process.subProcess[i].name,documents : data1[i].process.subProcess[i].documents})
          }
          processFlow1.push({sNo : data1[i].process.id, step: data1[i].process.name, subSteps});
        }

        const processObj2 = {
          processName: 'Surrendered',
          processFlow:processFlow1
        };

        const configObject2 = {
          url:"http://localhost:8081/process/?category=ORPHANED",
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData2 = await APICall(configObject2)
        const data2 = responseData2['data']
        const processFlow2 = [];
        
        for(let i=0;i<data2.length;i++){
          let subSteps = []
          for(let i=0;i<data2[i].process.subProcess.length;i++){
            subSteps.push({id:data2[i].process.subProcess[i].id,subStep : data2[i].process.subProcess[i].name,documents : data2[i].process.subProcess[i].documents})
          }
          processFlow2.push({sNo : data2[i].process.id, step: data2[i].process.name, subSteps});
        }

        const processObj3 = {
          processName: 'Orphaned',
          processFlow:processFlow2
        };

        const dataObj = [processObj1,processObj2,processObj3];
        console.log(dataObj);
        setDataObj(dataObj);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const [selectedStage,setSelectedStage] = useState('');

  if(dataObj.length === 0){
    return 'loading.....'
  }

return (
  <>
  <NavBar />
  <h1>Update Process Flow</h1>
  <div style={{marginTop:'140px'}}>
    {dataObj.map((element)=>{
      if(selectedStage === ''){
        return <div style={{marginTop:'10px',position:'relative'}}><MyDropDown processFlow={element.processFlow} name={element.processName} selectedStage={selectedStage} setSelectedStage = {setSelectedStage} show={true}></MyDropDown></div>
      }
      if(element.processName === selectedStage){
        return <MyDropDown changeObject={changeObject} processFlow={element.processFlow} name={element.processName} selectedStage={selectedStage} setSelectedStage = {setSelectedStage} show={true}></MyDropDown>
      }
      return <MyDropDown processFlow={element.processFlow} name={element.processName} selectedStage={selectedStage} setSelectedStage = {setSelectedStage} show={false}></MyDropDown>
    })}

  </div>
  </>
)
}
export default ProcessEdit
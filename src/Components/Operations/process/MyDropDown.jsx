import React,{useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MySecondDropDown from './MySecondDropDown';
import AddTask from './AddTask';



const MyDropDown = (props)=>{
    const [selectedSubStage,setSelectedSubStage] = useState('');
    const [processFlow,setProcessFlow] = useState(props.processFlow);
    const clickHandler = ()=>{
        if(props.show){
            if(props.name === props.selectedStage){
                props.setSelectedStage('');
            }else{
                props.setSelectedStage(props.name);
            }
        }
    }

    const newChangeObject = (step,obj)=>{
        const newProcessFlow = [...processFlow];
        for(let i=0;i<newProcessFlow.length;i++){
            if(newProcessFlow[i].step === step){
                newProcessFlow[i].subSteps = obj;
            }
        }
        props.changeObject(props.name,newProcessFlow);
    }

    const addTaskHandler = (name)=>{
        const newProcessFlow = processFlow;
        for(let i=0;i<newProcessFlow.length;i++){
            if(newProcessFlow[i].step === 'addTask'){
                newProcessFlow[i].step = name
            }
        }
        props.changeObject(props.name,newProcessFlow);
    }

    const addNewTask = (afterTask)=>{
        const newFlow = []
        let k = 0;
        for(let i=0;i<props.processFlow.length;i++){
            if(afterTask === props.processFlow[i].step){
                newFlow.push({sno : props.processFlow[i].sno,step : 'addTask',subSteps:[]});
                k=1;
            }
            if(k == 1){
                newFlow.push({sno:props.processFlow[i].sno,step:props.processFlow[i].step,subSteps:props.processFlow[i].subSteps})
            }else{
                newFlow.push(props.processFlow[i]);
            }
        }
        if(afterTask === "last"){
            newFlow.push({sno : props.processFlow.length+1,step : 'addTask',subSteps:[]});
        }
        setProcessFlow(newFlow);
    }


    const bgColor = props.show ? ((props.selectedStage === '')?'white':'#28a745'):'rgb(235,235,228)';
    const color = props.show ? ((props.selectedStage === '')?'black':'black'):'darkgrey'

    return (
        <div style={{marginTop:'10px'}}>
      <div style={{alignItems:'center',justifyContent:'center',display:'flex'}} onClick={clickHandler} disabled={!props.show}>
        <div className = "dropdownOne" style={{width : '500px',height:'40px',position:'relative',paddingTop:'20px',backgroundColor:bgColor,borderRadius:'10px',color:color}}>
          {props.name}
          {
          props.name !== props.selectedStage ? 
          <ArrowDropDownIcon style={{position:'absolute',right:0,paddingRight:'10px',color:'grey'}}></ArrowDropDownIcon> : 
          <ArrowDropUpIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropUpIcon>
          }
        </div>
    </div>
    {props.show && props.selectedStage === props.name && <div style={{marginTop:'25px'}}>
        {
            (props.show && props.selectedStage === props.name && props.processFlow.length + 1 === processFlow.length) &&
            processFlow.map((element)=>{
                if(element.step === 'addTask'){
                    return <div style={{marginTop:'10px'}}><AddTask addTaskHandler={addTaskHandler}></AddTask></div>
                }
                return <div style={{marginTop:'10px'}}><MySecondDropDown subSteps={element.subSteps} step={element.step} selectedSubStage={selectedSubStage} setSelectedSubStage={setSelectedSubStage} show={true}></MySecondDropDown></div>
            })
        }
    {
        (props.show && props.selectedStage === props.name && props.processFlow.length === processFlow.length) &&
        processFlow.map((element)=>{
            if(selectedSubStage === ''){
                return <div style={{marginTop:'10px'}}><button className='circlebutton' onClick = {()=>{addNewTask(element.step)}}>+</button><MySecondDropDown subSteps={element.subSteps} step={element.step} selectedSubStage={selectedSubStage} setSelectedSubStage={setSelectedSubStage} show={true}></MySecondDropDown></div>
            }
            if(selectedSubStage === element.step){
                return <MySecondDropDown newChangeObject={newChangeObject} subSteps={element.subSteps} step={element.step} selectedSubStage={selectedSubStage} setSelectedSubStage={setSelectedSubStage} show={true}></MySecondDropDown>
            }
            return <MySecondDropDown subSteps={element.subSteps} step={element.step} selectedSubStage={selectedSubStage} setSelectedSubStage={setSelectedSubStage} show={false}></MySecondDropDown>
        })
    }
    {(selectedSubStage === '' && props.processFlow.length  === processFlow.length) && <button className='circlebutton' onClick = {()=>{addNewTask("last")}}>+</button>}
    </div>
    }
    </div>
    )
}

export default MyDropDown;
import React,{useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MyThirdDropDown from './MyThirdDropDown';
import AddTask from './AddTask';

const MySecondDropDown = (props)=>{
    
    const [selectedSmallStep,setSelectedSmallStep] = useState('');
    const [subSteps,setSubSteps] = useState(props.subSteps);

    const clickHandler = ()=>{
        if(props.show){
            if(props.step === props.selectedSubStage){
                props.setSelectedSubStage('');
            }else{
                props.setSelectedSubStage(props.step);
            }
        }
    }

    const documentChangeObject = (step,obj)=>{
        const newSubSteps = [...subSteps];
        for(let i=0;i<newSubSteps.length;i++){
            if(newSubSteps[i].subStep === step){
                newSubSteps[i].documents = obj;
            }
        }
        props.newChangeObject(props.step,newSubSteps);
    }

    const addTaskHandler = (name)=>{
        const newsubSteps = [...subSteps];
        for(let i=0;i<newsubSteps.length;i++){
            if(newsubSteps[i].subStep === 'addTask'){
                newsubSteps[i].subStep = name
            }
        }
        props.newChangeObject(props.step,newsubSteps);
    }


    const addNewTask = (afterTask)=>{
        const newFlow = []
        let k = 0;
        for(let i=0;i<props.subSteps.length;i++){
            if(afterTask === props.subSteps[i].subStep){
                newFlow.push({id: i+1 ,subStep : 'addTask',documents:[]});
                k=1;
            }
            if(k == 1){
                newFlow.push({id:i+1,subStep : props.subSteps[i].subStep,documents:[]})
            }else{
                newFlow.push(props.subSteps[i]);
            }
        }
        if(afterTask === "last"){
            newFlow.push({id:props.subSteps.length+1,subStep : 'addTask',documents:[]});
        }
        setSubSteps(newFlow);
    }


    const bgColor = props.show ? ((props.selectedSubStage === '')?'white':'#F99B7D'):'rgb(235,235,228)';
    const color = props.show ? ((props.selectedStage === '')?'black':'black'):'darkgrey'

    return (
        <div>
      <div style={{alignItems:'center',justifyContent:'center',display:'flex'}} onClick={clickHandler} disabled={!props.show}>
        <div className="dropdownOne" style={{width : '500px',height:'40px',position:'relative',paddingTop:'20px',backgroundColor:bgColor,borderRadius:'10px',color:color}}>
          {props.step}
          {
          props.step !== props.selectedSubStage ? 
          <ArrowDropDownIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropDownIcon> : 
          <ArrowDropUpIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropUpIcon>
          }
        </div>
    </div>
    <div style={{marginTop:'25px',marginBottom:'25px'}}>
        {
            (props.show && props.selectedSubStage === props.step && props.subSteps.length + 1 === subSteps.length)&&
            subSteps.map((element)=>{
                if(element.subStep === 'addTask'){
                    return <div style={{marginTop:'10px'}}><AddTask addTaskHandler={addTaskHandler}></AddTask></div>
                }
                return <div style={{marginTop:'10px'}}><MyThirdDropDown step={element.subStep} selectedSmallStep={selectedSmallStep} setSelectedSmallStep={setSelectedSmallStep} documents={element.documents} show={true}></MyThirdDropDown></div>
            })
        }
    {
        (props.show && props.selectedSubStage === props.step && props.subSteps.length === subSteps.length) &&
        subSteps.map((element)=>{
            if(selectedSmallStep === ''){
                return <div><button className='circlebutton' onClick={()=>{addNewTask(element.subStep)}}>+</button><MyThirdDropDown step={element.subStep} selectedSmallStep={selectedSmallStep} setSelectedSmallStep={setSelectedSmallStep} documents={element.documents} show={true}></MyThirdDropDown></div>
            }
            if(selectedSmallStep === element.subStep){
                return <MyThirdDropDown step={element.subStep} documentChangeObject={documentChangeObject} documents={element.documents} selectedSmallStep={selectedSmallStep} setSelectedSmallStep={setSelectedSmallStep} show={true}></MyThirdDropDown>
            }
            return <MyThirdDropDown step={element.subStep} documents={element.documents} selectedSmallStep={selectedSmallStep} setSelectedSmallStep={setSelectedSmallStep} show={false}></MyThirdDropDown>
        })
    }
    {props.show && props.selectedSubStage === props.step && (selectedSmallStep === '') && props.subSteps.length  === subSteps.length && <button onClick={()=>{addNewTask("last")}} className='circlebutton'>+</button>}
    </div>
    </div>
    )
}

export default MySecondDropDown;
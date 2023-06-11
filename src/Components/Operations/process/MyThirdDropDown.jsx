import React,{useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MyFourthDropDown from "./MyFourthDropDown";
import AddTask from './AddTask';

const MyThirdDropDown = (props)=>{

    const [documentStep,setDocumentStep] = useState('');
    const [documents,setDocuments] = useState(props.documents);


    const clickHandler = ()=>{
        if(props.show){
            if(props.step === props.selectedSmallStep){
                props.setSelectedSmallStep('');
            }else{
                props.setSelectedSmallStep(props.step);
            }
        }
    }

    const addTaskHandler = (name)=>{
        const newDocuments = [...documents];
        for(let i=0;i<newDocuments.length;i++){
            if(newDocuments[i].name === 'addTask'){
                newDocuments[i].name = name
            }
        }
        props.documentChangeObject(props.step,newDocuments);
    }


    const addNewTask = (afterTask)=>{
        console.log(afterTask)
        const newFlow = []
        let k = 0;
        for(let i=0;i<props.documents.length;i++){
            if(afterTask === props.documents[i].name){
                newFlow.push({name : 'addTask'});
                k=1;
            }
            if(k == 1){
                newFlow.push({name : props.documents[i].name})
            }else{
                newFlow.push(props.documents[i]);
            }
        }
        if(afterTask === "last"){
            newFlow.push({name : 'addTask'});
        }
        setDocuments(newFlow);
    }

    const bgColor = props.show ? ((props.selectedSmallStep === '')?'white':'#A8D1D1'):'rgb(235,235,228)';
    const color = props.show ? ((props.selectedStage === '')?'black':'black'):'darkgrey'

    return (
        <div style={{marginTop:'10px'}}>
      <div style={{alignItems:'center',justifyContent:'center',display:'flex'}} onClick={clickHandler} disabled={!props.show}>
        <div className="dropdownOne" style={{width : '500px',height:'40px',position:'relative',paddingTop:'20px',backgroundColor:bgColor,borderRadius:'10px',color:color}}>
          {props.step}
          {
          props.step !== props.selectedSmallStep ? 
          <ArrowDropDownIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropDownIcon> : 
          <ArrowDropUpIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropUpIcon>
          }
        </div>
    </div>
    <div style={{marginTop:'25px',marginBottom:'25px'}}>
        {
            (props.show && props.selectedSmallStep === props.step && props.documents.length + 1 === documents.length)&&
            documents.map((element)=>{
                if(element.name === 'addTask'){
                    return <div style={{marginTop:'10px'}}><AddTask addTaskHandler={addTaskHandler}></AddTask></div>
                }
                return <div style={{marginTop:'10px'}}><MyFourthDropDown step={element.name} documentStep={documentStep} setDocumentStep={setDocumentStep} show={true}></MyFourthDropDown></div>
            })
        }
    {
        (props.show && props.selectedSmallStep === props.step && props.documents.length === documents.length) &&
        documents.map((element)=>{
            if(documentStep === ''){
                return <div><button className='circlebutton' onClick={()=>{addNewTask(element.name)}}>+</button><MyFourthDropDown step={element.name} documentStep={documentStep} setDocumentStep={setDocumentStep} show={true}></MyFourthDropDown></div>
            }
            if(documentStep === element.name){
                return <MyFourthDropDown step={element.name} documentStep={documentStep} setDocumentStep={setDocumentStep} show={true}></MyFourthDropDown>
            }
            return <MyFourthDropDown step={element.name} documentStep={documentStep} setDocumentStep={setDocumentStep} show={false}></MyFourthDropDown>
        })
    }
    {props.show && props.selectedSmallStep === props.step && (documentStep === '') && props.documents.length === documents.length &&<button onClick={()=>{addNewTask("last")}} className='circlebutton'>+</button>}
    </div>
    
    </div>
    )
}

export default MyThirdDropDown;
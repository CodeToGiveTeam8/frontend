import React,{useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MySecondDropDown from './MySecondDropDown';

const MyDropDown = (props)=>{
    const [selectedSubStage,setSelectedSubStage] = useState('');
    const clickHandler = ()=>{
        if(props.show){
            if(props.name === props.selectedStage){
                props.setSelectedStage('');
            }else{
                props.setSelectedStage(props.name);
            }
        }
    }

    const bgColor = props.show ? ((props.selectedStage === '')?'white':'red'):'grey';

    return (
        <div>
      <div style={{alignItems:'center',justifyContent:'center',display:'flex'}} onClick={clickHandler} disabled={!props.show}>
        <div style={{border:'1px solid black',width : '500px',height:'40px',position:'relative',paddingTop:'20px',backgroundColor:bgColor}}>
          {props.name}
          {
          props.name !== props.selectedStage ? 
          <ArrowDropDownIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropDownIcon> : 
          <ArrowDropUpIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropUpIcon>
          }
        </div>
    </div>
    {
        (props.show && props.selectedStage === props.name) &&
        props.processFlow.map((element)=>{
            if(selectedSubStage === ''){
                return <div><button>addTask</button><MySecondDropDown subSteps={element.subSteps} step={element.step} selectedSubStage={selectedSubStage} setSelectedSubStage={setSelectedSubStage} show={true}></MySecondDropDown></div>
            }
            if(selectedSubStage === element.step){
                return <MySecondDropDown subSteps={element.subSteps} step={element.step} selectedSubStage={selectedSubStage} setSelectedSubStage={setSelectedSubStage} show={true}></MySecondDropDown>
            }
            return <MySecondDropDown subSteps={element.subSteps} step={element.step} selectedSubStage={selectedSubStage} setSelectedSubStage={setSelectedSubStage} show={false}></MySecondDropDown>
        })
    }
    {
        (props.show && props.selectedStage === props.name && selectedSubStage === '') && <button>addTask</button>
    }
    </div>
    )
}

export default MyDropDown;
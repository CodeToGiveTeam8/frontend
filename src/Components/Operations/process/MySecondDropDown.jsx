import React,{useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MyThirdDropDown from './MyThirdDropDown';

const MySecondDropDown = (props)=>{
    
    const [selectedSmallStep,setSelectedSmallStep] = useState('');

    const clickHandler = ()=>{
        if(props.show){
            if(props.step === props.selectedSubStage){
                props.setSelectedSubStage('');
            }else{
                props.setSelectedSubStage(props.step);
            }
        }
    }

    const bgColor = props.show ? ((props.selectedSubStage === '')?'white':'red'):'grey';

    return (
        <div>
      <div style={{alignItems:'center',justifyContent:'center',display:'flex'}} onClick={clickHandler} disabled={!props.show}>
        <div style={{border:'1px solid black',width : '500px',height:'40px',position:'relative',paddingTop:'20px',backgroundColor:bgColor}}>
          {props.step}
          {
          props.step !== props.selectedSubStage ? 
          <ArrowDropDownIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropDownIcon> : 
          <ArrowDropUpIcon style={{position:'absolute',right:0,paddingRight:'10px'}}></ArrowDropUpIcon>
          }
        </div>
    </div>
    {
        (props.show && props.selectedSubStage === props.step) &&
        props.subSteps.map((element)=>{
            if(selectedSmallStep === ''){
                return <div><button>addTask</button><MyThirdDropDown step={element.subStep} selectedSmallStep={selectedSmallStep} setSelectedSmallStep={setSelectedSmallStep} show={true}></MyThirdDropDown></div>
            }
            if(selectedSmallStep === element.step){
                return <MyThirdDropDown step={element.subStep} selectedSmallStep={selectedSmallStep} setSelectedSmallStep={setSelectedSmallStep} show={true}></MyThirdDropDown>
            }
            return <MyThirdDropDown step={element.subStep} selectedSmallStep={selectedSmallStep} setSelectedSmallStep={setSelectedSmallStep} show={false}></MyThirdDropDown>
        })
    }
    {
        (props.show && props.selectedSubStage === props.step ) && <button>addTask</button>
    }
    </div>
    )
}

export default MySecondDropDown;
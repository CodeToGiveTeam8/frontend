import React,{useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const MyThirdDropDown = (props)=>{

    const bgColor = 'white';

    return (
        <div>
      <div style={{alignItems:'center',justifyContent:'center',display:'flex'}}>
        <div style={{border:'1px solid black',width : '500px',height:'40px',position:'relative',paddingTop:'20px',backgroundColor:bgColor}}>
          {props.step}
        </div>
    </div>
    </div>
    )
}

export default MyThirdDropDown;
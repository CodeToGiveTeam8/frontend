import React,{useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const MyFourthDropDown = (props)=>{

    const bgColor = 'white';

    return (
        <div style={{marginTop:'10px'}}>
      <div style={{alignItems:'center',justifyContent:'center',display:'flex'}}>
        <div className="dropdownOne" style={{width : '500px',height:'40px',position:'relative',paddingTop:'20px',backgroundColor:bgColor,borderRadius:'10px'}}>
          {props.step}
        </div>
    </div>
    </div>
    )
}

export default MyFourthDropDown;
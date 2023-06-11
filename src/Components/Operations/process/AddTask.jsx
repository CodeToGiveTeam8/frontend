import React,{useState} from 'react';

const AddTask = (props)=>{

    const [name,setName] = useState('');
    const addTaskHandler = ()=>{
        props.addTaskHandler(name)
    }
    return(
    <div style={{alignItems:'center',justifyContent:'center',display:'flex'}}>
        <div className="dropdownOne" style={{width : '500px',height:'50px',position:'relative',paddingTop:'10px',borderRadius:'10px',textAlign:'center'}}>
          <input type="text" placeholder='Enter the Task Name' style={{border:'none',height:'35px',paddingLeft:'10px',outline: 'none',fontSize:'20px'}} onChange={(e)=>{setName(e.target.value)}} />
          <button onClick={addTaskHandler} style = {{borderRadius : '10px',boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',background: '#E4A5FF',color: '#fff',border:'none'}}>Submit</button>
        </div>
        
    </div>
    )

}

export default AddTask;
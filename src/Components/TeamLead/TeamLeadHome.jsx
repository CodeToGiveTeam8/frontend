import React,{ useState,useEffect } from 'react';
import './teamlead.css';
import { TreeGridComponent, ColumnsDirective, ColumnDirective,
        Inject, Page, Sort, Filter } from '@syncfusion/ej2-react-treegrid';
import NavBar from '../Navs/grassrootnav'
import Cookies from 'universal-cookie';
  
function TeamLeadHome() {

   const [data, setData] = useState([]);
   const cookies = new Cookies()
   const APICall = (configObject)=>{
    return new Promise((resolve,reject)=>{
      fetch(configObject.url,{
        method:configObject.method?configObject.method:'GET',
        body:configObject.body?JSON.stringify(configObject.body):null,
        headers:configObject.headers?configObject.headers:{},
      }).then((response)=>resolve(response.json()))
    })
  }

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
          const configObject = {
            url:"http://localhost:8081/home",
            method:'GET',
            headers:{'Content-Type':'application/json','Authorization': token},
          }
          const responseData = await APICall(configObject)
          const data = responseData['data']
          setData(data)
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    },[])

  return (

    <div>
  <NavBar/>
    {/* dataSource = {data} */}
    <TreeGridComponent dataSource={data}
                       childMapping="childDetails"
                       treeColumnIndex={1}
                       allowSorting={true}
                       allowFiltering={true}>
      <Inject services={[Page, Sort, Filter]} />                   
      <ColumnsDirective>
        <ColumnDirective field="email" headerText="Email" width='250' textAlign="Right">
        </ColumnDirective>
        <ColumnDirective field="name" headerText="Name">
        </ColumnDirective>
        <ColumnDirective field="childId" headerText="ChildId">
        </ColumnDirective>
        <ColumnDirective field="category" headerText="Category">
        </ColumnDirective>
        <ColumnDirective field="status" headerText="Status">
        </ColumnDirective>
        <ColumnDirective field="orphanage" headerText="Orphanage">
        </ColumnDirective>
      </ColumnsDirective>
    </TreeGridComponent>
    </div>
  );
}

export default TeamLeadHome;
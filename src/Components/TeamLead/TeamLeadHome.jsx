import React from 'react';
import './teamlead.css';
import { TreeGridComponent, ColumnsDirective, ColumnDirective,
  Inject, Page, Sort, Filter } from '@syncfusion/ej2-react-treegrid';
  import { Ajax } from '@syncfusion/ej2-base';
  import { summaryData } from './data';
  import NavBar from '../Navs/grassrootnav'
  


function TeamLeadHome() {

   // const [data, setData] = useState([]);

  // useEffect(()=>{
  //   const ajax = new Ajax(
  //     "https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData",
  //     "GET"
  //   );
  //   ajax.send();
  //   ajax.onSuccess = (data: any) => {
  //     setData(JSON.parse(data));
  //   }
  // },[])

  return (

    <div>
  <NavBar/>
    {/* dataSource = {data} */}
    <TreeGridComponent dataSource={summaryData}
                       childMapping="subtask"
                       treeColumnIndex={1}
                       allowPaging={true}
                       allowSorting={true}
                       allowFiltering={true}>
      <Inject services={[Page, Sort, Filter]} />                   
      <ColumnsDirective>
        <ColumnDirective field="ID" headerText="ID" width='90' textAlign="Right">
        </ColumnDirective>
        <ColumnDirective field="Name" headerText="Name">
        </ColumnDirective>
        <ColumnDirective field="category" headerText="Category">
        </ColumnDirective>
        <ColumnDirective field="orphanage" headerText="Orphanage">
        </ColumnDirective>
        <ColumnDirective field="Progress" headerText="Progress">
        </ColumnDirective>
        <ColumnDirective field="deadline" headerText="Deadline" >
        </ColumnDirective>
      </ColumnsDirective>
    </TreeGridComponent>
    </div>
  );
}

export default TeamLeadHome;
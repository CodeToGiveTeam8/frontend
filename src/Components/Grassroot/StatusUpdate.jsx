import React, { useEffect, useState } from 'react';
import '../CSSstyles/StatusUpdate.css';
import NavBar from '../Navs/grassrootnav';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Input, TextareaAutosize,Checkbox } from '@material-ui/core';
import backgroundImage from './reg.jpg';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(12),
    paddingRight: theme.spacing(15),
   
    // Adjust margin to match NavBar height
  },
  content: {
    position: 'relative', // Add position relative
    minHeight: '100vh', // Adjust minimum height to account for NavBar (64px is the default height of NavBar)
    paddingTop: theme.spacing(4), // Add top padding to align with NavBar
    overflow: 'hidden', // Hide overflow to prevent the background from leaking through the blurred layer
    marginBottom: theme.spacing(1),
  },

  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    filter: 'blur(3px)', // Apply the blur effect
    background: `url(${backgroundImage})`, // Apply background image
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    height: '120px',
    marginBottom: theme.spacing(0),
    width: '100%',
    overflow: 'auto', // Add overflow auto to enable scrolling when content overflows
    display: 'flex', // Add display flex
    flexDirection: 'column', // Add flex-direction column
    justifyContent: 'center',
    color: 'black',

    backgroundColor: 'lavender  ',
  },
  firstRowPaper: {
    /* CSS styles for the first row */
    backgroundColor: 'lavender  ',
    fontWeight: 'bold',
    paddingTop: theme.spacing(1),
    height: '100%',
    marginBottom: theme.spacing(2),
  },
  overflowPaper: {
    overflow: 'auto',
    maxHeight: '200px', // Adjust the maximum height as needed
  },
  uploadButton: {
    marginTop: theme.spacing(1),
  },
  inputFile: {
    display: 'none',
  },
  textareaContainer: {
    height: '60px',
    overflowY: 'auto',
  },
  documentTypes: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  headerText: {
    // position: 'absolute',
    // top: '20px',
    // left:'20px',
    // marginRight: '32px',
    color: 'white',
    fontSize: '15px',
    fontWeight: 'bold',
    marginRight:'80%',
   marginTop:'1%'
  },
}));

function StatusUpdate() {
  const classes = useStyles();
  const [uploadField, setUploadField] = useState([]);
  var cookies = new Cookies()
  const { childId, processId } = useParams();
  const ChildId = decodeURIComponent(childId)
  const ProcessId = decodeURIComponent(processId)
  const [subProcessClicked,setSubProcessClicked] = useState("")
  const [subProcessIndex,setSubProcessIndex] = useState("")

  const [entries, setEntries] = useState([
    // {
    //   id: 1,
    //   sNo: '1',
    //   subProcesses: 'Newspaper Publication',
    //   documentType: ['Document proof'],
    //   uploadedDocuments: [],
    //   comments: '',
    // },
    // {
    //   id: 2,
    //   sNo: '2',
    //   subProcesses: 'TV Telecasting',
    //   documentType: ['Document proof'],
    //   uploadedDocuments: [],
    //   comments: '',
    // },
    // {
    //   id: 3,
    //   sNo: '3',
    //   subProcesses: 'File Missing Compliant, if not already done',
    //   documentType: ['1. Document proof', '2. Police Complain'],
    //   uploadedDocuments: [],
    //   comments: '',
    // },
  ]);

  const getUploadUrl = async(files,childId,subProcessId)=>{
    var url_req_data = {"documents" : [],"childId" : childId,"subProcessId" : subProcessId}
    console.log(files)
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      url_req_data["documents"].push({"name" : fileName})
    }

    const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
    console.log(url_req_data)
    const configObject = {
      url: `http://localhost:8081/document/upload/link`,
      method: 'POST',
      headers:{'Content-Type':'application/json','Authorization': token},
      body:url_req_data
    }
    var res_data = await APICall(configObject)

    return await res_data[1]
  }

  const GetDocumentUrl = async(id)=>{
    // http://localhost:8081/document/link?documentId=24
    const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
    // console.log(url_req_data)
    const configObject = {
      url: `http://localhost:8081/document/link?documentId=${id}`,
      method: 'GET',
      headers:{'Content-Type':'application/json','Authorization': token},
      // body:url_req_data
    }
    var res_data = await APICall(configObject)
    var resp = await res_data[1]
    return resp.link
  }

  const uploadToS3 = async(file,url)=>{
    await fetch(url, {
      method: 'PUT',
      body: file
    })
  }

  const addFileToDB = async(files,childId,subProcessId)=>{
    var url_req_data = {"documents" : [],"childId" : childId,"subProcessId" : subProcessId}
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      url_req_data["documents"].push({"name" : fileName})
    }

    const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
    console.log(url_req_data)
    const configObject = {
      url: `http://localhost:8081/document/add`,
      method: 'POST',
      headers:{'Content-Type':'application/json','Authorization': token},
      body:url_req_data
    }
    var res_data = await APICall(configObject)

    return await res_data[1]
  }

  const handleUpload = async(event) => {
    // console.log(event.target.files,ChildId,subProcessClicked,subProcessIndex)
    const subProcessId = subProcessClicked
    const index = subProcessIndex
    const files = event.target.files;
    console.log(files)
    if(!files || files.length==0){
      return
    }
    const urls = await getUploadUrl(files,ChildId,subProcessId)
    console.log(urls)
    for(let i=0;i<urls.links.length;i++){
        await uploadToS3(files[i],urls.links[i])
    }
    console.log()

    const dbDocs = await addFileToDB(files,ChildId,subProcessId)

    setEntries(prevData => {
      const newData = [...prevData];
      let arr = newData[index].documentsUploaded
      console.log(arr)
      for(let i=0;i<files.length;i++){
        arr.push({name : files[i].name,id : dbDocs.id})
      }
      console.log(arr)
      newData[index].documentsUploaded = arr
      console.log(newData)
      return newData;
    });

    setEntries(entries)
    window.location.reload();
    ////////////////
    // const updatedEntries = entries.map((entry) => {
    //   if (entry.id === entryId) {
    //     return {
    //       ...entry,
    //       uploadedDocuments: [...entry.uploadedDocuments, { name: fileName, file }],
    //     };
    //   }
    //   return entry;
    // });
    // setEntries(updatedEntries);
  };

  const handleCommentChange = (entryId) => (event) => {
    const comment = event.target.value;
    const updatedEntries = entries.map((entry) => {
      if (entry.id === entryId) {
        return {
          ...entry,
          comments: comment,
        };
      }
      return entry;
    });
    setEntries(updatedEntries);
  };

  const APICall = (configObject)=>{
    return new Promise((resolve,reject)=>{
      fetch(configObject.url,{
        method:configObject.method?configObject.method:'GET',
        body:configObject.body?JSON.stringify(configObject.body):null,
        headers:configObject.headers?configObject.headers:{},
      }).then((response)=>resolve([response.status,response.json()]))
    })
  }

  useEffect(()=>{

    const fetchdata = async()=>{
      try{
        // const objectBody = {ChildId,ProcessId,SubProcessId}
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url: `http://localhost:8081/child/process?childId=${ChildId}&processId=${ProcessId}`,
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
          // body:objectBody
        }
        const res = await APICall(configObject)
        const res_code = await res[0]
        const res_data = await res[1]
        if(res_code==200){
          console.log(res_data.data)
          setEntries(res_data.data)
        }

      }catch(err){
        console.error(err)
      }
    }
    fetchdata()
    
  },[ChildId,ProcessId])

  const onUpload =(subProcessId,index)=>{
    setSubProcessClicked(subProcessId)
    setSubProcessIndex(index)
  }

  const changeStatus = async(subProcess,val) =>{
    const ChildId = subProcess.ChildId
    const ProcessId = subProcess.ProcessId
    const SubProcessId = subProcess.SubProcessId
    var url = ""
    if(val=="DONE"){
      url = "http://localhost:8081/subtask/done"
    }else{
      url = "http://localhost:8081/subtask/notdone"
    }

    const objectBody = {ChildId,ProcessId,SubProcessId}
    const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
    const configObject = {
      url: url,
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization': token},
      body:objectBody
    }
    const res = await APICall(configObject)
    const res_code = await res[0]
    const responseData = await res[1]
    if(res_code==400){
      alert("Upload file first")
      return false
    }
    console.log(await res[0])
    // const data = responseData['data']
    console.log(responseData)
    return true
  }

  const handleStatusChange = (entryId,index_1) => async(event) => {
    var updatedVal = "NOT DONE"
    if(event.target.checked){
      updatedVal = "DONE"
    }
    let subProcess = {
      ChildId : entries[index_1].ChildId,
      ProcessId : entries[index_1].ProcessId,
      SubProcessId : entries[index_1].SubProcessId
    }
    if(await changeStatus(subProcess,updatedVal)){
      const updatedEntries = entries.map((entry) => {
        
        if (entry.id === entryId) {
          return {
            ...entry,
            status: updatedVal,
          };
        }
        return entry;
      });
      setEntries(updatedEntries);
    }
  };

  return (
    <>
      <NavBar />
      <h5 className={classes.headerText}>{ChildId + ' > Case Progress > Process'}</h5>
      <div className={classes.content}>
        <div className={classes.background} />
        <div className={classes.root}>
          <Grid container spacing={1}>
            {/* Row Headers */}
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>S.No.</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Sub-processes</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Documents Required</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Upload</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Uploaded Documents</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Comments</Paper>
            </Grid>

            {/* Row Data */}
            {entries && entries.length>0 && entries.map((entry,index_1) => (
              <React.Fragment key={entry.SubProcessId}>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>{index_1 + 1}</Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>{entry.name}</Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    <div className={classes.documentsNeeded}>
                      {Array.isArray(entry.documentsNeeded) ? (
                        entry.documentsNeeded && entry.documentsNeeded.map((val, index_2) => (
                          <p key={val.id}>{ val.name }</p>
                        ))
                      ) : (
                        <span>No Documents required</span>
                      )}
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    <input
                      accept="*"
                      multiple
                      className={classes.inputFile}
                      id={`upload-input-${entries.id}`}
                      type="file"
                      onChange={(event) => handleUpload(event)}
                    />
                    <label htmlFor={`upload-input-${entries.id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        className={classes.uploadButton}
                        onClick={(event)=>{ onUpload(entry.SubProcessId,index_1) }}
                      >
                        Upload
                      </Button>
                    </label>
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={`${classes.paper} ${classes.overflowPaper}`}>
                  {Array.isArray(entry.documentsUploaded) ? (
                        entry.documentsUploaded && entry.documentsUploaded.map((document, index_3) => (
                        <Button
                          key={index_3}
                          variant="text"
                          color="primary"
                          onClick={async() => {
                            const downloadUrl = await GetDocumentUrl(document.id)
                            window.open(downloadUrl, '_blank');
                          }}
                        >
                          {document.document_name}
                        </Button>
                      ))
                    ) : (
                      <span>No Documents Uploaded</span>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={`${classes.paper} ${classes.overflowPaper}`}>
                    <Checkbox
                      checked={entry.status == "DONE" ? true : false}
                      onChange={handleStatusChange(entry.id,index_1)}
                      color="primary"
                      inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                    Done
                  </Paper>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default StatusUpdate;

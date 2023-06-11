import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSSstyles/GDetails.css';
import NavBar from '../Navs/grassrootnav';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import backgroundImage from './reg.jpg';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(30),
    position:'relative',
    height:'100%'
    // Adjust margin to match NavBar height
  },
  content: {
    position: 'relative',
    minHeight: '100vh',
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    overflowY: 'auto', // Add overflowY auto to enable vertical scrolling
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    filter: 'blur(3px)',
    background: `url(${backgroundImage})`,
    backgroundSize: 'cover',

  },
  paper: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(0.1),
    width: '100%',
    overflow: 'auto', // Add overflow auto to enable scrolling when content overflows
    display: 'flex', // Add display flex
    flexDirection: 'column', // Add flex-direction column
    justifyContent: 'center',
    color: 'black',
  },
  cellPaper: {
    height: '120px', // Set a fixed height for the paper
    display: 'flex', // Add display flex
    flexDirection: 'column', // Add flex-direction column
    justifyContent: 'center',
    color: 'black',
  },
  firstRowPaper: {
    backgroundColor: 'lavender',
    fontWeight: 'bold',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(0.3),
  },
  documentTypes: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: theme.spacing(1),
  },
  descriptionBox: {
    border: '2px solid red',
    padding: theme.spacing(5),
    marginBottom: '90px',
    // paddingBottom: '100px',
    marginLeft: '170px', // Adjust the marginLeft value to bring the description box closer
    marginTop: '10px', // Adjust the marginTop value to bring the description box closer
    width: '450px',
    height:'300px',
  },
  description: {
    // marginBottom: '1px',
    height: '150px',
    

  },
  imageIcon: {
    fontSize: '700px',
    color: theme.palette.common.white,
    width: '200px',
    height: '200px',
    marginTop: '20px', // Adjust the marginTop value to bring the image icon closer
    marginLeft: '40px', // Adjust the marginLeft value to bring the image icon closer
  },
  headerText: {
    // position: 'absolute',
    // top: '20px',
    // left:'20px',
    // marginRight: '32px',
    color: 'white',
    fontSize: '15px',
    fontWeight: 'bold',
    marginRight:'85%',
   marginTop:'1%'
  },
}));

function GDetails() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const cookies = new Cookies()
  const ChildId = decodeURIComponent(id);
  const [imageLink,setImageLink] = useState("'")
  const [entries, setEntries] = useState([
    // {
    //   id: 1,
    //   sNo: '1',
    //   process: 'Process 1',
    //   subProcesses: [
    //     'Newspaper Publication',
    //     'TV Telecasting',
    //     'File Missing Compliant, if not already done',
    //     'Final Police Report',
    //     'Medical Report for age verification (if needed)',
    //   ],
    // },
    // {
    //   id: 2,
    //   sNo: '2',
    //   process: 'Process 2',
    //   subProcesses: ['Submit child’s report for DCPU for NOC', 'Receive DCPU NOC', 'Final Report from CCI'],
    // },
  ]);

  const [openDialog, setOpenDialog] = useState(false);

  const changeStatus = async(subProcess,val) =>{
    const ChildId = subProcess.ChildId
    const ProcessId = subProcess.ProcessId
    const SubProcessId = subProcess.SubProcessId
    console.log(ChildId,ProcessId,SubProcessId,val)
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
      alert("Uplaod file first")
      const encodedChildId = encodeURIComponent(ChildId);
      const encodedProcessId = encodeURIComponent(ProcessId);
      // const encodedSubProcessId = encodeURIComponent(SubProcessId);
      console.log(`/status-update/${encodedChildId}/${encodedProcessId}`)
      navigate(`/status-update/${encodedChildId}/${encodedProcessId}`)
      return false
    }
    console.log(await res[0])
    // const data = responseData['data']
    console.log(responseData)
    return true
  }

  const handleCheckboxChange = async(subProcess,event,checked,index_1,index_2) => {
    var val = "NOT DONE"
    if(checked){
      val = "DONE"
    } 

    if(await changeStatus(subProcess,val)){
      setEntries(prevData => {
        const newData = [...prevData];
        newData[index_1].subProcesses[index_2].status = val;
        return newData;
      });
    }

  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUploadClick = () => {
    handleCloseDialog();
    navigate('/status-update');
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
    const fetchData = async () => {
      try {
        console.log(`http://localhost:8081/process/progress?childId=${ChildId}`)
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:`http://localhost:8081/process/progress?childId=${ChildId}`,
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const res = await APICall(configObject)
        const responseData = await res[1]
        const data = responseData['data']
        console.log(data)
        var r_data = []
        var val = 1

        if(data.finished.length>0){
          for(let ele of data.finished){
            let curr_ele = {}
            curr_ele.sNo = val
            val+=1
            curr_ele.id = ele.id
            curr_ele.status = "DONE"
            curr_ele.process = ele.name
            curr_ele.subProcesses = []
            for(let ele1 of ele.subProcess){
              curr_ele.subProcesses.push(ele1)
            }
            r_data.push(curr_ele)
          }
        }

        if(data.working.length>0){
          for(let ele of data.working){
            let curr_ele = {}
            curr_ele.id = ele.id
            curr_ele.sNo = val
            val+=1
            curr_ele.process = ele.name
            curr_ele.status = "WORKING"
            curr_ele.subProcesses = []
            for(let ele1 of ele.subProcess){
              curr_ele.subProcesses.push(ele1)
            }
            r_data.push(curr_ele)
          }
        }

        if(data.notStarted.length>0){
          for(let ele of data.notStarted){
            let curr_ele = {}
            curr_ele.id = ele.id
            curr_ele.sNo = val
            val+=1
            curr_ele.process = ele.name
            curr_ele.status = "NOT STARTED"
            curr_ele.subProcesses = []
            for(let ele1 of ele.subProcess){
              curr_ele.subProcesses.push(ele1)
            }
            r_data.push(curr_ele)
          }
        }

        console.log("r_data : ",r_data)
        setEntries(r_data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const getImageLink = async () => {
      try {
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:`http://localhost:8081/child/image?childId=${ChildId}`,
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData = await APICall(configObject)
        // console.log(responseData)
        const res_data = await responseData[1]
        setImageLink(res_data.link)
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
    getImageLink();
  },[ChildId])

  const navigateToStatusUpdate = (ind)=>{
    const encodedChildId = encodeURIComponent(ChildId);
    const encodedProcessId = encodeURIComponent(entries[ind].id);
    navigate(`/status-update/${encodedChildId}/${encodedProcessId}`);
  }

  return (
    <>
      <NavBar />
      <h5 className={classes.headerText}>{ChildId +  ' > ' }Case Progress</h5>
      <div className={classes.content}>
        <div className={classes.background} />
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <div style={{ display: 'flex' }}>
                <div>
                  <Avatar src={imageLink} className={classes.imageIcon}>
                    <ImageIcon />
                  </Avatar>
                </div>
                <div>
                  <Paper className={classes.descriptionBox}>
                    <TextField
                      id="description"
                      label="Description"
                      multiline
                      rows={9}
                      variant="outlined"
                      fullWidth
                      className={classes.description}
                    />
                  </Paper>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <div className={classes.headerCell}>
                <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>S.No.</Paper>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.headerCell}>
                <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Process</Paper>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.headerCell}>
                <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Sub-process</Paper>
              </div>
            </Grid>
          </Grid>
          {entries.map((entry,index_1) => (
            <Grid container key={entry.id} spacing={2} style={{ display: 'flex',cursor : 'pointer' }}>
              <Grid item xs={1} onClick={() => navigateToStatusUpdate(index_1)}>
                <div className={classes.cell}>
                  <Paper className={`${classes.paper} ${classes.cellPaper}`}>{entry.sNo}</Paper>
                </div>
              </Grid>
              <Grid item xs={4} onClick={() => navigateToStatusUpdate(index_1)}>
                <div className={classes.cell}>
                  <Paper className={`${classes.paper} ${classes.cellPaper}`}>{entry.process}</Paper>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.cell}>
                  <Paper className={`${classes.paper} ${classes.cellPaper}`}>
                    <div className={classes.subProcesses}>
                      {Array.isArray(entry.subProcesses) && (
                        entry.subProcesses.map((subProcess, index_2) => (
                          <div className={classes.checkboxLabel} key={subProcess.id}>
                            <Checkbox
                              color="primary"
                              checked={subProcess.status == "DONE" ? true : false}
                              onChange={(event, checked)=>{handleCheckboxChange(subProcess,event,checked,index_1,index_2)}}
                              className={classes.checkbox}
                            />
                            <span className={classes.checkboxText}>{subProcess.name}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </Paper>
                </div>
              </Grid>
            </Grid>
          ))}
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <p>Upload the Document</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GDetails;
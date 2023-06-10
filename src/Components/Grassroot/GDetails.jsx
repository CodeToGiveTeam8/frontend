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
} from '@material-ui/core';
import backgroundImage from './reg.jpg';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(50),
    marginLeft: theme.spacing(30),
    // Adjust margin to match NavBar height
  },
  content: {
    position: 'relative',
    minHeight: '100vh',
    paddingTop: theme.spacing(2),
    overflow: 'hidden',
    marginBottom: theme.spacing(10),
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
    backgroundAttachment: 'fixed',
  },
  paper: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    height: '40%',
    marginBottom: theme.spacing(2),
    width: '100%',
    overflow: 'auto', // Add overflow auto to enable scrolling when content overflows
    display: 'flex', // Add display flex
    flexDirection: 'column', // Add flex-direction column
    justifyContent: 'center',
    color: 'black',
  },
  firstRowPaper: {
    backgroundColor: 'lavender',
    fontWeight: 'bold',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
}));

function GDetails() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const cookies = new Cookies()
  const ChildId = decodeURIComponent(id);
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

  const handleCheckboxChange = (subProcess,event,checked,index_1,index_2) => {
    var val = "NOT DONE"
    if(checked){
      val = "DONE"
    }
    setEntries(prevData => {
      const newData = [...prevData];
      newData[index_1].subProcesses[index_2].status = val;
      return newData;
    });
    if (checked) {
      setOpenDialog(true);
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
      }).then((response)=>resolve(response.json()))
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
        const responseData = await APICall(configObject)
        const data = responseData['data']
        console.log(data)
        var r_data = []
        var val = 1

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
        console.log("r_data : ",r_data)
        setEntries(r_data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  },[ChildId])

  return (
    <>
      <NavBar />
      <div className={classes.content}>
        <div className={classes.background} />
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <div className={classes.headerCell}>
                <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>S.No.</Paper>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className={classes.headerCell}>
                <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Process</Paper>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className={classes.headerCell}>
                <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Sub-process</Paper>
              </div>
            </Grid>
          </Grid>
          {entries.map((entry,index_1) => (
            <Grid container key={entry.id} spacing={2} style={{ display: 'flex' }}>
              <Grid item xs={1}>
                <div className={classes.cell}>
                  <Paper className={`${classes.paper} ${classes.cellPaper}`}>{entry.sNo}</Paper>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className={classes.cell}>
                  <Paper className={`${classes.paper} ${classes.cellPaper}`}>{entry.process}</Paper>
                </div>
              </Grid>
              <Grid item xs={2}>
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
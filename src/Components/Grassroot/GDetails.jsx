import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CSSstyles/StatusUpdate.css';
import NavBar from '../Navs/grassrootnav';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import backgroundImage from './reg.jpg';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(12),
    // Adjust margin to match NavBar height
  },
  content: {
    position: 'relative', // Add position relative
    minHeight: '100vh', // Adjust minimum height to account for NavBar (64px is the default height of NavBar)
    paddingTop: theme.spacing(2), // Add top padding to align with NavBar
    overflow: 'hidden', // Hide overflow to prevent the background from leaking through the blurred layer
    marginBottom: theme.spacing(10),
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
    /* CSS styles for the first row */
    backgroundColor: 'lavender',
    fontWeight: 'bold',
    paddingTop: theme.spacing(1),
    height: '30%',
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

function StatusUpdate() {
  const cookies = new Cookies();  
  const { id } = useParams();
  const childId = decodeURIComponent(id);
  const classes = useStyles();
  const [entries, setEntries] = useState([]);
  const [finished,setFinished] = useState([])
  const [working,setWorking] = useState([])
  const [notStarted,setNotStarted] = useState([])

  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const APICall = (configObject)=>{
    return new Promise((resolve,reject)=>{
      fetch(configObject.url,{
        method:configObject.method?configObject.method:'GET',
        body:configObject.body?JSON.stringify(configObject.body):null,
        headers:configObject.headers?configObject.headers:{},
      }).then((response)=>resolve(response.json()))
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:`http://localhost:8081/process/progress?childId=${childId}`,
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData = await APICall(configObject)
        const data = responseData['data']
        console.log(data)
        setFinished(data.finished)
        setWorking(data.working)
        setNotStarted(data.notStarted)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [childId]); 

  const handleCheckboxChange = (event, checked, entry) => {
    if (checked) {
      setSelectedDocument('');
      setSelectedEntry(entry);
      setOpenDialog(true);
    } else {
      setSelectedDocument('');
      setSelectedEntry(null);
      setOpenDialog(false);
    }
  };

  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.value);
  };

  const handleUploadDocument = () => {
    if (selectedEntry && selectedDocument) {
      const updatedEntries = entries.map((entry) => {
        if (entry.id === selectedEntry.id) {
          return {
            ...entry,
            uploadedDocuments: [...entry.uploadedDocuments, selectedDocument],
          };
        }
        return entry;
      });
      setEntries(updatedEntries);
      setSelectedDocument('');
      setSelectedEntry(null);
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setSelectedDocument('');
    setSelectedEntry(null);
    setOpenDialog(false);
  };

  return (
    <>
      <NavBar />
      <div className={classes.content}>
        <div className={classes.background} />
        <div className={classes.root}>
          <Grid container spacing={2}x>
            <Grid item xs={1}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>S.No.</Paper>
              {finished && finished.length>0 && finished.map((entry) => (
                <Paper key={entry.ProcessId} className={classes.paper}>
                  {entry.ProcessId}
                </Paper>
              ))}
              {working && working.length>0 && working.map((entry) => (
                <Paper key={entry.ProcessId} className={classes.paper}>
                  {entry.ProcessId}
                </Paper>
              ))}
              {notStarted && notStarted.length>0 && notStarted.map((entry) => (
                <Paper key={entry.id} className={classes.paper}>
                  {entry.id}
                </Paper>
              ))}
            </Grid>
            <Grid item xs={4}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Sub-processes</Paper>
              {finished && finished.length>0 && finished.map((entry) => (
                <Paper key={entry.subProcess.id} className={classes.paper}>
                  {entry.subProcess.name}
                </Paper>
              ))}
              {working && working.length>0 && working.map((entry) => (
                <Paper key={entry.subProcess.id} className={classes.paper}>
                  {entry.subProcess.name}
                </Paper>
              ))}
              {notStarted && notStarted.length>0 && notStarted.map((entry) => (
                <Paper key={entry.subProcess.id} className={classes.paper}>
                  {entry.subProcess.name}
                </Paper>
              ))}
            </Grid>
            <Grid item xs={5}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Document Type</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={classes.paper}>
                  <div className={classes.documentTypes}>
                    {Array.isArray(entry.documentType) ? (
                      entry.documentType.map((type, index) => (
                        <div key={index} className={classes.checkboxLabel}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={selectedDocument === type && selectedEntry?.id === entry.id}
                                onChange={(event, checked) => handleCheckboxChange(event, checked, entry)}
                              />
                            }
                            label={<span className={classes.checkboxText}>{type}</span>}
                          />
                        </div>
                      ))
                    ) : (
                      <div className={classes.checkboxLabel}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={selectedDocument === entry.documentType && selectedEntry?.id === entry.id}
                              onChange={(event, checked) => handleCheckboxChange(event, checked, entry)}
                            />
                          }
                          label={<span className={classes.checkboxText}>{entry.documentType}</span>}
                        />
                      </div>
                    )}
                  </div>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <TextField
            label="Select Document"
            value={selectedDocument}
            onChange={handleDocumentChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUploadDocument} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StatusUpdate;
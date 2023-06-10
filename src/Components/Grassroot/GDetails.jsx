import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSSstyles/GDetails.css';
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
} from '@material-ui/core';
import backgroundImage from './reg.jpg';

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
  const [entries, setEntries] = useState([
    {
      id: 1,
      sNo: '1',
      process: 'Process 1',
      subProcesses: 'Work on and complete documentation',
      documentType: [
        'Newspaper Publication',
        'TV Telecasting',
        'File Missing Compliant, if not already done',
        'Final Police Report',
        'Medical Report for age verification (if needed)',
      ],
    },
    {
      id: 2,
      sNo: '2',
      process: 'Process 2',
      subProcesses: 'Submit to DCPU and get NOC',
      documentType: ['Submit child’s report for DCPU for NOC', 'Receive DCPU NOC', 'Final Report from CCI'],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCheckboxChange = (event, checked) => {
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
          {entries.map((entry) => (
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
                      {Array.isArray(entry.documentType) ? (
                        entry.documentType.map((subProcess, index) => (
                          <div className={classes.checkboxLabel} key={index}>
                            <Checkbox
                              color="primary"
                              onChange={handleCheckboxChange}
                              className={classes.checkbox}
                            />
                            <span className={classes.checkboxText}>{subProcess}</span>
                          </div>
                        ))
                      ) : (
                        <div className={classes.checkboxLabel}>
                          <Checkbox color="primary" onChange={handleCheckboxChange} className={classes.checkbox} />
                          <span className={classes.checkboxText}>{entry.documentType}</span>
                        </div>
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
        {/* <DialogContent>
          <p>Click Upload t</p>
        </DialogContent> */}
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

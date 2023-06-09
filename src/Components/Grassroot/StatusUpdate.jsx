import React, { useState } from 'react';
import '../CSSstyles/StatusUpdate.css';
import NavBar from '../Navs/grassrootnav';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Input, TextareaAutosize } from '@material-ui/core';
import backgroundImage from './reg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(12), // Adjust margin to match NavBar height
  },
  content: {
    position: 'relative', // Add position relative
    minHeight: 'calc(100vh - 64px)', // Adjust minimum height to account for NavBar (64px is the default height of NavBar)
    paddingTop: theme.spacing(2), // Add top padding to align with NavBar
    overflow: 'hidden', // Hide overflow to prevent the background from leaking through the blurred layer
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    filter: 'blur(3px)', // Apply the blur effect
    background: `url(${backgroundImage})`, // Apply background image
    backgroundSize: 'cover',
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
  },
  firstRowPaper: {
    /* CSS styles for the first row */
    backgroundColor: 'lightblue',
    fontWeight: 'bold',
    paddingTop: theme.spacing(2),
    height: '30%',
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
}));

function StatusUpdate() {
  const classes = useStyles();

  const [entries, setEntries] = useState([
    {
      id: 1,
      sNo: '1',
      subProcesses: 'File Missing Compliant, if not already doneFile Missing Compliant, if not already doneFile Missing Compliant, if not already done',
      documentType: 'Copy of the complain',
      uploadedDocuments: [],
      comments: '',
    },
    {
      id: 2,
      sNo: '2',
      subProcesses: 'Process 2',
      documentType: 'Type 2',
      uploadedDocuments: [],
      comments: '',
    },
  ]);

  const handleUpload = (entryId) => (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const updatedEntries = entries.map((entry) => {
      if (entry.id === entryId) {
        return {
          ...entry,
          uploadedDocuments: [...entry.uploadedDocuments, { name: fileName, file }],
        };
      }
      return entry;
    });
    setEntries(updatedEntries);
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

  return (
    <>
      <NavBar />
      <div className={classes.content}>
        <div className={classes.background} />
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>S.No.</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={classes.paper}>
                  {entry.sNo}
                </Paper>
              ))}
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Sub-processes</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={classes.paper}>
                  {entry.subProcesses}
                </Paper>
              ))}
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Document Type</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={classes.paper}>
                  {entry.documentType}
                </Paper>
              ))}
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Upload</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={classes.paper}>
                  <input
                    accept="*"
                    className={classes.inputFile}
                    id={`upload-input-${entry.id}`}
                    type="file"
                    onChange={handleUpload(entry.id)}
                  />
                  <label htmlFor={`upload-input-${entry.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      className={classes.uploadButton}
                    >
                      Upload
                    </Button>
                  </label>
                </Paper>
              ))}
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Uploaded Documents</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={`${classes.paper} ${classes.overflowPaper}`}>
                  {entry.uploadedDocuments.length > 0 ? (
                    entry.uploadedDocuments.map((document, index) => (
                      <Button
                        key={index}
                        variant="text"
                        color="primary"
                        onClick={() => {
                          const downloadUrl = URL.createObjectURL(document.file);
                          window.open(downloadUrl, '_blank');
                        }}
                      >
                        {document.name}
                      </Button>
                    ))
                  ) : (
                    <span>No Documents Uploaded</span>
                  )}
                </Paper>
              ))}
            </Grid>
            <Grid item xs={2}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Comments</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={`${classes.paper} ${classes.overflowPaper}`}>
                  <div className={classes.textareaContainer}>
                    <TextareaAutosize
                      value={entry.comments}
                      onChange={handleCommentChange(entry.id)}
                      rows={3}
                      placeholder="Enter comments"
                      className={classes.textarea}
                    />
                  </div>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default StatusUpdate;

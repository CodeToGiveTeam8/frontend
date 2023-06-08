import React, { useState } from 'react';
import '../CSSstyles/StatusUpdate.css';
import NavBar from '../Navs/grassrootnav';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Input, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
      subProcesses: 'File Missing Compliant, if not already done',
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
      <div className={classes.root}>
        <Grid container spacing={50}>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <Paper className={classes.paper}>S.No.</Paper>
                {entries.map((entry) => (
                  <Paper key={entry.id} className={classes.paper}>
                    {entry.sNo}
                  </Paper>
                ))}
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>Sub-processes</Paper>
                {entries.map((entry) => (
                  <Paper key={entry.id} className={classes.paper}>
                    {entry.subProcesses}
                  </Paper>
                ))}
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>Document Type</Paper>
                {entries.map((entry) => (
                  <Paper key={entry.id} className={classes.paper}>
                    {entry.documentType}
                  </Paper>
                ))}
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>Upload</Paper>
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
              <Grid item xs={3}>
                <Paper className={classes.paper}>Uploaded Documents</Paper>
                {entries.map((entry) => (
                  <Paper key={entry.id} className={classes.paper}>
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
                <Paper className={classes.paper}>Comments</Paper>
                {entries.map((entry) => (
                  <Paper key={entry.id} className={classes.paper}>
                    <div className={classes.textareaContainer}>
                      <TextareaAutosize
                        value={entry.comments}
                        onChange={handleCommentChange(entry.id)}
                        rows={14}
                        placeholder="Enter comments"
                        className={classes.textarea}
                      />
                    </div>
                  </Paper>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default StatusUpdate;

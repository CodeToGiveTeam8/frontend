import React, { useState } from 'react';
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
  const classes = useStyles();

  const [entries, setEntries] = useState([
    {
      id: 1,
      sNo: '1',
      subProcesses: 'Work on and complete documentation',
      documentType: [
        'Newspaper Publication',
        'TV Telecasting',
        'File Missing Compliant, if not already done',
        'Final Police Report',
        'Medical Report for age verification (if needed)',
      ],
      uploadedDocuments: [],
      comments: '',
    },
    {
      id: 2,
      sNo: '2',
      subProcesses: 'Submit to DCPU and get NOC',
      documentType: ['Submit child’s report for DCPU for NOC', 'Receive DCPU NOC', 'Final Report from CCI'],
      uploadedDocuments: [],
      comments: '',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

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
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>S.No.</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={classes.paper}>
                  {entry.sNo}
                </Paper>
              ))}
            </Grid>
            <Grid item xs={4}>
              <Paper className={`${classes.paper} ${classes.firstRowPaper}`}>Sub-processes</Paper>
              {entries.map((entry) => (
                <Paper key={entry.id} className={classes.paper}>
                  {entry.subProcesses}
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

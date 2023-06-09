import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { MaterialReactTable } from 'material-react-table';
import '../CSSstyles/GDetails.css';
import NavBar from '../Navs/grassrootnav';
// import bimage from "..\Images\reg.jpg"

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

function GDetails() {  
  const initialData = [
    { sNo: 1., step: 'Work on and complete documentation', subSteps: [{ subStep: 'Newspaper Publication', completed: false }, { subStep: 'TV Telecasting', completed: false }, { subStep: 'File Missing Compliant, if not already done', completed: false }] },
    { sNo: 2., step: 'Submit to DCPU and get NOC', subSteps: [{ subStep: 'SubmidocumentationWorkt child’s report for DCPU for NOC', completed: false }, { subStep: 'Receive DCPU NOC', completed: false }] },
    { sNo: 3., step: 'Work on and complete documentationWork on and complete documentationWork on and complete documentationWork on and complete documentationWork on and complete documentationWork on and complete documentation', subSteps: [{ subStep: 'Sub-step 3.1', completed: false }, { subStep: 'Sub-step 3.2', completed: false }, { subStep: 'Sub-step 3.3', completed: false }, { subStep: 'Sub-step 3.4', completed: false }] },
  ];

  const [data, setData] = useState(initialData);
  const [showPopup, setShowPopup] = useState(false);

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
        console.log(id)
        console.log(`http://localhost:8081/child?childId="${ChildId}"`)
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:`http://localhost:8081/child?childId=${ChildId}`,
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData = await APICall(configObject)
        const data = responseData['data']
        console.log(responseData)
        console.log(data)
        setChild(data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [ChildId]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        console.log(`http://localhost:8081/process/progress`)
        const token = cookies.get("accessToken"); // to get token already present.If there is token ,login page should not be rendered
        const configObject = {
          url:`http://localhost:8081/process/progress`,
          method:'GET',
          headers:{'Content-Type':'application/json','Authorization': token},
        }
        const responseData = await APICall(configObject)
        const data = responseData['data']
        console.log(responseData)
        console.log(data)
        setChild(data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  },[child])

  return (
    <div>
    <NavBar />
    <div className="table-container">
      
      <table className="data-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Step</th>
            <th>Sub-steps</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, stepIndex) => (
            <React.Fragment key={stepIndex}>
              <tr>
                <td rowSpan={item.subSteps.length}>{item.sNo}</td>
                <td rowSpan={item.subSteps.length}>
                  <Link to={`/status-update/${stepIndex + 1}`}>{item.step}</Link>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.subSteps[0].completed || false}
                    onChange={() => handleCheckboxChange(stepIndex, 0)}
                  />
                  {item.subSteps[0].subStep}
                </td>
              </tr>
              {item.subSteps.slice(1).map((subStep, subStepIndex) => (
                <tr key={subStepIndex}>
                  <td>
                    <input
                      type="checkbox"
                      checked={subStep.completed || false}
                      onChange={() => handleCheckboxChange(stepIndex, subStepIndex + 1)}
                    />
                    {subStep.subStep}
                  </td>
                </tr>
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

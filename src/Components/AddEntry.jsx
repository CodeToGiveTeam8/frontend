import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import './Navs/styles.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const categories = ["Abandon", "Surrender", "Admitted"];

const genders = ["Male", "Female", "Other"];

function AddEntry() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [orphanageName, setOrphanageName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState('');


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
  };

  return (
    <form onSubmit={handleSubmit}>
    <Typography variant="h4" gutterBottom>
        Add New Entry
    </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            id="name1"
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="outlined"
            size="small"
            id="id1"
            label="Child ID"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            id="dob1"
            label="Date of Birth (MM/DD/YYYY)"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="outlined" size="small">
            <InputLabel id="gender-label" >Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender1"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              fullWidth
              
            >
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="orphanageName"
            label="Orphanage Name"
            value={orphanageName}
            onChange={(event) => setOrphanageName(event.target.value)}
            fullWidth
            variant="outlined" size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant="outlined" size="small">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="startDate"
            label="Start Date (MM/DD/YYYY)"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            fullWidth
            variant="outlined" size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined" size="small"
            id="endDate"
            label="End Date (MM/DD/YYYY)"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="enrollmentDate"
            label="Enrollment Date (MM/DD/YYYY)"
            value={enrollmentDate}
            onChange={(event) => setEnrollmentDate(event.target.value)}
            fullWidth
            variant="outlined" size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            label="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            fullWidth
            variant="outlined" size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            label="State"
            value={state}
            onChange={(event) => setState(event.target.value)}
            fullWidth
            variant="outlined" size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="additionalDetails"
            label="Additional Details"
            multiline
            rows={4}
            value={additionalDetails}
            onChange={(event) => setAdditionalDetails(event.target.value)}
            fullWidth
            variant="outlined" size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="contained-button-file">
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
              className={classes.input}
            />
            <label htmlFor="contained-button-file">
              <span className="custom-file-upload">Choose Photo of child</span>
            </label>
            <Typography variant="subtitle1" display="inline">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </Typography>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.button}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddEntry;

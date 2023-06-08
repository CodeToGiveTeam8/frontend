import React, { useState } from 'react';
import '../CSSstyles/StatusUpdate.css';
import NavBar from '../Navs/grassrootnav';
import { useDropzone } from 'react-dropzone';
import img from "../../Images/upload.png";

function StatusUpdate() {
  const [notes, setNotes] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const userEmail = 'user@example.com'; // Replace with actual method of retrieving user email

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const formatSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  const handleUpload = (acceptedFiles) => {
    const uploadedFiles = acceptedFiles.map((file) => ({
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));

    setUploadedDocuments((prevDocuments) => [...prevDocuments, ...uploadedFiles]);
  };

  const handleDownload = (file) => {
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    link.click();
  };

  const handleShareEmail = (file) => {
    const downloadUrl = URL.createObjectURL(file);
    const emailBody = `Please find the document attached.`;
    const mailToLink = `mailto:${userEmail}?subject=Shared Document&body=${encodeURIComponent(
      emailBody
    )}`;
    window.open(mailToLink);
  };

  const handleDelete = (id) => {
    const updatedDocuments = uploadedDocuments.filter((document) => document.id !== id);
    setUploadedDocuments(updatedDocuments);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleUpload });

  return (
    <div className="status-update-container">
      <NavBar />
      
      <div  className='page-name'>
        <h5>{'>'}Status Update{'>'} Work on and complete documentation</h5>
      </div>
      <div className='row2'>
        <div className='col3'>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            className="my-notes-input"
            placeholder="My Notes"
          />
        </div>
        <div className='col4'>
          
        </div>
      </div>
      <div className='row1'>
        <div className='col1'>
          <div className="dotted-line-box">
            <img className="navbar-logo-image" src={img} alt="logo" />
            <div {...getRootProps()} className="upload-document-input">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here to upload</p>
              ) : (
                <p>Click here to select files or, drag and drop files</p>
              )}
            </div>
          </div>
        </div>
        <div className="col2">
          <table>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Size (Bytes)</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadedDocuments.length === 0 ? (
                <tr>
                  <td colSpan="4">No document added</td>
                </tr>
              ) : (
                uploadedDocuments.map((document) => (
                  <tr key={document.id}>
                    <td>{document.name}</td>
                    <td>{formatSize(document.size)}</td>
                    <td>{document.type}</td>
                    <td>
                      <button onClick={() => handleDownload(document.file)}>Download</button>
                      <button onClick={() => handleShareEmail(document.file)}>Share</button>
                      <button onClick={() => handleDelete(document.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatusUpdate;

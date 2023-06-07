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
    <div>
      <NavBar />
      <textarea
        value={notes}
        onChange={handleNotesChange}
        className="my-notes-input"
        placeholder="My Notes"
      />
      <div className="box-container">
        <div className="dotted-line-box">
          <img className="navbar-logo-image" src={img} alt="loimggo" />
          <div {...getRootProps()} className="upload-document-input">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here to upload</p>
            ) : (
              <p>Click here to select files or, drag and drop files</p>
            )}
          </div>
        </div>
        <div className="uploaded-documents">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadedDocuments.length > 0 ? (
              uploadedDocuments.map((document) => (
                <tr key={document.id}>
                  <td>{document.name}</td>
                  <td>{document.size} bytes</td>
                  <td>{document.type}</td>
                  <td>
                    <button onClick={() => handleDownload(document.file)}>Download</button>
                    <button onClick={() => handleShareEmail(document.file)}>Share</button>
                    <button onClick={() => handleDelete(document.id)}>Delete</button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan={4}>No documents uploaded</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatusUpdate;

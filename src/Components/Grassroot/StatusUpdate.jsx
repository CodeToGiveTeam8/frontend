import React, { useState } from 'react';
import '../CSSstyles/GDetails.css';
import NavBar from '../Navs/grassrootnav';

function StatusUpdate() {
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [email, setEmail] = useState('');

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const uploadedDocument = {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        file: selectedFile,
      };

      setUploadedDocuments([...uploadedDocuments, uploadedDocument]);
      setSelectedFile(null);
    }
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
    const mailToLink = `mailto:${email}?subject=Shared Document&body=${encodeURIComponent(
      emailBody
    )}`;
    window.open(mailToLink);
  };

  return (
    <div>
      <NavBar />
      <input
        type="text"
        value={notes}
        onChange={handleNotesChange}
        className="my-notes-input"
        placeholder="My Notes"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="upload-document-input"
      />
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <button onClick={handleUpload}>Upload</button>
      <div className="uploaded-documents">
        {uploadedDocuments.map((document, index) => (
          <div key={index} className="document-item">
            <span>Name: {document.name}</span>
            <span>Size: {document.size} bytes</span>
            <span>Type: {document.type}</span>
            <button onClick={() => handleDownload(document.file)}>Download</button>
            <button onClick={() => handleShareEmail(document.file)}>Share</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusUpdate;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(

  'Mgo+DSMBaFt+QHJqXE1nQ1lbdF9AXnNIdFd1T2Zebz4Nf1dGYl9RQnZXQ15nQXpUckdlWw==;Mgo+DSMBPh8sVXJ1S0R+VVpDaVddX2NLfUN3T2dadVt3ZDU7a15RRnVfRF1rSH1XfkFkXXtecg==;ORg4AjUWIQA/Gnt2VFhiQlhPcUBKQmFJfFBmRGldfFR1c0UmHVdTRHRcQltjQX9Qck1nXntbdnY=;MjM2MjQ3OUAzMjMxMmUzMDJlMzBQbEJ4Y2svcmFaanhPZkZ0V0h5Z1gxNXBhclZzOXFVUVhVNHVFTEhlSitZPQ==;MjM2MjQ4MEAzMjMxMmUzMDJlMzBQUk9hM3FLbExoZURWb2tNOWVMamNSMm1nN2VaU1Y5SzBzWndqSlJLS1ZVPQ==;NRAiBiAaIQQuGjN/V0d+Xk9NfVhdVXxLflF1VWJTe116cVJWACFaRnZdQV1lSXZSdUFrXXhbcXNX;MjM2MjQ4MkAzMjMxMmUzMDJlMzBSY1BKVWJsVDEwS3NQWWJkdUhwRXpTRTljVUROeC9sWWU5SFhsKzRoOUtRPQ==;MjM2MjQ4M0AzMjMxMmUzMDJlMzBudVlieDFwMzZIM3hnalBjS2dERGZITk45SHV1Zkxycm1MWWZ4dTVQVEVzPQ==;Mgo+DSMBMAY9C3t2VFhiQlhPcUBKQmFJfFBmRGldfFR1c0UmHVdTRHRcQltjQX9Qck1nXnpZc3Y=;MjM2MjQ4NUAzMjMxMmUzMDJlMzBlNm9UL1hIemxaNEp2aVkxWFMxeHlrSitvdWtCSFh1MkZKWHJEMjk2Tk1FPQ==;MjM2MjQ4NkAzMjMxMmUzMDJlMzBpb09ZYW9rQUVjUWVIMHR4NlRYOWRpaitIVnNUNG5idHNCbzJTVmFTRE1jPQ==;MjM2MjQ4N0AzMjMxMmUzMDJlMzBSY1BKVWJsVDEwS3NQWWJkdUhwRXpTRTljVUROeC9sWWU5SFhsKzRoOUtRPQ==')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

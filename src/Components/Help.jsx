import "./CSSstyles/Help.css";
import Headerl from "./Headerl";
import React, { useState } from "react";
import regImage from './loginpage.jpg'; // Import the image

const FAQ = ({ faq, index, toggleFAQ }) => {
  return (
    <>
      <div
        className={"faq " + (faq.open ? "open" : "")}
        key={index}
        onClick={() => toggleFAQ(index)}
      >
        <div className="faq-question">{faq.question}</div>
        <div className="faq-answer">{faq.answer}</div>
        {faq.open && <button className="faq-button">Video</button>}
      </div>
    </>
  );
};

const Help = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "How to add an entry of a new child?",
      answer:
        "Click on the Add Entry tab from the Navigation bar> Fill the form with the details of the child> Click on Submit to add entry",
      open: false,
    },
    {
      question: "How do I see a child's case progress?",
      answer: "Click the name or the ID of the child from the table on the Home page",
      open: false,
    },
    {
      question: "How to upload documents?",
      answer: "Either check from the Sub-Process table and click Upload OR click the Process for which documents have to be uploaded> Click on the Upload button and select the document that has to be uploaded",
      open: false,
    },
    {
      question: "How to get task updates?",
      answer: "Click on Get Updates from the navigation bar> Add your email> Click SUBSCRIBE to activate getting tasks pinged to your mail",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <div className="App">
      <Headerl />

      <div className="content-wrapper">
        <div className="image-wrapper">
          <img src={regImage} alt="Registration" className="image-styling" />
        </div>
        <div className="faqs">
          <h2 className="heading">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
          ))}
          <p className="btext">Didn't find your question? Contact us at 9876543210</p>
        </div>
      </div>
    </div>
  );
};

export default Help;

// The developers of the project:
// Yoni Yirmiyahu - 204797682
// Rotem Mor-Haim - 211905112


import React, { useState } from 'react';
import './App.css';
import './Buttons.css';
import CostForm from './CostForm';
import Report from './Report';


function App() {

  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState('Add Cost');

  const [showReport, setShowReport] = useState(false);
  const [reportButtonText, setReportButtonText] = useState('View Report');

  const [initFlag, setInitFlag] = useState(true);

  const handleAddCostClick = () => {
    setButtonText(showForm ? 'Add Cost' : 'Main Screen');
    setShowForm(!showForm);
    setInitFlag(false);
  };

  const handleReportClick = () => {
    setReportButtonText(showReport ? 'View Report' : 'Main Screen');
    setShowReport(!showReport);
    setInitFlag(false);
  }

  return (
    <div className='App'>
      <header className='App-header'>

        <h1>Welcome to Cost Manager</h1>
        {initFlag && <p>Welcome to Cost Manager</p>}
        {initFlag && <p>Here you can manage your costs</p>}

        <div className='primaryButtons'>
          {!showReport && <button className='button-39' onClick={handleAddCostClick}>{buttonText}</button>}
          {!showForm && <button className='button-39' onClick={handleReportClick}>{reportButtonText}</button>}
          </div>
          {showForm && <CostForm />}
          {showReport && <Report />}
          {initFlag && <div className='footer'><p>By clicking the Add Cost button, a form will open and you can add a new cost</p>
            <p>By View Report button, you can view all of your costs based on the year and month you wish</p></div>}


      </header>
      <footer className='App-footer'>
        <p>Cost Manager - 2023</p>
        <p>Yoni Yirmiyahu and Rotem Mor - Haim</p>
      </footer>
    </div>
  );
}

export default App;

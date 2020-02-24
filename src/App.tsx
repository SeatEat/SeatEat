import React from 'react';
import logo from './logo.svg';
import './App.css';
import CrowdEstimationModel from './model/crowd-estimation-model'

function App() {
  CrowdEstimationModel.estimateChapterCrowdedness(
    new Date(2020, 1, 4, 0, 0),
    [
        {
            averageAmount: 80,
            code: 'CMETE',
        },
        {
            averageAmount: 180,
            code: 'CDATE',
        }
    ],
  ).then(console.log);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

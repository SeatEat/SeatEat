import React from 'react';
import logo from './logo.svg';
import './App.css';
import CrowdEstimationModel from './model/crowd-estimation-model'

function App() {
    const hej = new CrowdEstimationModel(new Date("2020-03-16"), {name: 'Media', code: 'CMETE', averageAmount: 100}, 'HT19');
    console.log(hej.estimateChapterCrowdedness());
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

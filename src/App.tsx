import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
            <div className="App">
              <header className="App-header">
                <Route exact path="/">
                
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
                </Route>
                <Route path="/chapter/:nameOfChapter">
                  <p>
                    Here is the chapter route!
                  </p>
                </Route>
              </header>
            </div>
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Sidebar from './pages/sidebar/sidebar'
import MainContent from './pages/main-content/main-content'

function App() {
    return (
        <Router>
            <div className="App flex-container">
              <Sidebar/>
              <Switch>
                    <header className="App-header">
                        <Route exact path="/">
                            <MainContent info="This is the main content"/>
                        </Route>
                        <Route path="/chapter/:nameOfChapter">
                            <MainContent info="This is the chapter content"/>
                        </Route>
                    </header>
              </Switch>
            </div>
        </Router>
    );
}

export default App;

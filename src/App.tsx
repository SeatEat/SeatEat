import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import MainContent from './pages/main-content/main-content'
import Navbar from './components/navbar/navbar'

function App() {
    return (
        <Router>
            <div className="App flex-container">
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <MainContent/>
                    </Route>
                    <Route path="/chapter/:nameOfChapter">
                        <MainContent/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Homepage from './pages/homepage/homepage';
import MainContentConnect from './pages/main-content/main-content-connect'
import Navbar from './components/navbar/navbar'

function App() {
    return (
        <Router>
            <div className="App flex-container">
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <Homepage/>
                    </Route>
                    <Route path="/chapter/:nameOfChapter">
                        <MainContentConnect/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

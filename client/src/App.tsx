import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import MainContentConnect from './pages/main-content/main-content-connect'
import Navbar from './components/navbar/navbar'

import ChapterHallData from './data/chapter-data.json';

function App() {
    return (
        <Router>
            <div className="App flex-container">
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={"/chapter/" + ChapterHallData[0].name}/>;
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

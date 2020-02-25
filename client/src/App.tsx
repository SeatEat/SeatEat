import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import MainContent from './pages/main-content/main-content'
import Navbar from './components/navbar/navbar'

import ChapterHallData from './data/chapter-data.json';
import CrowdEstimationModel from './model/crowd-estimation-model';

function App() {

    CrowdEstimationModel.estimateChapterCrowdedness(
        new Date(),
        [
            {
                averageAmount: 80,
                code: "CMETE"
            },
            {
                averageAmount: 180,
                code: "CDATE"
            },
        ]
    ).then(console.log);
    
    return (
        <Router>
            <div className="App flex-container">
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={"/chapter/" + ChapterHallData[0].name}/>;
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

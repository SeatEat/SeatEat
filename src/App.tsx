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
import {defaultRoute} from './routes/routes'

function App() {
    console.log(defaultRoute)
    return (
        <Router>
            <div className="App flex-container">
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to={defaultRoute.path}/>;
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

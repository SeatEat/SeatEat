import React from 'react';
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
                            <p>
                                Here is the startpage
                            </p>
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './theme/colors.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import store from './model/redux/store'
import { requestEstimation } from './model/redux/estimationState';
import ChapterHallData from './data/chapter-data.json';

store.subscribe(() => {
    console.log(store.getState());
});

setTimeout(() => {
    store.dispatch(requestEstimation(
        ChapterHallData[5]
    ))
}, 400);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

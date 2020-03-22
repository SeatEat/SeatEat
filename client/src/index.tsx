import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './theme/colors.css';
import './theme/shapes.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import * as firebase from 'firebase';
import credentials from './credentials/credentials.json';
import store from './model/redux/store'
import DialogServiceProvider from './components/dialog/dialog';

store.subscribe(() => {
    console.groupCollapsed("State change");
    console.log(store.getState());
    console.groupEnd();
});

firebase.initializeApp(credentials.firebase);

ReactDOM.render(
    <Provider store={store}>
        <DialogServiceProvider>
            <App />
        </DialogServiceProvider>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

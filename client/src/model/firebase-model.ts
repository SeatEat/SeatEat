import firebase from 'firebase/app';
import 'firebase/firestore';

var credentials: any = "";
if (process.env.FIREBASE_CONFIG) {
    credentials = JSON.parse(process.env.FIREBASE_CONFIG);
}
else {
    credentials = require('../credentials/credentials.json')
}

const firebaseApp = firebase.initializeApp(credentials.firebase);  
const db = firebaseApp.firestore();

export { db };
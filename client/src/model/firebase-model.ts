import firebase from "firebase";

import credentials from '../credentials/credentials.json';

const firebaseApp = firebase.initializeApp(credentials.firebase);  
const db = firebaseApp.firestore();

export { db };
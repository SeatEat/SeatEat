import firebase from 'firebase/app';
import 'firebase/firestore';

import credentials from '../credentials/credentials.json';

const firebaseApp = firebase.initializeApp(credentials.firebase);  
const db = firebaseApp.firestore();

export { db };
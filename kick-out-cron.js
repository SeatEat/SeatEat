const admin = require('firebase-admin');
const getServerKey = require('./server-key.js');
let serviceAccount = getServerKey();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = function () {
    let db = admin.firestore();
    db.collection("CheckIn").listDocuments().then((documents) => {
        documents.map((doc) => {
            doc.delete();
        })
    });
}
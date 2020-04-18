const admin = require('firebase-admin');
let serviceAccount = require('./firebaseServerKey.json');
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
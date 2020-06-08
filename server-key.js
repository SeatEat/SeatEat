module.exports = function getServerKey () {
    if (process.env.FIREBASE_SERVER_KEY) {
        return JSON.parse(process.env.FIREBASE_SERVER_KEY);
    }
    else {
        return require('./firebaseServerKey.json');
    }
}
module.exports = function getServerKey () {
    if (process.env.FIREBASE_SERVER_KEY) {
        return JSON.parse(process.env.FIREBASE_SERVER_KEY);
    }
    else {
        var serverKey = "";
        try {
            serverKey = require('./firebaseServerKey.json');
        } catch (error) {
        }
        return serverKey;
    }
}
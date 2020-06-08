module.exports = function getServerKey () {
    if (process.env.FIREBASE_SERVER_KEY) {
        return JSON.parse(process.env.FIREBASE_SERVER_KEY);
    }

    try {
        return require('./firebaseServerKey.json');
    } catch (error) {
        console.log('Error!!!!');
        return '';
    }
    
}
const express = require( "express" );
const path = require( "path" );
var request = require('request');
 
const app = express();
const port = process.env.PORT || 5000;
let buildFolderPath = "./client/build";

// Change page if in dev
if (app.get('env') === 'development') {
  buildFolderPath = "./";
}

app.use('/kth/kopps/', (req, res) => {
  const url = `https://api.kth.se/api/kopps/v2${req.url.replace('kth/kopps', '')}`;
  console.log(url);
  request(url).pipe(res);
})

app.use('/kth/schema', (req, res) => {
  const url = `https://www.kth.se/api/schema/v2${req.url.replace('kth/schema', '')}`;
  console.log(url);
  request(url).pipe(res);
})

app.use(express.static(path.join(__dirname, buildFolderPath)));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, buildFolderPath, 'index.html'));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});

// Kick out CRON
const kickOutAllUsers = require('./kick-out-cron.js');
var CronJob = require('cron').CronJob;
var job = new CronJob('0 0 * * *', function() {
  kickOutAllUsers();
}, null, true, 'Europe/Stockholm');
job.start();
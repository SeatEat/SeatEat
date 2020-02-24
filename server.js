const express = require( "express" );
const path = require( "path" );

const app = express();
const port = process.env.PORT || 5000;
let buildFolderPath = "./client/build";

// Change page if in dev
if (app.get('env') === 'development') {
  buildFolderPath = "./";
}

app.use(express.static(path.join(__dirname, buildFolderPath)));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, buildFolderPath, 'index.html'));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
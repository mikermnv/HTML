const express = require('express');
const path = require('path');
const app = express();
const portno = 3000;
app.use(express.static(path.join(__dirname)));
// Serve only the static files form the src directory
// app.use(express.static(path.join(__dirname, 'files')));
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname,'index.html')));
// app.use(express.static(path.join(__dirname,'styles.css')));

// Middleware для CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// path to where the files are stored on disk
var FILES_DIR =__dirname;

app.get('/gamecenter', (req, res) =>
    res.sendFile('index.html'),
);

app.get('/download/:file', function(req, res, next){
    const file_name=FILES_DIR+'/files/'+req.params.file;
    res.download(file_name,  function (err) {
        if (!err) return; // file sent
        if (err.status !== 404) return next(err); // non-404 error
        // file for download not found
        res.statusCode = 404;
        res.send('Cant find that file, sorry!');
    });
});

var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log(
    "Listening at http://localhost:" +
      port +
      " exporting the directory " +
      __dirname
  );
});
 const fs = require('fs');
 const express = require('express');
 const path = require('path');
 const noteData = require('./db/db.json');
 const PORT = process.env.port || 3001;

 const app = express();

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.use(express.static('public'));

 app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
 });

 app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
 });

 app.get('/api/notes', (req, res) => res.json(noteData));

 app.post('/api/notes', (req, res) => {
 res.json(`${req.method}`);
 console.log(`${req.method}`);
 const title = req.params.title;
 const text = req.params.text;
 const body = JSON.stringify(req.body);
 console.log(title + " " + text + " " + body);

 const note = req.body;

 noteData.push(note);

 fs.writeFileSync('./db/db.json', JSON.stringify(note));

 res.json(noteData);

});

 app.listen(PORT, () =>
    console.log(`Note taker app listening at http://localhost:${PORT}`)
 );

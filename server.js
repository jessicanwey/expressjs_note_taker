const fs = require("fs");
const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const PORT = 3001;
const cuid = require("cuid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));

app.post("/api/notes", (req, res) => {
  const body = JSON.stringify(req.body);
  console.log(body);

  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: cuid(),
  };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const notesList = JSON.parse(data);

        notesList.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(notesList),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("New note has been added successfully.")
        );
        console.log(notesList);
      }
    });
    res.json(newNote);
});

app.listen(PORT, () =>
  console.log(`Note taker app listening at http://localhost:${PORT}`)
);

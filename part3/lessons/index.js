require("dotenv").config();
const express = require("express");
const app = express();
const Note = require("./models/note");

const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes.map((note) => note.toJSON()));
  });
});

app.get("/api/notes/:id", (req, res) => {
  // const id = Number(req.params.id);
  // const note = notes.find((note) => {
  //   //console.log(note.id, typeof note.id, id, typeof id, note.id === id);
  //   return note.id === id;
  // });
  // //console.log(note);
  // if (note) {
  //   res.json(note);
  // } else {
  //   res.status(404).end();
  // }
  Note.findById(req.params.id).then((note) => {
    res.json(note.toJSON());
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "Content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    res.json(savedNote.toJSON());
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

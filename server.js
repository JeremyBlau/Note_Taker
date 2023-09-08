const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//html routes
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
  });
  
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

// Read notes from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while reading notes.' });
      }
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });
  
  // Save a new note to db.json
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
  
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while reading notes.' });
      }
      const notes = JSON.parse(data);
      notes.push(newNote);
  
      fs.writeFile('db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while saving the note.' });
        }
        res.json(newNote);
      });
    });
  });
  
  // Handle deleting a note by ID
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
  
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while reading notes.' });
      }
      const notes = JSON.parse(data);
  
      // Filter out the note to be deleted by ID
      const updatedNotes = notes.filter((note) => note.id !== noteId);
  
      fs.writeFile('db.json', JSON.stringify(updatedNotes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred while deleting the note.' });
        }
        res.json({ message: 'Note deleted successfully' });
      });
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
    
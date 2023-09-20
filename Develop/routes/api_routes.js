const fs = require('fs');
const path = require('path');
const router = require('express').Router();

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  res.json(notesData);
});

// POST /api/notes should receive a new note to save on the request body,
// add it to the db.json file, and then return the new note to the client.
router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  // Generate a unique ID for the new note (you can use libraries like 'uuid' or 'nanoid')
  newNote.id = uniqueId(); // Replace with your unique ID generation logic
  notesData.push(newNote);
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notesData));
  res.json(newNote);
});

module.exports = router;

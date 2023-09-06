// Initialize variables for HTML elements
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// Check if the current page is the notes page
if (window.location.pathname === '/notes') {
  // Get references to HTML elements
  noteTitle = document.getElementById('note-title-input');
  noteText = document.getElementById('note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.getElementById('notes-list');
}

// Function to show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Function to hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// Object to store the active note
let activeNote = {};

// Function to fetch existing notes and render them
const getAndRenderNotes = () => {
  // Fetch notes from your server's API (replace with actual API endpoint)
  fetch('/api/notes')
    .then((response) => response.json())
    .then((data) => {
      // Clear the existing notes list
      noteList.innerHTML = '';

      // Check if there are no notes and display a message
      if (data.length === 0) {
        const noNotesMessage = document.createElement('li');
        noNotesMessage.textContent = 'No saved notes.';
        noteList.appendChild(noNotesMessage);
      } else {
        // Iterate through the notes and create list items
        data.forEach((note) => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');
          listItem.innerText = note.title;
          listItem.dataset.noteId = note.id;

          // Add a click event listener to view the clicked note
          listItem.addEventListener('click', () => {
            activeNote = {
              id: note.id,
              title: note.title,
              text: note.text,
            };
            renderActiveNote();
          });

          noteList.appendChild(listItem);
        });
      }
    });
};

// Function to render the active note in the right-hand column
const renderActiveNote = () => {
  if (activeNote.id) {
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
    show(saveNoteBtn);
  } else {
    noteTitle.value = '';
    noteText.value = '';
    hide(saveNoteBtn);
  }
};

// Function to handle saving a new note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value.trim(),
    text: noteText.value.trim(),
  };

  // Check if both title and text are provided
  if (newNote.title && newNote.text) {
    // Send a POST request to save the new note (replace with your actual API endpoint)
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then(() => {
        // Clear the input fields
        noteTitle.value = '';
        noteText.value = '';
        activeNote = {}; // Reset activeNote
        renderActiveNote();
        getAndRenderNotes(); // Refresh the notes list
      });
  }
};

// Event listeners
if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', () => {
    activeNote = {};
    renderActiveNote();
  });
  noteTitle.addEventListener('input', renderActiveNote);
  noteText.addEventListener('input', renderActiveNote);
}

// Initial rendering of notes and active note
getAndRenderNotes();
renderActiveNote();

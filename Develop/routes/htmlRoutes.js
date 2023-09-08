app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
  });
  
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
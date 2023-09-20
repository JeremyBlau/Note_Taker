const express = require('express');
const htmlRoutes = require('./Develop/routes/html_routes');
const apiRoutes = require('./Develop/routes/api_routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use the HTML and API routes
app.use(htmlRoutes);
app.use(apiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

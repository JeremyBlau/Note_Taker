const express = require('express');
const html_routes = require('/routes/html-routes')
const api_routes = require('/routes/api-routes')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(html_routes)
app.use(api_routes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

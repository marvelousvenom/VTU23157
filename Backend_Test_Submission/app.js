const express = require('express');
const app = express();
const urlRoutes = require('./routes/urlRoutes');

app.use(express.json());
app.use('/', urlRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));

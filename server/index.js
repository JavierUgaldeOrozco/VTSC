// ./index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors
const coachRoutes = require('./routes/coachRoute');

const app = express();

app.use(cors()); // Habilita cors
app.use(bodyParser.json());
app.use('/api', coachRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// ./index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors
const coachRoutes = require('./routes/coachRoute');
const playerRoutes = require('./routes/playerRoute');
const participationRoutes = require('./routes/participationRoute');

const app = express();

app.use(cors()); // Habilita cors
app.use(bodyParser.json());
app.use('/api', coachRoutes);
app.use('/api', playerRoutes);
app.use('/api', participationRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

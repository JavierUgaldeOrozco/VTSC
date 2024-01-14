// ./config/db.js
const mysql = require('mysql');

// Configura la conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vtsc'
});

// Conéctate a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }

  console.log('Conexión exitosa a la base de datos');
});

// Exporta la función getConnection
module.exports.getConnection = function() {
  return connection;
};

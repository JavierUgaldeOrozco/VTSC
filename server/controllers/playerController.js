const Player = require("../models/playerModel")
const {getConnection} = require("../config/db")

// Get

function getAllPlayers(req,res) {
    const connection = getConnection();
    connection.query('SELECT * FROM players', (error, results, fields) =>{
        if (error){
            res.status(500).json({error: 'Error al obtener los jugadores'});
            return;
        }

        res.json(results);
    }
)};


// Post

function createPlayer(req, res) {
    const { playerName, playerLastName, playerAge, playerCategorie, playerBirthCertificate, playerSired, playerPoints, idCoach } = req.body;

    if (!playerName || !playerLastName || !playerAge || !playerCategorie || !playerSired || !playerPoints || !idCoach) {
        res.status(400).json({ error: 'Se requiere agregar Nombre, Apellido, Edad, Categoria, Certificado de nacimiento, Afiliación, Puntos y Coach' });
        return;
    }

    const connection = getConnection();
    const newPlayer = { playerName, playerLastName, playerAge, playerCategorie, playerBirthCertificate, playerSired, playerPoints, idCoach };

    if (idCoach) {
        connection.query('SELECT * FROM coaches WHERE idCoach = ?', [idCoach], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: 'Error al verificar el coach' });
                return;
            }

            if (results.length === 0) {
                res.status(400).json({ error: 'Coach no encontrado' });
                return;
            }

            insertPlayer(connection, newPlayer, res);
        });
    } else {
        insertPlayer(connection, newPlayer, res);
    }
}

function insertPlayer(connection, playerData, res) {
    connection.query('INSERT INTO players SET ?', playerData, (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: 'Error al crear el jugador' });
            return;
        }

        res.status(400).json({ message: 'Jugador creado correctamente', idPlayer: results.insertId });
    });
}


// Put

function updatePlayer(req, res) {
    const { id } = req.params;
    const { playerName, playerLastName, playerAge, playerCategorie, playerBirthCertificate, playerSired, playerPoints, idCoach } = req.body;

    let updateFields = [];
    let values = [];
    
    if (playerName) { updateFields.push('playerName = ?'); values.push(playerName); }
    if (playerLastName) { updateFields.push('playerLastName = ?'); values.push(playerLastName); }
    if (playerAge) { updateFields.push('playerAge = ?'); values.push(playerAge); }
    if (playerCategorie) { updateFields.push('playerCategorie = ?'); values.push(playerCategorie); }
    if (playerBirthCertificate) { updateFields.push('playerBirthCertificate = ?'); values.push(playerBirthCertificate); }
    if (playerSired) { updateFields.push('playerSired = ?'); values.push(playerSired); }
    if (playerPoints) { updateFields.push('playerPoints = ?'); values.push(playerPoints); }
    if (idCoach) { updateFields.push('idCoach = ?'); values.push(idCoach); }

    if (updateFields.length === 0) {
        res.status(400).json({ error: 'No hay datos para actualizar' });
        return;
    }

    const connection = getConnection();
    values.push(id);
    connection.query(`UPDATE players SET ${updateFields.join(', ')} WHERE idPlayer = ?`, values, (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar el jugador' });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Jugador no encontrado' });
            return;
        }

        res.json({ message: 'Jugador actualizado correctamente' });
    });
}


// Delete

function deletePlayer (req, res) {
    const {id} = req.params;

    if (!id) {
        res.status(400).json({error: 'Se requiere el Id del jugador que se desea eliminar'});
        return;
    }

    const connection = getConnection();
    connection.query('DELETE from players where idPlayer = ?', id, (error, results, fields)=>{
        if (error) {
            res.status(500).json({error: 'Error al eliminar el jugador ' + id})
        }

        if (results.affectedRows === 0) {
            console.log(id)
            res.status(400).json({error: 'Error, no se encontró el jugador'})
        }

        res.json({message: 'Jugador eliminado correctamente'})
    });
}

module.exports = {
    getAllPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer
}
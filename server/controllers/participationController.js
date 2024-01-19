const Participation = require('../models/participationModel')
const {getConnection} = require('../config/db')

// Get

function getAllParticipations(req,res) {
    const connection = getConnection();
    connection.query('SELECT * from participations', (error, results, fields) =>{
        if (error){
            res.status(500).json({error: 'Error al obtener las participaciones'});
            return;
        }

        res.json(results)
    }
    )
};

// Post

function createParticipation(req, res) {
    const {participationStatus, idTournament, idClub} = req.body

    if (!participationStatus || !idTournament || !idClub) {
        res.status(400).json({error: 'Todos los campos son requeridos'});
        return;
    }

    const connection = getConnection();
    const newParticipation = {participationStatus, idTournament, idClub};

    if (idTournament) {
        connection.query('SELECT * FROM tournaments WHERE idTournament = ?', [idTournament], (error, results, fields) => {
            if (error) {
                res.status(500).json({error: 'Error al verificar el torneo'});
                return;
            }

            if (results.length === 0) {
                res.status(400).json({error: 'Torneo no encontrado'});
                return;
            }

            if (idClub) {
                connection.query('SELECT * FROM clubs WHERE idClub = ?', [idClub], (error, results, fields) => {
                    if (error) {
                        res.status(500).json({error: 'Error al verificar el club'});
                        return;
                    }

                    if (results.length === 0) {
                        res.status(400).json({error: 'Club no encontrado'});
                        return;
                    }

                    connection.query('INSERT INTO participations SET ?', newParticipation, (error, results, fields) => {
                        if (error) {
                            res.status(500).json({error: 'Error al crear participación'});
                            return;
                        }

                        res.status(200).json({ message: 'Participación creada correctamente'});
                    });
                });
            };
        });
    };
};

// Put

function updateParticipation(req, res) {
    const {id} = req.params;
    const {participationStatus, idTournament, idClub} = req.body

    let updateFields = [];
    let values = [];

    if (participationStatus) { updateFields.push('participationStatus = ?'); values.push(participationStatus); }
    if (idTournament) { updateFields.push('idTournament = ?'); values.push(idTournament); }
    if (idClub) { updateFields.push('idClub = ?'); values.push(idClub); }

    if (updateFields.length === 0) {
        res.status(400).json({ error: 'No hay datos para actualizar'});
        return;
    }

    const connection = getConnection()
    values.push(id);
    connection.query(`UPDATE participations SET ${updateFields.join(', ')} WHERE idParticipation = ?`, values, (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar la participación #' + id});
            console.log(error);
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Participación no encontrada'});
            return;
        }

        res.json({ message: 'Participación actualizada correctamente'})
    });
}

// Delete

function deleteParticipation (req, res) {
    const {id} = req.params;

    if (!id) {
        res.status(400).json({ error: 'Se requiere el Id de la participación'});
        return;
    }

    const connection = getConnection();
    console.log(connection)
    connection.query('DELETE FROM participations WHERE idParticipation = ?', id, (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: 'Error al eliminar la participación'});
            return;
        }

        if (results.affectedRows === 0) {
            res.status(400).json({error: 'Error, no se encontró la participación'});
            return;
        }

        res.json({message: 'Participación eliminada correctamente'});
    });
}

module.exports = {
    getAllParticipations,
    createParticipation,
    updateParticipation,
    deleteParticipation
};
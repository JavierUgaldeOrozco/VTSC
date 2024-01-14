const Coach = require('../models/coachModel');
const {getConnection} = require('../config/db');

//Obtener todos los coaches
function getAllCoaches(req,res){
    const connection = getConnection();
    connection.query('SELECT * FROM coaches', (error, results, fields) =>{

        if(error){
            res.status(500).json({error: 'Error al obtener los coaches'});
            return;
        }

        res.json(results);

    });
}

//Crear un nuevo Coach

function createCoach(req,res){
    const {coachName, coachLastName, coachPhoneNumber} = req.body;

    if(!coachName || !coachLastName || !coachPhoneNumber ){
        res.status(400).json({error: 'Se requiere agreguar Nombre, Apellidos y Numero de telefono del coach'});
        return;
    }

    const connection = getConnection();
    const newCoach = new Coach(null,coachName,coachLastName,coachPhoneNumber);

    connection.query('INSERT INTO coaches SET ?', newCoach, (error, result, fields)=>{
        if(error){
            res.status(500).json({error: 'Error al crear el coach'});
            return;
        }
        
        res.json({message: 'Coach creado correcamente...', idCoach: result.insertId});
    });
}

module.exports ={
    getAllCoaches,
    createCoach,
}
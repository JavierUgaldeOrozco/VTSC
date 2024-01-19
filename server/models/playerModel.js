class Player{
    constructor(idPlayer, playerName, playerLastName, playerAge, playerCategorie, playerBirthCertificate, playerSired, playerPoints, idCoach){
        this.idPlayer = idPlayer,
        this.playerName = playerName,
        this.playerLastName = playerLastName,
        this.playerAge = playerAge,
        this.playerCategorie = playerCategorie,
        this.playerBirthCertificate = playerBirthCertificate,
        this.playerSired = playerSired,
        this.playerPoints = playerPoints,
        this.idCoach = idCoach
    }
}

module.exports = Player;
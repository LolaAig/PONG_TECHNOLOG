const socket = io();

let infosPlayer = {
    socketID : null,
    numero : null,
    gameData : null
}

socket.on("connect", () => {
    console.log("Client se connecte");
    infosPlayer.socketID = socket.id;
    document.getElementById("template").innerHTML = document.getElementById("screen-game").innerHTML;

    socket.emit("Joueur a rejoint");
});

socket.on("Rejoindre partie", (numeroJoueur) => {
    infosPlayer.numero = --numeroJoueur;
    document.getElementById("nbJoueur").innerHTML += "Partie à "+numeroJoueur+" joueur(s) // ";
});

socket.on("Mettre à jour nb joueur", (nbJoueur) => {
    console.log(nbJoueur+ " joueur(s) connecté(s)");
    document.getElementById('nbJoueur').innerHTML += nbJoueur+" joueur(s) connecté(s)";
});


socket.on("Lancer la partie", (nbJoueurs) => {
    console.log(" Lancer la partie à "+nbJoueur+" joueurs");
    console.log("game "+game);

    var requestAnimId;
    var main = function() {
        // le code du jeu
        game.clearLayer(game.playersBallLayer);
        game.movePlayer();
        infosPlayer.gameData = game.players[infosPlayer.numero];
        socket.emit('Update position', infosPlayer);
        game.displayPlayers();
        game.moveBall();
        //game.ai.move();
        game.collideBallWithPlayersAndAction();
        requestAnimId = window.requestAnimationFrame(main); // rappel de main au prochain rafraîchissement de la page
    }        
    console.log(infosPlayer);
    game.init(nbJoueurs, infosPlayer.numero);
    requestAnimId = window.requestAnimationFrame(main); // appel de la fonction initialisation au chargement de la page        
});

socket.on("Send position", (joueur) => {
    game.updatePositionPlayer(joueur);
});



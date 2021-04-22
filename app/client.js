const socket = io();

socket.on("connect", () => {
    console.log("Client se connecte");
});

socket.on("Mettre à jour nb joueur", (nbJoueur) => {
    console.log(nbJoueur+ " joueur(s) connecté(s)");
    document.getElementById('nbJoueur').innerHTML = nbJoueur+" joueur(s) connecté(s)";
});


socket.on("Lancer la partie", (nbJoueurs) => {
    console.log(" Lancer la partie à "+nbJoueur+" joueurs");
    console.log("game "+game);

    var requestAnimId;
    var main = function() {
        // le code du jeu
        game.clearLayer(game.playersBallLayer);
        game.movePlayers();
        game.displayPlayers();
        game.moveBall();
        //game.ai.move();
        //game.collideBallWithPlayersAndAction();
        requestAnimId = window.requestAnimationFrame(main); // rappel de main au prochain rafraîchissement de la page
    }        
    game.init(nbJoueurs);
    requestAnimId = window.requestAnimationFrame(main); // appel de la fonction initialisation au chargement de la page        
    socket.emit('game', game);
});



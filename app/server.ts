import express from 'express';
import path from 'path';
import {applyConfig} from './config/express';
let fs = require('fs');
let async = require('async');

let game = require('../public/js/game.js');

let countPlayers = 0;
let nbJoueurs = 0;

const app: express.Application = express();
applyConfig(app)

let http = require('http').Server(app);
let io = require('socket.io')(http);


app.get('/',(req:any,res:any)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
});


app.get('/partie',(req:any,res:any)=>{
    nbJoueurs = req.query.nombreJoueur;
    res.sendFile(path.join(__dirname,'..','public','partie.html'));
});

app.get('/js/client.js',(req:any,res:any)=>{
    res.sendFile(path.join(__dirname, 'client.js'));
});

let myDir = ['js','sound'];
    myDir.forEach((dir) =>{
        fs.readdir(path.join(__dirname,'..','public', dir),(err:any, result:any)=>{
            async.each(result,(file:string, callback:any) => {
                app.get('/' + dir + '/' + file, (req:any,res:any) =>{
                    res.sendFile(path.join(__dirname,'..', 'public', dir, file));
                });
        });
    });
});

io.on('connection', (socket: any) => {
    console.log("Connecté");
    countPlayers++;
    console.log(countPlayers);
    io.sockets.emit('Mettre à jour nb joueur', countPlayers);
    console.log("Partie avec :  "+nbJoueurs+ " joueurs");
    // lancer la partie
    if(countPlayers == nbJoueurs) {
        console.log("Lancer la partie");
        socket.emit('Lancer la partie', countPlayers);
        socket.on("game", (game:any) => {
            console.log(game);
        });
    }
    else {
        console.log("En attente de joueurs");
    }

    socket.on('disconnect', () => {
        countPlayers--;
        io.sockets.emit('Mettre à jour nb joueur', countPlayers);
    });
});





http.listen(3011,()=>{
    console.info('HTTP server started on port 3011');
});
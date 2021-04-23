import express from 'express';
import path from 'path';
import {applyConfig} from './config/express';
let fs = require('fs');
let async = require('async');

let countPlayers = 0;
let nbJoueurs = 2;
let jeuEnAttente = false;

const app: express.Application = express();
applyConfig(app)

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/',(req:any,res:any)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
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

    socket.on('disconnect', () => {
        countPlayers--;
        io.sockets.emit('Mettre à jour nb joueur', countPlayers);
    });

    socket.on('Joueur a rejoint', () => {
        jeuEnAttente = true;
        countPlayers++;
        socket.emit('Rejoindre partie', countPlayers);
        io.sockets.emit('Mettre à jour nb joueur', countPlayers);

        if(countPlayers == nbJoueurs) {
            console.log("Lancer la partie");
            io.sockets.emit('Lancer la partie', countPlayers);

            socket.on("game", (game:any) => {
                console.log(game);
            });
        }
    });

    socket.on('Update position', (joueur:any) => {
        io.sockets.emit('Send position', joueur);
    });
});


http.listen(3011,()=>{
    console.info('HTTP server started on port 3011');
});
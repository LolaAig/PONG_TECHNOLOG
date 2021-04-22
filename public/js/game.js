var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000000",
    netWidth : 6,
    netColor: "#FFFFFF",

    scoreLayer : null,
    playersBallLayer : null,

    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,
   
    groundLayer : null,

    wallSound : null,
    playerSound : null,
    players : null,

    ball : {
        width : 10,
        height : 10,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        speed : 3,
        directionX : 1,
        directionY : 1,
        inGame : false,
        move : function() {
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
        },
        bounce : function(soundToPlay) {
            if ( this.posX > game.groundWidth || this.posX < 0 ) {
              this.directionX = -this.directionX;
              soundToPlay.play();
            }
            if ( this.posY > game.groundHeight || this.posY < 0  ) {
              this.directionY = -this.directionY;
              soundToPlay.play();
            }    
        },
        collide : function(anotherItem) {
            if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
            || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
              // Collision
              return true;
            } 
            return false;
        },
      },
    
    

      
   
    init : function(numberPlayers) {
        this.players = game.players.getPlayers(numberPlayers);
        console.log(numberPlayers);
        this.groundLayer= game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
       
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
        game.display.drawTextInLayer(this.scoreLayer , "SCORE", "10px Arial", "#FF0000", 10, 10);
       
        this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  
        game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);
       
        this.displayScore(0,0);
        this.displayBall();
        this.displayPlayers();

        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
        this.initMouse(game.control.onMouseMove);

        this.wallSound = new Audio("./sound/pingMur.mp3");
        this.playerSound = new Audio("./sound/pingRaquette.ogg");

        

        game.ai.setPlayerAndBall(this.playerTwo, this.ball);
        
    },

    displayScore : function(scorePlayer1, scorePlayer2) {
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
    },

    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);    },
    
    displayPlayers : function() {
      this.players.forEach(player => {
        game.display.drawRectangleInLayer(this.playersBallLayer, player.width, player.height, player.color, player.posX, player.posY);
      });
    },

    moveBall : function() { 
        this.ball.move();
        this.ball.bounce(this.wallSound);
        this.displayBall();
    }, 

    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    movePlayers : function() {
        if ( game.control.controlSystem == "KEYBOARD" ) {
            // keyboard control
            if ( game.playerOne.goUp ) {
              game.playerOne.posY-=5;
            } else if ( game.playerOne.goDown ) {
              game.playerOne.posY+=5;
            }
          } else if ( game.control.controlSystem == "MOUSE" ) {
            // mouse control
            if (game.playerOne.goUp && game.playerOne.posY > game.control.mousePointer)
              game.playerOne.posY-=5;
            else if (game.playerOne.goDown && game.playerOne.posY < game.control.mousePointer)
              game.playerOne.posY+=5;
          }
    },
    
    initMouse : function(onMouseMoveFunction) {
        window.onmousemove = onMouseMoveFunction;
    },

    collideBallWithPlayersAndAction : function() { 
        if ( this.ball.collide(game.playerOne) ) {
          game.ball.directionX = -game.ball.directionX;
          this.playerSound.play();
        }
        if ( this.ball.collide(game.playerTwo) ) {
          game.ball.directionX = -game.ball.directionX;
          this.playerSound.play();
        }
      },

      getgroundWidth : function(groundWidth) {
        return groundWidth;
      }
    
  };
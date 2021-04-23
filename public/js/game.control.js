game.control = {
    mousePointer : null,

    controlSystem : null,
 
    onKeyDown : function(event) {
       
        game.control.controlSystem = "KEYBOARD";
        
            if ( event.keyCode == game.keycode.KEYDOWN ) { 
                game.players[game.currentPlayer].goDown = true;
            } else if ( event.keyCode == game.keycode.KEYUP ) { 
                game.players[game.currentPlayer].goUp = true;
            }
            if ( event.keyCode == game.keycode.SPACEBAR ) { 
                game.ball.inGame = true;
            }
        
    },
   
    onKeyUp : function(event) {
      game.control.controlSystem = "KEYBOARD";
      if ( event.keyCode == game.keycode.KEYDOWN ) {
        game.players[game.currentPlayer].goDown = false;
      } else if ( event.keyCode == game.keycode.KEYUP ) {
        game.players[game.currentPlayer].goUp = false;
      }

      if ( event.keyCode == game.keycode.SPACEBAR ) { 
        game.ball.inGame = true;
    }
  
    },

    onMouseMove : function(event) {

            game.control.controlSystem = "MOUSE";
            if ( event ) {
            game.control.mousePointer = event.clientY;
            }
        
            if ( (game.control.mousePointer > game.players[game.currentPlayer].posY) && (game.groundHeight > game.players[game.currentPlayer].posY+game.players[game.currentPlayer].height)) {
            game.players[game.currentPlayer].goDown = true;
            game.players[game.currentPlayer].goUp = false;
            } else if ( game.control.mousePointer < game.players[game.currentPlayer].posY ) {
            game.players[game.currentPlayer].goDown = false;
            game.players[game.currentPlayer].goUp = true;
            } else {
            game.players[game.currentPlayer].goDown = false;
            game.players[game.currentPlayer].goUp = false;
            }
        }
    
  }
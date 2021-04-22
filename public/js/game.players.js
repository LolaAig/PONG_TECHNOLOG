game.players = {

    playersTab : 
    [
       {
        width : 5,
        height : 50,
        color : "#F3FEB0",
        posX : 30,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "left"
      },
        
      {
        width : 5,
        height : 50,
        color : "#F3FEB0",
        posX : 650,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "right"
      },

      {
        width : 5,
        height : 50,
        color : "#F3FEB0",
        posX : 30,
        posY : 400,
        goUp : false,
        goDown : false,
        originalPosition : "left"
      },
        
      {
        width : 5,
        height : 50,
        color : "#F3FEB0",
        posX : 650,
        posY : 400,
        goUp : false,
        goDown : false,
        originalPosition : "right"
      }
    ],

    getPlayers : function(numberPlayers) {
        //let playersTabGame = playersTab.filter(function(index){ return index < numberPlayers});
        console.log("getPlayers");
        return this.playersTab;
        
    }


}
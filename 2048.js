

//2048 Spinoff Javascript Source code
//Created by Katia Villevald, Larisa Aguilar, Kembrya O'Neal
//August 8t, 2015


<!------------------------------------------------------------Initialize Variables------------------------------------------------------------------------------------------>

var board = [[0,2,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var boardSize = 4;
var noEmptySpace = 0;

<!------------------------------------------------------------Define Secondary Functions------------------------------------------------------------------------------------------>


					<!----------------------------------colorBoard() assigns a color to a tile based on the number on the tile--------------------------------------------->

	function colorBoard(){
				for(var i = 0; i < boardSize; i++){
					for(var j = 0; j < boardSize; j++){
						var boardID = "r"+i+"c"+j;
						if(board[i][j] == 2){
							document.getElementById(boardID).style.background = "#f0e5da";
							document.getElementById(boardID).style.color = "#696969";
						}
						else if(board[i][j] == 4){
							document.getElementById(boardID).style.background = "#ede2c8";
							document.getElementById(boardID).style.color = "#696969";
						}
						else if(board[i][j] == 8){
							document.getElementById(boardID).style.background = "#feb578";
							document.getElementById(boardID).style.color = "white";
						}
						else if(board[i][j] == 16){
							document.getElementById(boardID).style.background = "#ff9962";
							document.getElementById(boardID).style.color = "white";
						}
						else if(board[i][j] == 32){
							document.getElementById(boardID).style.background = "#ff8060";
							document.getElementById(boardID).style.color = "white";
						}
						else if(board[i][j] == 64){
							document.getElementById(boardID).style.background = "#ff613c";
							document.getElementById(boardID).style.color = "white";
						}
						else if(board[i][j] == 128){
							document.getElementById(boardID).style.background = "#efd26d";
							document.getElementById(boardID).style.color = "white";
						}
						else if(board[i][j] == 256){
							document.getElementById(boardID).style.background = "#efd15c";
							document.getElementById(boardID).style.color = "white";
						}
						else if(board[i][j] == 512){
							document.getElementById(boardID).style.background = "#efcd4a";
							document.getElementById(boardID).style.color = "white";
						}
						else if(board[i][j] == 1024){
							document.getElementById(boardID).style.background = "#f0ca36";
							document.getElementById(boardID).style.color = "white";
						}
						else if(board[i][j] == 2048){
							document.getElementById(boardID).style.background = "#eeca00";
							document.getElementById(boardID).style.color = "white";
						}
						else{
							document.getElementById(boardID).style.background = "#ccc0b3";
						}
					}
				}
	}	
	
	<!--------------------------------GenerateTwo() generates a two tile on a random empty space after an arrow key is pressed ---------------------------->
	
	function GenerateTwo(){
		var iList = [];
		var jList = [];
		
		
		for(var i = 0; i < 4; i++){
			for(var j=0; j<4; j++){
				if(board[i][j] ==0){
					iList.push(i);
					jList.push(j);
					
					
				}
			}
		}
		
		var randI = Math.floor(Math.random() * iList.length);
		var newI = iList[randI];
		var newJ = jList[randI];
		if(iList.length !=0){
			board[newI][newJ] = 2;
			noEmptySpace=0;
		}
		else{
			noEmptySpace=1;
			
		}
	}

	<!----------------------LoseGameCheck() checks if the player can make any more moves once the board is filled wih all number tiles--------------------------------->

	function LoseGameCheck(noEmptySpace){
		var loseList = [];
		
		
		//if the board has no empty spaces
		if(noEmptySpace==1){
			
			//check if player can merge any tiles by pressing right arrow key
			for(var i=0; i<4;i++){
				for(var j=0; j<3;j++){
					if(board[i][j] != board[i][j+1]){
						
						loseList.push(0);
						
					}
				}
			}
			
			
			
			//checks if player can merge any tiles by pressing the down arrow key
			for(var i=0; i<3;i++){
					for(var j=0; j<4;j++){
						if(board[i][j] != board[i+1][j]){
							
							loseList.push(0);
							
						}
					}
			}
			
			
			

			//checks if player can merge any tiles by pressing the left arrow key
			for(var i=0; i<4;i++){
					for(var j=3; j>0;j--){
						if(board[i][j] != board[i][j-1]){
							
							loseList.push(0);
							
						}
					}
			}
			
			
			
			
			//checks if player can merge any tiles by pressing up arrow key
			for(var i=3; i>0;i--){
					for(var j=0; j<4;j++){
						if(board[i][j] != board[i-1][j]){
							
							loseList.push(0);
							
						}
					}
			}	
		}
		
		
		
		//indicates the game is over
		if (loseList.length ==48){
			alert("YOU LOSE...GAME OVER");
		}
	}


					<!----------------------------------winGameCheck() checks the board for a 2048 number tile--------------------------------------------->

	function winGameCheck(){

		for (var i=0; i<4;i++){
			for (var j=0;j<4;j++){
				if(board[i][j] ==2048){
					alert("CONGRATULATIONS...YOU WIN! :)" );
				}
			}
		}	
	}


			
		<!------------------------------------------------------------ runGame() draws the correct number for each space in the grid--------------------------------------->
		
	function runGame(){
	   for(var i = 0; i < boardSize; i++){
			   for(var j = 0; j < boardSize; j++){
					   var boardID = "r"+i+"c"+j;
					   if(board[i][j]!=0){
							   document.getElementById(boardID).innerHTML = board[i][j];
							   colorBoard();
						}
					   else{
								document.getElementById(boardID).innerHTML = "";
					   }
			   }
	   } 
	}


<!-----------------------------------------------------------------------Define Main Function--------------------------------------------------------------------------------------->

	<!------------------------------------------------------------ arrowPress(e) moves and merges tiles--------------------------------------->
function arrowPress(e) {

    e = e || window.event;
	
	if (e.keyCode == '38') {
		//up arrow
	
    for (var j=0; j<4; j++){
	
			//Checks to see if any numbers next to each other are of the same value and merges them
    		for (var i=0; i<3; i++){ 
    			if (board[i+1][j]== board[i][j]){
    					board[i+1][j] = 2*board[i][j];			
    					board[i][j] = 0;
					}
    		}
    		
    		
    		
    		//Moves the number tile up by 1 if the next space above is empty
    		for (var i=1; i<4; i++){
    				if(board[i-1][j] ==0){
						board[i-1][j] = board[i][j];  
						board[i][j] =0; 			
    				}
        	}
    }   	
 } 
 
     else if (e.keyCode == '40') {
        // down arrow
		
        for (var j=0; j<4; j++){
		
			//Checks to see if any numbers next to each other are of the same value and merges them
    		for (var i=3; i>0; i--){ 		
    				if (board[i-1][j]== board[i][j]){
    					board[i-1][j] = 2*board[i][j];
    					board[i][j] = 0;
					}
    		}
    		    		
    		
			
			//Moves the number tile down by 1 if the next space below is empty
    		for (var i=2; i>-1; i--){ 
				if(board[i+1][j] ==0){
					board[i+1][j] = board[i][j];  
					board[i][j] =0;		
    			}
			}
        }
	}    



    else if (e.keyCode == '37') {
       // left arrow
       
       	for (var i=0; i<4; i++){

			//Checks to see if any numbers next to each other are of the same value and merges them
    		for (var j=0; j<3; j++){ 	
    				if (board[i][j]== board[i][j+1]){
    					board[i][j+1] = 2*board[i][j];
    					board[i][j] = 0;
					}
    		}
    		
    		
    		//Moves the number tile to the left by 1 if the next space on the left is empty
    	
    		for (var j=1; j<4; j++){ 		
				if(board[i][j-1] ==0){
					board[i][j-1] = board[i][j];  
					board[i][j] =0; 
				}
			}    	
    	}
    }
    
    
    
    
    
    else if (e.keyCode == '39') {
    	// right arrow
    	
    	for (var i=0; i<4; i++){
		
			//Checks to see if any numbers next to each other are of the same value and merges them
    		for (var j=3; j>0; j--){ 
    				if (board[i][j]== board[i][j-1]){
    					board[i][j-1] = 2*board[i][j];
    					board[i][j] = 0;
    				}
    		}
    		
    		
    		//Moves the number tile to the right by 1 if next space tot he right is empty
    	
    		for (var j=2; j>-1; j--){
    			if(board[i][j+1] ==0){
					board[i][j+1] = board[i][j];  
					board[i][j] =0;		
    			}
    		}	    	
    	}
    }
	
	
	GenerateTwo();
	
	//update the tiles on the board
    for (var i = 0; i<4;i++){
    	for(var j=0; j<4;j++)
    	{
    		runGame();  	
    	}
    }
	winGameCheck();
	LoseGameCheck(noEmptySpace);
  }
	
	




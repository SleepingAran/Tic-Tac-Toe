var painted;
var content;
var winningCombinations;
var turns = 0;
var myCanvas;
var squaresFilled = 0; //calculate how many squares filled
var y; //bootlean for continue the game
var canvas = []; //canvas array

function instantiateCanvas(){
	var lineBreakCount = 0;
	var lineBreak = [];
	var nbsp = [];
	for (var number = 0; number < 9; number++){
		canvas.push(document.createElement('canvas')); //Create the canvas element
		canvas[number].id = "canvas"+ number; //Give the dynamically created canvas element an id
		canvas[number].width= 50; //Set width of canvas element
		canvas[number].height= 50; //Set height of canvas element
		canvas[number].style.border  = "2px solid"; //Border of canvas element
		canvas[number].style.backgroundColor ="white";//Set white colour for the canvas
		document.getElementById("cmd").appendChild(canvas[number]); //Push the 'canvas' array
		nbsp.push(document.createTextNode('\u00A0')); //spacing between boxes vertically
		document.getElementById("cmd").appendChild(nbsp[number]); //Push the 'nbsp' array
		if((number+1)%3==0){
			lineBreak.push(document.createElement('br')); //Create line break horizontally
			document.getElementById("cmd").appendChild(lineBreak[lineBreakCount]); //Push the 'lineBreak' array
			lineBreakCount++;
		}
	}

}
window.onload=function(){
	instantiateCanvas(); //as stated
	painted =[]; //Create painted array
	content =[]; //Create content array
	winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; //The winning combination of tic-tac-toe is predefined
	for (var i=0;i<=8;i++){
		painted[i]=false; //Set all painted to false
		content[i]="";    //and the content is all empty
	}
	addDetectClick(); // Add the event listeners to every canvas.
}
function addDetectClick(){ //This function add the event listeners to every canvas that is created.
		var detectionArray = []
		for (var number=0;number<=canvas.length;number++){
			canvas[number].addEventListener("click",detectClick(number));
				//canvasClicked(number);
			} 
	
}
function detectClick(i){ //Logic of the game over here
	return function(){
		myCanvas = "canvas"+i;
		if(painted[i]==false){ //If the canvas is not painted
			if(turns%2==0){
				//When it is Yellow's turn, it will change the background of canvas to yellow.
				document.getElementById(myCanvas).style.backgroundColor = "yellow";
				content[i] = "Yellow";
				document.getElementById("header").innerHTML= "Blue's turn!"; //and tell it's blue's turn
			}
			else{ //Same goes to blue.
				document.getElementById(myCanvas).style.backgroundColor = "blue";
				content[i] ="Blue";
				document.getElementById("header").innerHTML= "Yellow's turn!";
			}
			turns++;
			painted[i] = true;
			squaresFilled++;
			checkForWinner(content[i]); //Check for winner function
		}
		else
			alert("Space already occupied"); //If already painted, then appear this message
	};
}

function checkForWinner(symbol){
	for (var a = 0; a < winningCombinations.length;a++){
		if(content[winningCombinations[a][0]]==symbol&&content[winningCombinations[a][1]]==symbol&&content[winningCombinations[a][2]]==symbol){
			alert( symbol+ " has won!");
			playAgain();
		}		
	}
	if(checkIfAllPainted()==true){
			alert("Draw!");
			playAgain();
		}
}
function checkIfAllPainted(){
	var checkList = 0;
	for (i=0;i<=canvas.length;i++){
		if (painted[i] == true)
			checkList++;
	}
	if (checkList ==canvas.length)
		return true;
	else
		return false;
}
function playAgain(){

	y = confirm("Play Again?");
	if (y==true){
		location.reload(true);
	}
	else{
		document.getElementById("header").innerHTML = "To restart, press the reload button below";
		alert("Goodbye");
		for (var number=0;number<=canvas.length;number++){
			var el = canvas[number], elClone=el.cloneNode(true);
			el.parentNode.replaceChild(elClone,el);
			}
		
	}
}

function reloadFunction(){
	location.reload(true);
}
/// CODING CHALLENGE 1

/* John and a friend invented a simple game where the player with the highest value of his height (in centimeters) plus five times his age wins (what a silli game:)

1. Create a variables for the heights and ages of two friends and assign them some values.
2. Calculate their scores.
3. Decide who wins and print the winner to the console. Include the score in the string that you output to the console.
Don't forget that there can be a draw (both players with the same score).

4. EXTRA: Add a third player and now decide who wins. Hint: you will need the && operator to take the decision. If you can't solve this one, just watch the solution. It's no problem.
:)
*/

var namePlayerA;
var namePlayerB;
var namePlayerC;

var heightPlayerA;
var heightPlayerB;
var heightPlayerC;

var agePlayerA;
var agePlayerB;
var agePlayerC;

function addThirdPlayer(){
    document.getElementById("playerC").innerHTML = "<h2>Player C</h2><form action='data.php' method='post'><label for='namePlayerC'>Name for player C: </label><input type='Text' maxlength='10' placeholder='Short name' name='namePlayerC' required id='namePlayerC'><br><label for='agePlayerC'>Age for player C: </label><input type='number' max='99' min='8' placeholder='Age' name='agePlayerC' required id='agePlayerC'><br><label for='heightPlayerC'>Height for player C: </label><input type='number' max='250' min='150' placeholder='Height' name='heightPlayerB' required id='heightPlayerC'><br></form>";
}

function playSilliness(){

    namePlayerA = document.getElementById("namePlayerA").value;
    namePlayerB = document.getElementById("namePlayerB").value;
    

    heightPlayerA = document.getElementById("heightPlayerA").value;
    heightPlayerB = document.getElementById("heightPlayerB").value;
    

    agePlayerA = document.getElementById("agePlayerA").value;
    agePlayerB = document.getElementById("agePlayerB").value;
    

    try {
        namePlayerC = document.getElementById("namePlayerC").value;
    } catch (error) {
        console.log("No se pueden tomar el nombre del tercer jugador.");
    }

    try {
        heightPlayerC = document.getElementById("heightPlayerC").value;
    } catch (error) {
        console.log("No se puede tomar la altura");
    }

    try {
        agePlayerC = document.getElementById("agePlayerC").value;
    } catch (error) {
        console.log("No se puede tomar la edad.");
    }

    var scorePlayerA = heightPlayerA + agePlayerA * 5;
    var scorePlayerB = heightPlayerB + agePlayerB * 5;
    var scorePlayerC = heightPlayerC + agePlayerC * 5;
    console.log(scorePlayerC);
    var message;

    if(namePlayerA == ""){
        namePlayerA = "Player A";
    }

    if(namePlayerB == ""){
        namePlayerB = "Player B";
    }
    if(namePlayerC == ""){
        namePlayerC = "Player C";
    }

    if (scorePlayerC > 0) {
        
        if (scorePlayerA > scorePlayerB && scorePlayerA > scorePlayerC) {
            message = namePlayerA + " is the winner";
        } else if (scorePlayerB > scorePlayerA && scorePlayerB > scorePlayerC) {
            message = namePlayerB + " is the winner";
        } else if (scorePlayerC > scorePlayerA && scorePlayerC > scorePlayerB) {
            message = namePlayerC + " is the winner";
        } else if (scorePlayerA == scorePlayerB && scorePlayerB == scorePlayerC) {
            message = "There is no winner. The three are equals.";
        } else if (scorePlayerA == scorePlayerB && scorePlayerA > scorePlayerC ) {
            message = "There is a draw between " + namePlayerA + " and " + namePlayerB + ". <br>What silly game are you going to do now to break the draw?";
        } else if (scorePlayerA == scorePlayerC && scorePlayerA > scorePlayerB) {
            message = "There is a draw between " + namePlayerA + " and " + namePlayerC + ". <br>What silly game are you going to do now to break the draw?";
        } else if (scorePlayerB == scorePlayerC && scorePlayerC > scorePlayerA) {
            message = "There is a draw between " + namePlayerB + " and " + namePlayerC + ". <br>What silly game are you going to do now to break the draw?";
        }

    } else {

        if (scorePlayerA > scorePlayerB) {
            message = namePlayerA + " is the winner";
        } else if (scorePlayerB > scorePlayerA) {
            message = namePlayerB + " is the winner";
        } else {
            message="There is no winner. They are equals.";
        }
    }

    document.getElementById("gameResult").innerHTML = " " + message;
}
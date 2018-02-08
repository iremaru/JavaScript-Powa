/// CODING CHALLENGE 1

/* John and a friend invented a simple game where the player with the highest value of his height (in centimeters) plus five times his age wins (what a silli game:)

1. Create a variables for the heights and ages of two friends and assign them some values.
2. Calculate their scores.
3. Decide who wins and print the winner to the console. Include the score in the string that you output to the console.
Don't forget that there can be a draw (both players with the same score).

4. EXTRA: Add a third player and now decide who wins. Hint: you will need the && operator to take the decision. If you can't solve this one, just watch the solution. It's no problem.
:)
*/

var namePlayerA = document.getElementById("namePlayerA").value;
var namePlayerB = document.getElementById("namePlayerB").value;
console.log("El nombre del jugador A es "+namePlayerA);

var heightPlayerA = document.getElementById("heightPlayerA").value;
console.log("La altura del jugador A es " + heightPlayerA);
var heightPlayerB = document.getElementById("heightPlayerB").value;

var agePlayerA = document.getElementById("agePlayerA").value;
Number(agePlayerA);
var agePlayerB = document.getElementById("agePlayerB").value;

function playSilliness(heightPlayerA, heightPlayerB, agePlayerA, agePlayerB){
    console.log("¡Botón accionado!");
    var scorePlayerA = heightPlayerA + agePlayerA * 5;
    var scorePlayerB = heightPlayerB + agePlayerB * 5;
    var message;

    if (scorePlayerA > scorePlayerB) {
        message = namePlayerA + " is the winner";
        console.log("First player is the winner");
    } else if (scorePlayerB > scorePlayerA) {
        message = namePlayerB + " is the winner";
        console.log("Second player is the winner");
    } else {
        message="There is no winner. They are equals.";
        console.log("No winner");
        console.log("La puntuación de A es " + scorePlayerA);
        console.log("La puntuación de B es " + scorePlayerB);
    }

    document.getElementById("gameResult").innerHTML = " " + message;
}

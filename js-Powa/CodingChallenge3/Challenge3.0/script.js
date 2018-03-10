/* GAME RULES:
 * 1º - The game has 2 players, playing in rounds.
 * 2º - In each turn a player roll a dice as mani times as he whishes. Each result get added to his ROUND score.
 * * 2A - BUT if the player roll a 1, all his ROUND score get lost. After that, it's the next player's turn.
 * 3º The player can choose to 'HOLD', which means that his round score gets added to his GLOBAL score. After taht, it's the next player's turn.
 * 4º The first player to reach 100 points on GLOBAL score wins the game.
 */

var players = [0, 0];
var roundScore = 0;
var turnOf = 0;

console.log("Turno del jugador 0");

function rollDice(player) {
    //Comprobamos que lo ha pulsado el jugador correcto:
    if (player == turnOf) {

        //Obtenemos un número aleatorio del 1 al 6.
        var dice = Math.floor(Math.random() * 5) + 1;
        console.log("El dado dice: " + dice);
        switch (dice) {
        
            case 1:
                //Si la puntuación es 1
                // y le pasamos el testigo al otro jugador.
                passTheToken();
                console.log("Mala suerte. Le pasamos el testigo al otro jugador");
                break;

            default:
                //Si la puntuación es mayor que uno, se la sumamos a su round score.
                roundScore += dice;
                //Y lo actualizamos en la página:
                document.getElementById("current"+turnOf).innerHTML = roundScore;
                console.log("Bien. ¿quieres seguir jugando");
                break;
        }
    } else {
        alert("It' not your turn.");
    }
}

function hold() {
    //Pasamos los puntos del roundScore al GlobalScore.
    players[turnOf] += roundScore;
    document.getElementById("score"+turnOf).innerHTML = players[turnOf];
    //Comprobamos que la puntuación es menor a 100.
    if(players[turnOf] >= 100){
        alert("You win!");
    }else {
        //Pasamos el control al otro jugador.
        passTheToken();
    }
    
}

function passTheToken() {
    //Se borra la puntuación temporal
    roundScore = 0;
    //Se actualiza el dato
    document.getElementById("current"+turnOf).innerHTML = roundScore;
    //Y se pasa el testigo.
    turnOf = turnOf === 0 ? turnOf = 1 : turnOf = 0;
}
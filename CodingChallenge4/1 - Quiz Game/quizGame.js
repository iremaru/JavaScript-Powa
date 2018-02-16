/*
CODING CHALLENGE

--- Let's build a fun quiz game in the console! --- //Not 'in the console' in this case.

1. Build a function constructor called Question to describe a question. A question should include:
    a) question itself.
    b) the answers from which the player can choose teh correct one (choose an adequate data structure here, array, object, etc.)
    c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor.
3. Store them all inside an array.
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct or not (Hint: write another method for this).
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: We learned a special technique to do exactly that).
*/

(function (){
    function $(id){return document.getElementById(id);}

    var questionField = $("question");
    var answerA = $("answer-A");
    var answerB = $("answer-B");
    var answerC = $("answer-C");
    var selectedAnswer;

    function Question(argument, answers, correctAnswer){
        this.argument = argument;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    var questions = [
        question1 = new Question("What colour is the Santiago's White horse?", ["Pinto","Black","White"], 2),
        question2 = new Question("What is the meaning of life?", ["Happines","42","Dark blue"], 1),
        question3 = new Question("What I mean?", ["Peace","Peas","Piece"], 0),
        question4 = new Question("Dark chocolate is...?", ["Sweet","Bitter","White"], 1),
        question5 = new Question("What is at the end to the left?", ["The kitchen","The bedroom","The bathroom"], 2),
    ];

    chosenQuestion = Math.floor(Math.random() * questions.length);
    console.log("La pregunta elegida es: " + chosenQuestion);

    questionField.textContent = questions[chosenQuestion].argument;
    console.log("El enunciado es: " + questions[chosenQuestion].argument);

    answerA.textContent = questions[chosenQuestion].answers[0];
    console.log("La primera opción es: " + questions[chosenQuestion].answers[0]);
    answerB.textContent = questions[chosenQuestion].answers[1];
    console.log("La segunda opción es: " + questions[chosenQuestion].answers[1]);
    answerC.textContent = questions[chosenQuestion].answers[2];
    console.log("La tercera opción es: " + questions[chosenQuestion].answers[2]);

    $("chosenAnswer-A").addEventListener("click", function(){selectedAnswer = 0; return verifyAnswer();});
    $("chosenAnswer-B").addEventListener("click", function(){selectedAnswer = 1; return verifyAnswer();});
    $("chosenAnswer-C").addEventListener("click", function(){selectedAnswer = 2; return verifyAnswer();});

    function verifyAnswer(){
        console.log("La respuesta elegida es: " + selectedAnswer);

        if (questions[chosenQuestion].correctAnswer === selectedAnswer) {
            $("game").innerHTML = "You are right!";
            console.log("Y es correcta");
        } else {
            $("game").innerHTML = "You are wrong!";
            console.log("Pero no es correcta");
        }
    }
})();
function $(id){return document.getElementById(id);}

$("btn-start").addEventListener("click", init);

function init(){
    console.log("Iniciando!");
    var candidateName =$("candidateName").value;
    var candidateJob = $("candidateJob").value;

    console.log("El trabajo elegido es " + candidateJob);
    
    interviewQuestion(candidateJob)(candidateName);
}

function interviewQuestion(job){
    var salutation = "Hello, ";
    var ask = "?";
    var target = $("placeholder");
    return function(name) {
        var nick = name === "" ? "Mr/Mrs." : name + ".";
        switch (job) {
            case "designer":
                console.log("¡Diseñador!");
                target.innerHTML = salutation + nick + "<br>Is true that Comic Sans is THE BEST font in the world" + ask + "<br>A) It's true.<br>B) It isn't false.";
                break;
        
            case "teacher":
                console.log("¡Profesor");
                target.innerHTML = salutation + nick +  "<br>In a test type exam, what is the correct answer" + ask + "<br>A) The larger one.<br>B) The smaller one always going to be the best choice, because the teacher will not write to much for a false answer.";
                break;

            case "gardener":
                console.log("¡gardener!");
                target.innerHTML = salutation + nick + "<br>How did you access to this question" + ask + "<br>Well, it's unrelevant. The correct question is:<br> Do you want to work with me as programer?";
                break;

            case "chef":
                console.log("¡Diseñador!");
                target.innerHTML = salutation + nick + "<br>This is de most important question in the life: pizza with or without pinneaple" + ask;
                break;
            
            case "unemployed":
                console.log("¡Diseñador!");
                target.innerHTML = salutation + nick + "<br>We are looking for young enthusiastic entrepreneurs with fresh ideas and eager to work.<br> These young people must have at least ten years of experience and be fresh out of college.<br>Do you think we will find someone who meets the profile" + ask;
                break;
            default:
                break;
        }
    };
}
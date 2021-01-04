//integer case
if(document.title == "Betamac"){
    document.getElementById("startGame").onclick = function(){
        if(document.getElementById("customRadio1").checked){
            sessionStorage.setItem("maxNum", JSON.stringify(9));
            sessionStorage.setItem("maxNum2", JSON.stringify(9));
            sessionStorage.setItem("minNum", JSON.stringify(1));
        }
        else if(document.getElementById("customRadio2").checked){
            sessionStorage.setItem("maxNum", JSON.stringify(90));
            sessionStorage.setItem("maxNum2", JSON.stringify(9));
            sessionStorage.setItem("minNum", JSON.stringify(1));
        }
        else{
            sessionStorage.setItem("maxNum", JSON.stringify(90));
            sessionStorage.setItem("maxNum2", JSON.stringify(90));
            sessionStorage.setItem("minNum", JSON.stringify(10));
        }
    }
}
else if(document.title == "Game"){

    function randInt(top, bottom){
        return (Math.floor(Math.random()*top) + bottom);
    }

    var maxNum = Number(JSON.parse(sessionStorage.getItem("maxNum")));
    var maxNum2 = Number(JSON.parse(sessionStorage.getItem("maxNum2")));
    var minNum = Number(JSON.parse(sessionStorage.getItem("minNum")));

    var num1 = randInt(maxNum, minNum);
    var num2 = randInt(maxNum2, minNum);

    var operators = ["+", "-", "x", "/"];
    var operator = randInt(4, 1); //each operator corresponds to a number from 0-3

    var positionGap = randInt(3, 0); //each "gap" corresponds to a number from 0-2 (can make this more general, if user chooses how many numbers)

    var questions = []; //questions
    var answers = []; //answers
    var answersEntered = [];

    function newQuestion(){

        operator = randInt(4, 1)-1;
        
        while(true){
            num1 = randInt(maxNum, minNum);
            num2 = randInt(maxNum2, minNum);

            var numA = Math.max(num1, num2); //plain vanilla case: this prevents negatives and decimals
            var numB = Math.min(num1, num2);

            if (numA > 100) {
                numA *= 10 * randInt(1, 9);
            } else if (numB > 100) { 
                numA *= 10 * randInt(1, 9);
            }

            if(operator == 3){ //division
                if(numA%numB==0 && numB != 1 && numA != numB){ //ensuring whole number division and removing uninteresting cases
                    break;
                }
            }
            else if(operator === 1){ //subtraction
                if(numA != 1 && numB != 1 && numA != numB){ //removing uninteresting cases
                    break;
                }
            }
            else{
                if(numA != 1 && numB != 1){ //removing uninteresting cases
                    break;
                }
            }

        }

        questions.push(numA.toString() + " " +operators[operator]+ " " + numB.toString()+" =");

        if(operator === 0){
            answers.push(numA+numB);
        }
        else if(operator === 1){
            answers.push(numA-numB);
        }
        else if(operator === 2){
            answers.push(numA*numB);
        }
        else{
            answers.push(numA/numB);
        }
    }

    var i = 0;
    newQuestion();
    $("h1.numbers").text(questions[i]);

    document.addEventListener("keydown", function changeQuestion(ev){
        if(ev.char === 13 || ev.charCode === 13 || ev.which === 13){
            if(document.getElementById("answer").value != ""){
                answersEntered.push(document.getElementById("answer").value);
                document.getElementById("answer").value = "";
                i++;
                newQuestion(maxNum);
                $("h1.numbers").text(questions[i]);
            }
        }

        sessionStorage.setItem("questions", JSON.stringify(questions));
        sessionStorage.setItem("answers", JSON.stringify(answers));
        sessionStorage.setItem("answersEntered", JSON.stringify(answersEntered));
    });
}
else{
    //results

    function fillResults(){
        var correct = 0;
        var questionsPrev = JSON.parse(sessionStorage.getItem("questions"));
        var answersPrev = JSON.parse(sessionStorage.getItem("answers"));
        var answersEnteredPrev = JSON.parse(sessionStorage.getItem("answersEntered"));
        for(var i = 1; i<questionsPrev.length; i++){
            if(answersPrev[i-1] == answersEnteredPrev[i-1]){
                $('table tbody').append("<tr class = 'table-success'><th scope = 'row'>"+ i + "</th><td>" + questionsPrev[i-1] + "</td><td>" + answersPrev[i-1] + "</td><td>" + answersEnteredPrev[i-1]  + " </td></tr>");
                correct++;
            }
            else{    
                $('table tbody').append("<tr class = 'table-danger'><th scope = 'row'>"+ i + "</th><td>" + questionsPrev[i-1]  + "</td><td>" + answersPrev[i-1] + "</td><td>" + answersEnteredPrev[i-1]  + " </td></tr>");
            }   
        }
        // $('table tbody').append("<tr class = 'table-danger'><th scope = 'row'>"+ i + "</th><td>" + questionsPrev[i-1]  + "</td><td>" + answersPrev[i-1] + "</td><td></td></tr>"); //last question always wrong
        $("h1.results").text("Final Score: " + correct + "/" + eval(questionsPrev.length-1));
        sessionStorage.setItem("questions", "");
        sessionStorage.setItem("answers", "");
        sessionStorage.setItem("answersEntered", "");
    }

    fillResults();    
}


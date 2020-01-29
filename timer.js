//timer
function startTimer(duration, display) {
    var start = Date.now(),
        seconds;
    function timer() {
        seconds = duration - (((Date.now() - start) / 1000) | 0);
        if(seconds > 0){
            display.textContent = seconds;
        }
        else{
            display.textContent = "GAME OVER";
            window.location.href = "results.html";
        }
    };
    timer();
    setInterval(timer, 1000);
}

if(document.title == "Game"){
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    sessionStorage.setItem("gameDuration", JSON.stringify(urlParams.get("gameDuration")));
    startTimer(Number(JSON.parse(sessionStorage.getItem("gameDuration"))), document.querySelector('#time'));
}

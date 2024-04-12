// if (window.localStorage.getItem("played_before")) {
//     //They've played before
// } else {
//     window.localStorage.setItem("played_before", true);
//     window.localStorage.setItem("highscore", "0");
// }

var score=1;

// open request to server
var xhr=new XMLHttpRequest();


var highscore = 0;

xhr.onreadystatechange = function (){
    if (this.status == 200 && this.readyState == 4) {
        highscore = this.responseText;
        console.log(highscore);
    }
}

xhr.open("GET","https://FlappyBird-Server.chezcoder.repl.co");
xhr.send();

setInterval(function(){
    if (!waiting && !dead) {
        score++;
    }


    if (score>highscore) {
        window.localStorage.setItem("highscore", JSON.stringify(score));
    }

    $("#score_txt").text(score);
    $("#highscore").text(window.localStorage.getItem("highscore"));
},2000);
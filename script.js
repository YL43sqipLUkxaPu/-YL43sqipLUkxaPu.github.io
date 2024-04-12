var y=50;
var waiting=true;
var dead=false;

class Bird {
    move () {
        if (y<89&&!waiting) {
            y+=0.05;//mimic gravity
        }
        $("#bird_container").html("");
        $("#bird_container").append("<div style='top:"+y+"%' id='bird'></div>");
    }

    up () {
        waiting=false;
        for (var e=0; e<=3;e++) {
            setTimeout(function(){
                if (y>0) {
                    y-=3.5;
                }
            },e*30);

        }
    }
}

var bird=new Bird();
setInterval(bird.move);
setInterval(function(){
    for (var i=0; i<=$(".pipe").length-1; i++) {
        if (collision($("#bird")[0], $(".pipe")[i])||y>=70) {
            dead=true;
            $("#gameover").show();
        }
    }
});

$("#game").on("click", bird.up);

//Handle when any key is pressed
function checkKey(evt) {
    var keypressed=evt.originalEvent.code;
    
    if (keypressed=="Space") {
        bird.up();
    }
}

$(document).keydown(checkKey);


var pipe_num=0;

class Pipes {
    get_pipe_location() {
        var pipe1_pos=Math.random()*400;
        var pipe2_pos=700-(pipe1_pos+250);
        var pipe2_height=pipe1_pos+250;
        return [pipe1_pos, pipe2_pos, pipe2_height];
    }
    make_pipe (pipe_pos) {
        pipe_num+=1;
        $("body").append("<div class='pipe pipe1'id="+pipe_num+"></div>");
        $("#"+pipe_num).css({"height":pipe_pos[0]+"px"});
        $("#"+pipe_num).animate({"left":"-100px"}, 7000);

        pipe_num+=1;
        $("body").append("<div class='pipe pipe2' id="+pipe_num+"></div>");
        $("#"+pipe_num).css({"top":pipe_pos[2]+"px"});
        $("#"+pipe_num).css({"height":pipe_pos[1]+"px"});
        $("#"+pipe_num).animate({"left":"-100px"}, 7000);
    }
}

var pipes=new Pipes();
setInterval(function(){
    if (!waiting) {
        pipes.make_pipe(pipes.get_pipe_location());
    }
}, 5000);
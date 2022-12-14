$(()=> {
    var fail = false;
    var start = false;
    var finish = false;
    const startPos = $("#start").position();
    const dimentionWidth = $("#start").width()/2;
    const dimentionHeight = $("#start").height()/2;
    $("#start").click(function(){
        fail = false;
        start = true;
        finish = false;
        resetMaze();
        showNotification("Maze start!")

        
        $("#maze").mousemove(function(e){
            let maze = $(this).position();
            console.log(maze.left);
            if(fail || finish || $("#start").position().left < 0){
                $("#start").offset({top: maze.top + startPos.top ,left: maze.left + startPos.left})
                return;
            }
            $("#start").offset({top: maze.top + (e.pageY-maze.top) - dimentionHeight,left:  maze.left+(e.pageX-maze.left) - dimentionWidth})
            
        })
       
    })

    $(".boundary").mouseenter(function(){
        if(start && !fail){
            $(".boundary").css("backgroundColor","red");
            fail = true;
            showNotification("Sorry, you lose! Click on the\"S\" to restart.","error")
        }
        
    })

    function resetMaze(){
        $(".boundary").css("backgroundColor","#eeeeee");
    }

    function showNotification(notifaction,type){
        if(type === "error"){
            $("#status").css({color: "red"});
        }
        else if(type === "win"){
            $("#status").css({color: "green"});
        }
        else{
            $("#status").css({color: "black"});
        }
        $("#status").html(notifaction);
    }

    $("#end").mouseenter(function(){
        if(!fail && start){
            finish = true;
            showNotification("Congratulations, you WIN! Click on the \"S\" to play again.","win");
            $("#start").offset({top: maze.top + startPos.top ,left: maze.left + startPos.left})
        }
        else if(!start){
            //return;
        }
        else{
            showNotification("Sorry, you lose! Click on the\"S\" to restart.","error")
        }
        start = false;
    })

    $("#maze").mouseleave(function(){
        if(start){
            
            $(".boundary").css("backgroundColor","red");
            showNotification("Sorry, you lose! Click on the\"S\" to restart.","error")
        }
        fail = true;
        start = false;
        
    })

})
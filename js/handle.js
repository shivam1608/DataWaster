//console.log("I am Loaded!");
/*
   @Author Shivam1608
   Discord : Shivam#8010
*/
/*________________ Config ______________*/


var chunks = 1024;
var threads = 1;
var dataWasted = 0;
var stopAfter = 0;
var running = false;
var time = 0;
var instantTime = 0 ;
var loader = 0;

var threadsArr = [];

/*______________________________________*/

/*_______________ Functions ____________*/
// Variables 
var element = document.getElementById("startBtn");
var timeObject = document.getElementById("timeRunningText");
var speedObject = document.getElementById("averageSpeedText");
var timer = undefined;

// Start Function

function start(){
    for(var i=0;i<threads;i++){
        var temp = setInterval(()=>{
            if(running){

                if(stopAfter != 0 && dataWasted/1024>=stopAfter){
                    stop();
                }

                instantTime = Date.now();
                var t = $.get("https://i.ibb.co/qJPr4nz/data-waster-hosting.png?"+ Math.random() , (res)=>{
                    if(t.status == "200"){
                        dataWasted += chunks;
                        document.getElementById("dataWatsedText").innerHTML = parseInt(dataWasted/1024)+" MB";
                        if(loader % threads == 0){
                            instantTime = Date.now() - instantTime;
                            speedObject.innerHTML = parseInt((chunks) / (instantTime / 1000)) * 8 + " Kbps"
                        }
                    }
                });
                loader += 1;

            }
        },3000);
    threadsArr.push(temp);
}
}

// Stop Function 

function stop(){
    running = false;
    element.classList.remove("btn-danger");
    element.classList.add("btn-success");
    element.innerHTML = "Start Wasting";
    for(var i=0;i<threadsArr.length;i++){
        clearInterval(threadsArr[i]);
    }
    clearInterval(timer);
}


function timeRunningUpdate(){
    timer = setInterval(()=>{
        time += 1;
        if(time<60){
            timeObject.innerHTML = time+" sec";
        }else if(time < 3600){
            timeObject.innerHTML = parseInt(time/60)+" min "+time%60+" sec";
        }else{
            timeObject.innerHTML = parseInt(time / 3600) + " hrs " + parseInt((time - parseInt(time / 3600)*3600)/60) + " min " + time % 60 + " sec";
        }
    },1000);
}

/*______________________________________*/


$("#startBtn").click(()=>{
    // debug
    //console.log("Start Button was Clicked");

    var rangeBar = document.getElementById("threadsRange");
    var stopafter = document.getElementById("stopafter");

    threads = parseInt(rangeBar.value)+1;

    if(!isNaN(stopafter.value)){
        if(stopafter.value != "0"){
            stopAfter = dataWasted + parseInt(stopafter.value);
        }else{
            stopAfter = 0;
        }
    }

    if(running){
        stop();
    }else{
        running = true;
        element.classList.remove("btn-success");
        element.classList.add("btn-danger");
        element.innerHTML = "Stop Wasting";
        start();
        timeRunningUpdate();
    }

});

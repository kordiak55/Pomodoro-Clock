let breakControl = new controlButton(5, '#breakTimeSet');
let workControl = new controlButton(25, '#workTimeSet');
let timerToggle = false;
let currentTimer;
let timer;
let sound = new Audio('https://s3.amazonaws.com/codecampkordiak/sounds/Music_Box.mp3');
let started = false;

function startTimer(){

    if(timerToggle){
        //break time
        
        currentTimer = breakControl.value();
        timerToggle = false;
    } else {
        //work time
        currentTimer = workControl.value();
        timerToggle = true;
    }
    //milliseconds to seconds .001/1

    //switch for skipping, moving to next break or work cycle.
    if(timer){

        clearInterval(timer); //Set interval is asynchronus, need to clear old interval before restart.
    
    }

    const milli = 1000;
    const seconds = 60;

    let milliSeconds = milli * seconds * currentTimer;

    let startTimeNow = new Date(Date.now());

    let timerAlarm = new Date(startTimeNow.getTime() + milliSeconds);

    timer = setInterval(()=>{
        
        //now
        let timeNow = new Date(Date.now());
        
        //future - now = mili left
        let timeLeft = new Date(timerAlarm.getTime() - timeNow);
        
        if(timeLeft <=1000){
            
            console.log('done');
            sound.play();
            startTimer();
        }

        let timeClock = timeLeft.getMinutes() + ':' + timeLeft.getSeconds();
        $('#countDownTimer').text(timeClock);
    
    }, 250);
}

$("document").ready(function(){

    $("#workTimeSet").text(workControl.value());
    $("#breakTimeSet").text(breakControl.value());
    $("#countDownTimer").text(workControl.formattedValue());

     $("#btnWorkTimeUp").click(()=>{
         workControl.increment();
         if(!started){
            $("#countDownTimer").text(workControl.formattedValue());
         }
     } );

     $("#btnWorkTimeDown").click(()=>{
        workControl.decrement();
        if(!started){
            $("#countDownTimer").text(workControl.formattedValue());
        }
    } );

    $("#btnBreakTimeUp").click(()=>{
        breakControl.increment();
    } );

    $("#btnBreakTimeDown").click(()=>{
       breakControl.decrement();
   } );

    $("#btnStart").click(()=>{
        if(started){
            timerToggle = false;
            started = false;
            clearInterval(timer);
            timer = null;
            $("#countDownTimer").text(workControl.formattedValue());
            $("#btnStart").text('Start');

        } else {
            startTimer();
            $("#btnStart").text('Reset');
            started = true;
        }
        
    } );

    $("btnPause").click(()=>{

    });

    $("#btnSkip").click(()=>{
        if(started){
            startTimer();
            sound.play();
        }
    } );

}); 


function controlButton(defaultValue, controlDisplayId){

    let val = defaultValue;

    this.increment = ()=>{
        if(!timer){
        val++;
        $(controlDisplayId).text(val);
        }
    }

    this.decrement = ()=>{
        if(!timer){
        if(val<=1){
            val = 1;
        } else { val--;}
        $(controlDisplayId).text(val);
    }
    }

    this.value = ()=>{
        return val;
    }

    this.formattedValue = ()=>{
        return val + ":00";
    }

}

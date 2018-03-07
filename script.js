function runner(){

    //need to define a time, say 5 minutes
    //then need to set current time
    //set future time
    //calc now - then to get remaining time.

    //milliseconds to seconds .001/1
    let milli = 1000;
    let seconds = 60;
    let minutes = .25;

    let milliTimer = milli * seconds * minutes;

    
    let timeNow = new Date(Date.now());

    let timerAlarm = new Date(timeNow.getTime() + milliTimer);

    let timer = setInterval(()=>{
        let timeNow = new Date(Date.now());

        let timeLeft = new Date(timerAlarm.getTime() - timeNow);
        
        if(timeLeft <=10){
            clearInterval(timer);
            console.log('done');
        }

        console.log(timeLeft.getMinutes(), ':', timeLeft.getSeconds());
        $('#timer').text(timeLeft);
    
    }, 1000);
}

$("document").ready(function(){



    //runner();

}); 



function controlButton(defaultValue){

    let val = defaultValue;

    this.increment = ()=>{
        val++;
    }

    this.decrement = ()=>{
        val--;
    }

    this.value = ()=>{
        return val;
    }

}

let minSetter = new controlButton(5);
minSetter.increment();
minSetter.increment();
console.log(minSetter.value());
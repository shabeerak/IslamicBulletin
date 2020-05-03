var PROG_STATES = {
    OVER      : 'over',
    RUNNING   : 'running',
    SCHEDULED : 'over'
};

function loadScript(){
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                onPageLoad();
            }
        };
    } else {  //Others
        script.onload = function(){
            onPageLoad();
        };
    }

    script.src = 'config_' + new Date().getUTCFullYear() + '_' + new Date().getUTCMonth() + '_' + new Date().getUTCDate() + '.js';
    document.getElementsByTagName("head")[0].appendChild(script);
}


function onPageLoad() {
    var hasActiveProgram = false;
    for (var program in programs) {
        if(initiateProgram(programs[program])) {
            hasActiveProgram = true;
        };
    }
    if(!hasActiveProgram && dailyDefault) {
        document.getElementById('frmVideo1').src = dailyDefault.link;
    }
}


function initiateProgram(program) {

    var programTime      = program.utcTime; //Program start time In GMT
    var programDuration  = program.duration;//Program Duration in Minutes
    var programLink      = program.link;

    var programTimeArray = programTime.split(":");
    var programHour      = +programTimeArray[0];
    var programMin       = +programTimeArray[1] || 0;

    var currentUTCHour   = new Date().getUTCHours();
    var currentUTCMin    = new Date().getUTCMinutes();

    var programStartTime = (programHour    * 60) + programMin;
    var programEndTime   = (programHour    * 60) + programMin +  programDuration;
    var currentTime      = (currentUTCHour * 60) + currentUTCMin;

    //Program is over, do nothing
    if(currentTime >= programEndTime && !program.state) {
        program.state = PROG_STATES.OVER;
        console.log(program.name + ' is over');
        // document.getElementById('frmVideo1').src = '';
        return false;
    }

    //Program currently running
    if(currentTime >= programStartTime && !program.state) {
        program.state = PROG_STATES.RUNNING;
        console.log(program.name + ' is currently running');
        // Load immediately
        document.getElementById('frmVideo1').src = programLink;
        return true;
    }

    // Initiate program at time
    if(!program.state) {
        var remainingTimeToStart = programStartTime - currentTime;
        // console.log(program.name + ' is not yet started');
        setTimeout(function() {
            // console.log(program.name + ' is starting now!');
            document.getElementById('frmVideo1').src = programLink;
        }, remainingTimeToStart * 60000);
        return false;
    }
}


// new Date().toUTCString()              => Date in UTC
// Date.parse(new Date().toUTCString())  => UTC to timestamp
// new Date(1588539798000).toUTCString() => timestamp back to UTC
// Config name => 'config_' + new Date().getUTCFullYear() + '_' + new Date().getUTCMonth() + '_' + new Date().getUTCDate() + '.js'

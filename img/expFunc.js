var startTime = 0;
var endTime = 0;
var promptElapsedTime=0;
var questionElapsedTime=0;
var spaceElapsedTime=0;
var answerElapsedTime=0;
var trialNum = 0;
var experiment=0;
var response;
var timer;
var timer1;
var submitTime;
var skipAgain=false;

var setTrial= function (num){
  trialNum = num;
}

var setExperiment = function (num){
  experiment= num;
}

function timeStart() {
  startTime = new Date().getTime();
}

function timeEnd() {
  endTime = new Date().getTime();

}

var elapsedPrompt = function () {
  timeEnd();
  promptElapsedTime = (endTime - startTime)/1000;
  var audio = new Audio('beep.mp3');
  audio.play();
  console.log("prompt time: " + promptElapsedTime);
  //alert("prompt time: " + promptElapsedTime);
  endtrial();
  //save_exp(question, trialNum, 'space', promptElapsedTime);
}

var elapsedQuestion1 = function () { //HOW LONG QUESTION IS
  timeEnd();
  questionElapsedTime1 = (endTime - startTime);
  console.log("first question elapsed time: " + (questionElapsedTime1/1000));

  responsiveVoice.speak( "Press the space bar when you are ready to answer.",
                        "UK English Female",{ onend: endtrialAnon});
}

var elapsedQuestion = function () {
  timeEnd();
  questionElapsedTime = (endTime - startTime)/1000;
  timeStart();
  console.log("question elapsed time: " + questionElapsedTime); // question end leads to answer timer start

//save_exp(question, trialNum, 'space', promptElapsedTime);
}
function elapsedSpaceResponse () {
  timeEnd();
  spaceElapsedTime = (endTime - startTime)/1000 + (questionElapsedTime1/1000);
  console.log("space response time: " + spaceElapsedTime);
  //save_exp(question, trialNum, 'space', promptElapsedTime);
}

function endtrial() {
  console.log("finish trial called" );
  jsPsych.finishTrial();
}
var endtrialAnon = function (){
	console.log("finish trial anon called" );
	jsPsych.finishTrial();
}
var skipAnswer = function () { //skips answer twice
  //jsPsych.finishTrial();
  skipAgain=true;
  console.log('skipping twice');
  $(document).unbind("keyup", spaceCheck);
  jsPsych.finishTrial();
}

var skipAnswerOnce = function () { //skips answer once
	$(document).unbind("keyup", spaceCheck);
	console.log('skipping once');
	jsPsych.finishTrial();

}

/*var skipAnswerBlack = function () { //skips answer twice
  //jsPsych.finishTrial();
  skipAgain=true;
  changeBackground('white');
  console.log('skipping twice');
  jsPsych.finishTrial();
}*/

var removeQTimer = function (){
  clearTimeout(timer);
  elapsedSpaceResponse();
  console.log('removeqtimer called ');
  timer = "";
}

var removeQTimer1 = function (){
  clearTimeout(timer);
  console.log('removeqtimer1 called ');
  timer = "";
}

function changeBackground(color) { //change background color
   document.body.style.background = color;
}
/**** timer configurations for instruction prompt to make all prompts
 *    consistent in timing
 ***/
function stimAudio() {
	changeBackground('white');
    setTimeout(elapsedPrompt,10000);
    responsiveVoice.speak("please look at the image and memorize the details.....wait for more instructions after the beep",
                        "UK English Female",{onstart: timeStart});
	//alert('experiment: ' + experiment+ " trial num: " + trialNum);
	console.log('experiment: ' + experiment+ " trial num: " + trialNum);
}

function questionAudioFirst(){
	setTimeout(function(){
		var x = document.getElementsByClassName('stim-image');
		for (var i =0; i< x.length; i++)
		{

			x[i].style.display="block";
		}
    setTimeout(function(){
      if (trialNum===0){
  			responsiveVoice.speak("Please look at the image on the screen",
  							"UK English Female",{onstart: timeStart, onend: questionSelector});
  							console.log('experiment: ' + experiment+ " trial num: " + trialNum);
  		}
  		else if(trialNum===1){
  			responsiveVoice.speak("please close your eyes and mentally and visualize the image ",
  							"UK English Female",{onstart: timeStart, onend: questionSelector});
                console.log('experiment: ' + experiment+ " trial num: " + trialNum);
  		}
  		else if(trialNum===2){
  			responsiveVoice.speak("please visualize the image as if it was on the screen",
  							"UK English Female",{onstart: timeStart, onend: questionSelector});
                console.log('experiment: ' + experiment+ " trial num: " + trialNum);
  		}



    }, 3000);


	},500);

}
function questionSelector(){
  if(experiment==1 || experiment==2){
    questionCrosses();
  }
  else if(experiment===3 || experiment===4){
    questionAudioArrows();
  }
  else if(experiment===5){
    q5dummy();
  }

}
function questionCrosses(){
	responsiveVoice.speak("Is the blue cross closer to the red or green cross?",
                          "UK English Female",{onstart: timeStart, onend: elapsedQuestion1});
}

function questionAudioArrows(){
  responsiveVoice.speak("Which way would you move the red cross to bring it closer to the blue cross?",
                        "UK English Female",{onstart: timeStart, onend: elapsedQuestion1});
}

function q5dummy(){
  responsiveVoice.speak("How many knobs are on the item of furniture?",
                        "UK English Female",{onstart: timeStart, onend: elapsedQuestion1});
}

/******** space bar function *******/
function questionAudio(){
	//timer=null;
  if (trialNum===0)
  {
    console.log('a');
    timer = setTimeout(skipAnswer, 10000 - questionElapsedTime1);
    timeStart();
    /*responsiveVoice.speak("Is the blue cross closer to the red or green cross?",
                          "UK English Female",{onstart: timeStart, onend: elapsedQuestion});*/
  }

  else if (trialNum===1)
  {
    console.log('b');
    timer = setTimeout(skipAnswer, 10000 - questionElapsedTime1);
    timeStart();
    /*responsiveVoice.speak("Is the blue cross closer to the red or green cross? Press the space bar when you are ready to answer.",
                          "UK English Female",{onstart: timeStart, onend: elapsedQuestion});*/
  }
  else if (trialNum===2)
  {
    console.log('c');
    timer = setTimeout(skipAnswer, 10000 - questionElapsedTime1);
    timeStart();
    /*responsiveVoice.speak("Is the blue cross closer to the red or green cross?",
                          "UK English Female",{onstart: timeStart, onend: elapsedQuestion});*/
  }
}

function q1Answers(){
timer = setTimeout (skipAnswerOnce, 2000);
/*  if (trialNum===0 && skipAgain===false)
  {
    timer = setTimeout (skipAnswerOnce, 5000);
  }
  else if (trialNum===1 && skipAgain===false)
  {
    timer = setTimeout (skipAnswerOnce, 5000);
  }
  else if (trialNum===2 && skipAgain===false)
  {
    timer = setTimeout (skipAnswerOnce, 5000);
  }*/
}

function submitControllerCross(resp){
	console.log('ans clicked: ' + resp );
    if (resp===1)
      response="blue";
    else if (resp ===2 )
      response="green";
    else if (resp === 3)
      response="red";
    console.log(response);
	var ansElem = document.getElementsByClassName('resize_fit_center');

	for (var i =0; i< ansElem.length; i++)
		ansElem[i].onclick=null;

  endtrial();
    //save_exp(experiment, trialNum, response, '');
}

function q2AsubmitControllerCross(resp){
  console.log('ans clicked: ' + resp );
    if (resp===1)
      response="left";
    else if (resp ===2 )
      response="up";
    else if (resp === 3)
      response="down";
    else if (resp === 4)
      response="right";

    console.log(response);
  var ansElem = document.getElementsByClassName('resize_fit_center');

  for (var i =0; i< ansElem.length; i++)
    ansElem[i].onclick=null;

  endtrial();
    //save_exp(experiment, trialNum, response, '');
}

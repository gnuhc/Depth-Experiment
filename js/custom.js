
var currentCondNum=0;
var currExpNum=1;
var imageString = "";

var startTime = 0;
var endTime = 0;
var questionElapsedTime = 0;

var promptElapsedTime=0;
var threeSec=0;
var timer;
var response;

////////////////////////////////////////////////////////////////////////////////
    var conditionOrder=[2,1,3]; //order of conditions
    conditionOrder = shuffle(conditionOrder);
    var conditionOrderArray = [];

    //Below for loops create an array of conditions based on condition order
    //For instance, [2,2,1,1,3,3]
    for(var i=0;i<2;i++){
      conditionOrderArray[i] = conditionOrder[0];
    }
    for(var i=2;i<4;i++){
      conditionOrderArray[i] = conditionOrder[1];
    }
    for(var i=4;i<6;i++){
      conditionOrderArray[i] = conditionOrder[2];
    }


    var fullOrder = [1,2,3,4,5,6]; //holds all trials
    fullOrder = shuffle(fullOrder);

    var regOrder = fullOrder.slice(0, 2); //keeps track of perception exps
    var blackOrder = fullOrder.slice(2, 4); //keeps track of black exps
    var whiteOrder = fullOrder.slice(4, 6); //keeps track of white exps

    var condArrayCount = 0; //keeps track of current condition
    var fullArrayCount = 0; //keeps track of current experiment

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
////////////////////////////////////////////////////////////////////////////////

//Increments index counts for both condition array and full array
var incCounts = function (){
  condArrayCount++;
  fullArrayCount++;
}

//Sets current condition
var setCondition = function (num){
  currentCondNum = num;
}

//Sets current experiment
var setExperiment = function (num){
  currExpNum = num;
}

function timeStart() {
  startTime = new Date().getTime();
}

function timeEnd() {
  endTime = new Date().getTime();
}

function incTrialNum(){
  currTrialNum++;
}

function changeBackground(color) { //change background color
   document.body.style.background = color;
}

var elapsedPrompt = function () {
  timeEnd();
  promptElapsedTime = (endTime - startTime)/1000;
  var audio = new Audio('beep.mp3');
  audio.play();
  console.log("prompt time: " + promptElapsedTime);

  var x = document.getElementsByClassName('image-content');
  for (var i =0; i< x.length; i++)
  {
    x[i].style.display="none";
  }

  setTimeout(function(){

    if(currentCondNum === 1){
      document.getElementById("loadAnswer").innerHTML=
      '<div class="image-content">' +
        ' <img class="stim-image" src="' + imageString + '" onload="questionAudioFirst();">' +
      '</div>';
    }else if(currentCondNum === 2){
      document.getElementById("loadAnswer").innerHTML=
      '<div class="image-content">' +
        '<img src="img/black.JPG" onload="questionAudioFirst();">' +
      '</div>';
      changeBackground('black');
    }else if(currentCondNum === 3){
      document.getElementById("loadAnswer").innerHTML=
      '<div class="image-content">' +
        '<img class="stim-image" src="img/blank.jpg" onload="questionAudioFirst();">' +
      '</div>';
    }
  },500);
}

var elapsedQuestion = function () { //HOW LONG QUESTION IS
  timeEnd();
  questionElapsedTime = (endTime - startTime);
  console.log("question elapsed time: " + (questionElapsedTime/1000));
  console.log('elapsed question : ' + questionElapsedTime/1000);
  questionAudio();
}


var skipAnswer = function () { //skips answer twice
  console.log('skipping');
  $(document).unbind("keyup", spaceCheck);
  jsPsych.finishTrial();
}

var threeSecTime = function (){
  timeEnd();
  threeSec = (endTime - startTime)/1000;
  console.log("3 second time: " + threeSec);
  questionSelector();
}

function twoSecTimeout(){
  console.log("two to answer question" );
  timer = setTimeout (endtrialAnonAnsw, 2000);
}


var endtrialAnonAnsw = function (){
  var x = document.getElementsByClassName('answer');
  for (var i=0;i< x.length;i++){
	  x[i].onclick=null;
  }
  console.log("finish trial anon called from two sec timeout for answer" );
  jsPsych.finishTrial();
}

var endtrialAnon = function (){
  console.log("finish trial anon called" );
  jsPsych.finishTrial();
}

function stimAudio() {
  setTimeout(elapsedPrompt,10000);
  responsiveVoice.speak("Please look at the image and memorize the details.....wait for more instructions after the beep",
                        "UK English Female",{onstart: timeStart, });
  console.log("condition: " + conditionOrderArray[condArrayCount] +
              " experiment: " + fullOrder[fullArrayCount]);
}

function questionAudioFirst(){

    var x = document.getElementsByClassName('stim-image');
    for (var i =0; i< x.length; i++)
    {
      x[i].style.display="block";
    }
   timeStart();
   setTimeout(threeSecTime, 3000);
   
      if (currentCondNum===1){
        responsiveVoice.speak("Please look at the image on the screen",
                "UK English Female",{onstart: timeStart});
        console.log("condition: " + conditionOrderArray[condArrayCount] +
                    " experiment: " + fullOrder[fullArrayCount]);
      }
      else if(currentCondNum===2){
        responsiveVoice.speak("please close your eyes mentally and visualize the image ",
                "UK English Female",{onstart: timeStart});
        console.log("condition: " + conditionOrderArray[condArrayCount] +
                    " experiment: " + fullOrder[fullArrayCount]);      
      }
      else if(currentCondNum===3){
        responsiveVoice.speak("please visualize the image as if it was on the screen",
                "UK English Female",{onstart: timeStart});
        console.log("condition: " + conditionOrderArray[condArrayCount] +
                    " experiment: " + fullOrder[fullArrayCount]);      
      }
}

function questionSelector(){
	
  if(fullOrder[fullArrayCount]==1 || fullOrder[fullArrayCount]==2 || fullOrder[fullArrayCount]==6){
    questionCrosses();
    console.log("question crosses");
  }
  else if(fullOrder[fullArrayCount]===3 || fullOrder[fullArrayCount]===4){
    questionAudioArrows();
    console.log("question arrows");
  }
  else if(fullOrder[fullArrayCount]===5){
    q5dummy();
    console.log("question dummy");
  }
}

function questionCrosses(){
  responsiveVoice.speak("Is the blue cross closer to the red or green cross?",
                          "UK English Female",{onstart: timeStart, onend: elapsedQuestion});
}

function questionAudioArrows(){
  responsiveVoice.speak("Which way would you move the red cross to bring it closer to the blue cross?",
                        "UK English Female",{onstart: timeStart, onend: elapsedQuestion});
}

function q5dummy(){
  responsiveVoice.speak("How many knobs are on the item of furniture?",
                        "UK English Female",{onstart: timeStart, onend: elapsedQuestion});
}

function spaceCheck(e){
  if(e.keyCode == 32){
      $(document).unbind("keyup", spaceCheck);
      clearTimeout(timer);
      console.log('spacebar pressed');
      responsiveVoice.cancel();
      answerSelector();
  }
}

function questionAudio(){
	console.log('inside questionaudio elapsed time: ' +questionElapsedTime);
    timer = setTimeout(skipAnswer, 10000 - questionElapsedTime);
    $(document).bind("keyup", spaceCheck);
	
    responsiveVoice.speak( "Press the space bar when you are ready to answer.",
                        "UK English Female");
    timeStart();
}

function answerSelector(){
  if(fullOrder[fullArrayCount]==1 || fullOrder[fullArrayCount]==2 || fullOrder[fullArrayCount]==6){
	console.log('cross answers loading');
    document.getElementById("loadAnswer").innerHTML=
      '<div class="container">'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/blue_cross.jpg" onclick="submitControllerCross(1);"></div>'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/green_cross.jpg" onclick="submitControllerCross(2);"></div>'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/Red_Cross.svg.png" onclick="submitControllerCross(3);" onload="twoSecTimeout();"></div>'+
      '</div>';
  }
  else if(fullOrder[fullArrayCount]===3 || fullOrder[fullArrayCount]===4){
    document.getElementById("loadAnswer").innerHTML=
      '<div class="container">'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/left.jpg" onclick="submitControllerArrows(1);"></div>'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/up.jpg" onclick="submitControllerArrows(2);"></div>'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/down.jpg" onclick="submitControllerArrows(3);"></div>' +
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/right.jpg" onclick="submitControllerArrows(4);" onload="twoSecTimeout();"></div>'+
      '</div>';
  }
  else if(fullOrder[fullArrayCount]===5){
    document.getElementById("loadAnswer").innerHTML=
      '<div class="container">'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/one.png" onclick="submitControllerDummy(1);"></div>'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/two.png" onclick="submitControllerDummy(2);"></div>'+
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/three.png" onclick="submitControllerDummy(3);"></div>' +
      '<div class="image-holder"><img class="resize_fit_center answer" src="img/four.png" onclick="submitControllerDummy(4);" onload="twoSecTimeout();"></div>'+
      '</div>';
  }
}

function submitControllerCross(resp){
	clearTimeout(timer);
	
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

  jsPsych.finishTrial();
    //save_exp(experiment, trialNum, response, '');
}

function submitControllerArrows(resp){
	clearTimeout(timer);
	
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

  jsPsych.finishTrial();
    //save_exp(experiment, trialNum, response, '');
}

function submitControllerDummy(resp){
	clearTimeout(timer);
  console.log('ans clicked: ' + resp );
    if (resp===1)
      response="one";
    else if (resp ===2 )
      response="two";
    else if (resp === 3)
      response="three";
    else if (resp === 4)
      response="four";

    console.log(response);
  var ansElem = document.getElementsByClassName('resize_fit_center');

  for (var i =0; i< ansElem.length; i++)
    ansElem[i].onclick=null;

  jsPsych.finishTrial();
    //save_exp(experiment, trialNum, response, '');
}
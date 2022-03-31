let currentQuestion = 0;
let right = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/buh.mp3');
let counter_wrong =1;

function init() {
    document.getElementById('amountquestions').innerHTML = `${questions.length}`
    showquestion();
}


function showquestion() {
    // updateProgressBar()
    document.getElementById('current').innerHTML = `${currentQuestion + 1} `
    let question = questions[currentQuestion];
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(place) {
    let question = questions[currentQuestion];
    let lastchar = (place.charAt(place.length - 1));  //place.slice(-1)//

    let rightanswer = `answer_${question['right_answer']}`;
    if (lastchar == question['right_answer']) {
        document.getElementById(place).classList.add('bg-success');
        document.getElementById('hide').classList.remove('d-none');
        confetti.start();
        right++;
        updateProgressBarright(right);
        AUDIO_SUCCESS.play();
        setTimeout(function () {
            confetti.stop();
        }, 2000);
    } else {
        AUDIO_FAIL.play();
        updateProgressBarwrong();
        document.getElementById('hide').classList.remove('d-none')
        document.getElementById(place).classList.add('bg-danger');
        document.getElementById(rightanswer).classList.add('bg-success');
    }

    document.getElementById('nextquestion').disabled = false;
}

function nextQuestion() {
    document.getElementById('hide').classList.add('d-none')
    if (gameIsOver()) {
        showEndscreen()
    }
    else {
        currentQuestion++;
        showquestion();
        document.getElementById('nextquestion').disabled = true
        resetButton();
    }
}

function gameIsOver() {
    return currentQuestion+1 >= questions.length;
}


function resetButton() {
    document.getElementById('answer_1').classList.remove('bg-success');
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_4').classList.remove('bg-success');
    document.getElementById('answer_4').classList.remove('bg-danger');

}

function newGame() {
    currentQuestion = 0;
    right = 0;
    init();
    resetButton();
    resetprogress();
    confetti.stop();
    document.getElementById('bodyquestion').style = '';
    document.getElementById('end').classList.add('d-none');
    document.getElementById('progress-bar').classList.remove('d-none');
    document.getElementById('replay').classList.add('d-none');
    document.getElementById('header-img').src = 'img/cat-g4c864d6d5_640.jpg';

}

function showEndscreen() {
    document.getElementById('bodyquestion').style = 'display: none  ';
    document.getElementById('end').classList.remove('d-none');
    document.getElementById('sumquestion').innerHTML = `${questions.length}`;
    confetti.start();
    document.getElementById('rightanswered').innerHTML = `${right}`;
    document.getElementById('header-img').src = 'img/trophy-gd0f66ce91_640.png';
    document.getElementById('progress-bar').classList.add('d-none');
    document.getElementById('replay').classList.remove('d-none');
}

function updateProgressBarwrong() {
    let percent = ( counter_wrong / questions.length) * 100;       //Math.round(percent*100)
    let progress = document.getElementById('progress_red');
    progress.style = `width: ${percent}%;`;
    progress.innerHTML = `${percent.toFixed(0)} %`;
    counter_wrong++;
}

function updateProgressBarright(counter_right) {
    let percent = ( counter_right / questions.length) * 100;       //Math.round(percent*100)
    let progress = document.getElementById('progress_green');
    progress.style = `width: ${percent}%;`;
    progress.innerHTML = `${percent.toFixed(0)} %`;
}

function resetprogress(){
    counter_right=0;
    counter_wrong=1;
    updateProgressBarright(counter_right);
    document.getElementById('progress_red').style =`width: ${counter_wrong} %;`;
    document.getElementById('progress_red').innerHTML ='';

}
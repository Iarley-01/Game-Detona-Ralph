const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.getElementById("#live-points"),
    button: document.getElementById("#btn-continue"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 30,
    livePoints: 3,
  },
  
  actions:{
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function resetGame() {
  //Function to reinitialize the game
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);
 //Reinitialize the time and the score
  state.values.currentTime = 30;
  state.view.timeLeft.textContent = state.values.currentTime;

  state.values.result = 0;
  state.view.score.textContent = state.values.result;
//Set the time interval to the enemy
  state.actions.timerId = setInterval(randomSquare, 1000);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}


function countDown() {
  //This function reduces the time counter
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  //Verifies if the time reached 0
  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    resetGame();
  }
  
}

function playSound(audioName) {
  //this function plays an audio in the game
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  //this function controls the appearances of the enemy
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
  
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  //this function controls if the mouse clicked in a enemy or not
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    })
  })
}

function init() {
  //Main function of the game
  alert("Acerte o alvo para marcar pontos");
  addListenerHitBox();

  resetGame();
}

init();
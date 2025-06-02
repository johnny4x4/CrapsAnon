let point = null;
let bankroll = 1000;
let currentBet = 0;
let inPointPhase = false;

const die1El = document.getElementById("die1");
const die2El = document.getElementById("die2");
const messageEl = document.getElementById("message");
const pointEl = document.getElementById("point");
const bankrollEl = document.getElementById("bankroll");
const rollBtn = document.getElementById("roll-btn");
const resetBtn = document.getElementById("reset-btn");
const chipButtons = document.querySelectorAll(".chip");

chipButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentBet = parseInt(button.getAttribute("data-value"));
    messageEl.textContent = `You have selected a $${currentBet} bet.`;
  });
});

rollBtn.addEventListener("click", () => {
  if (currentBet === 0) {
    messageEl.textContent = "Please select a bet amount.";
    return;
  }

  if (bankroll < currentBet) {
    messageEl.textContent = "Insufficient funds!";
    return;
  }

  bankroll -= currentBet;
  bankrollEl.textContent = `Bankroll: $${bankroll}`;

  const roll = rollDice();
  die1El.textContent = getDieEmoji(roll[0]);
  die2El.textContent = getDieEmoji(roll[1]);

  if (!inPointPhase) {
    if ([7, 11].includes(roll[0] + roll[1])) {
      bankroll += currentBet * 2;
      bankrollEl.textContent = `Bankroll: $${bankroll}`;
      messageEl.textContent = `You rolled ${roll[0] + roll[1]}. Natural! You win.`;
    } else if ([2, 3, 12].includes(roll[0] + roll[1])) {
      messageEl.textContent = `You rolled ${roll[0] + roll[1]}. Craps! You lose.`;
    } else {
      point = roll[0] + roll[1];
      inPointPhase = true;
      pointEl.textContent = `Point: ${point}`;
      messageEl.textContent = `Point is set to ${point}. Keep rolling!`;
    }
  } else {
    if (roll[0] + roll[1] === point) {
      bankroll += currentBet * 2;
      bankrollEl.textContent = `Bankroll: $${bankroll}`;
      messageEl.textContent = `You rolled ${roll[0] + roll[1]}. You hit the point! You win.`;
      resetGame();
    } else if (roll[0] + roll[1] === 7) {
      messageEl.textContent = `You rolled 7. Seven out! You lose.`;
      resetGame();
    } else {
      messageEl.textContent = `You rolled ${roll[0] + roll[1]}. Keep trying for ${point}.`;
    }
  }
});

resetBtn.addEventListener("click", resetGame);

function rollDice() {
  return [getDieRoll(), getDieRoll()];
}

function getDieRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

function getDieEmoji(value) {
  const emojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  return emojis[value - 1];
}

function resetGame() {
  point = null;
  inPointPhase = false;
  currentBet = 0;
  pointEl.textContent = "Point: —";
  messageEl.textContent = "Place your bets and roll the dice!";
}

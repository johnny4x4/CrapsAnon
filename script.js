let point = null;
let inPointPhase = false;

const die1El = document.getElementById("die1");
const die2El = document.getElementById("die2");
const messageEl = document.getElementById("game-message");
const pointDisplay = document.getElementById("point-display");

document.getElementById("roll-btn").addEventListener("click", rollDice);
document.getElementById("reset-btn").addEventListener("click", resetGame);

function rollDice() {
  const die1 = getDieRoll();
  const die2 = getDieRoll();
  const total = die1 + die2;

  // Update UI
  die1El.textContent = getDieEmoji(die1);
  die2El.textContent = getDieEmoji(die2);

  if (!inPointPhase) {
    // Come Out Roll
    if ([7, 11].includes(total)) {
      messageEl.textContent = `You rolled ${total}. Natural! You win.`;
    } else if ([2, 3, 12].includes(total)) {
      messageEl.textContent = `You rolled ${total}. Craps! You lose.`;
    } else {
      point = total;
      inPointPhase = true;
      messageEl.textContent = `Point is set to ${point}. Keep rolling!`;
      pointDisplay.textContent = `Point: ${point}`;
    }
  } else {
    // Point Phase
    if (total === point) {
      messageEl.textContent = `You rolled ${total}. You hit the point! You win!`;
      inPointPhase = false;
      point = null;
      pointDisplay.textContent = "Point: —";
    } else if (total === 7) {
      messageEl.textContent = `You rolled 7. Seven out! You lose.`;
      inPointPhase = false;
      point = null;
      pointDisplay.textContent = "Point: —";
    } else {
      messageEl.textContent = `You rolled ${total}. Keep trying for ${point}.`;
    }
  }
}

function resetGame() {
  point = null;
  inPointPhase = false;
  die1El.textContent = "🎲";
  die2El.textContent = "🎲";
  messageEl.textContent = "Game reset. Click 'Roll Dice' to begin.";
  pointDisplay.textContent = "Point: —";
}

function getDieRoll() {
  return Math.ceil(Math.random() * 6);
}

function getDieEmoji(value) {
  const emojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  return emojis[value - 1];
}

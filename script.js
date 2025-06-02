let point = null;
let bankroll = 1000;
let currentBet = 0;
let betLockedIn = false;
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
    if (betLockedIn) {
      messageEl.textContent = `Bet already placed! Wait for resolution.`;
      return;
    }
    const value = parseInt(button.getAttribute("data-value"));
    if (bankroll >= value) {
      currentBet = value;
      messageEl.textContent = `You have placed a $${currentBet} Pass Line bet. Click Roll to begin.`;
    } else {
      messageEl.textContent = `Not enough bankroll to place $${value} bet.`;
    }
  });
});

rollBtn.addEventListener("click", () => {
  if (currentBet === 0 && !inPointPhase) {
    messageEl.textContent = "Please place a bet before rolling.";
    return;
  }

  const roll = rollDice();
  const total = roll[0] + roll[1];
  die1El.textContent = getDieEmoji(roll[0]);
  die2El.textContent = getDieEmoji(roll[1]);

  if (!inPointPhase) {
    if (!betLockedIn) {
      bankroll -= currentBet;
      bankrollEl.textContent = `Bankroll: $${bankroll}`;
      betLockedIn = true;
    }

    if ([7, 11].includes(total)) {
      bankroll += currentBet * 2; // win = original bet + winnings
      messageEl.textContent = `You rolled ${total}. Natural! You win.`;
      resetGame(true);
    } else if ([2, 3, 12].includes(total)) {
      messageEl.textContent = `You rolled ${total}. Craps! You lose.`;
      resetGame(true);
    } else {
      point = total;
      inPointPhase = true;
      pointEl.textContent = `Point: ${point}`;
      messageEl.textContent = `Point is set to ${point}. Keep rolling!`;
    }

  } else {
    if (total === point) {
      bankroll += currentBet * 2;
      messageEl.textContent = `You rolled ${total}. You hit the point! You win.`;
      resetGame(true);
    } else if (total === 7) {
      messageEl.textContent = `You rolled 7. Seven out! You lose.`;
      resetGame(true);
    } else {
      messageEl.textContent = `You rolled ${total}. Still trying for ${point}.`;
    }
  }

  bankrollEl.textContent = `Bankroll: $${bankroll}`;
});

resetBtn.addEventListener("click", () => resetGame(false));

function resetGame(resolveBet) {
  point = null;
  inPointPhase = false;
  pointEl.textContent = "Point: —";
  if (resolveBet) {
    currentBet = 0;
    betLockedIn = false;
  }
  messageEl.textContent = resolveBet
    ? "Round over. Place your next bet."
    : "Game reset.";
}

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

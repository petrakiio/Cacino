const dealerCardsEl = document.querySelector("#dealer-cards");
const playerCardsEl = document.querySelector("#player-cards");
const dealerScoreEl = document.querySelector("#dealer-score");
const playerScoreEl = document.querySelector("#player-score");
const resultEl = document.querySelector("#bj-result");

const hitBtn = document.querySelector("#hit-btn");
const standBtn = document.querySelector("#stand-btn");
const doubleBtn = document.querySelector("#double-btn");
const dealBtn = document.querySelector("#deal-btn");

let deck = [];
let dealerHand = [];
let playerHand = [];
let gameOver = false;

const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const suits = ["S","H","D","C"];

function createDeck() {
  const d = [];
  for (const s of suits) {
    for (const r of ranks) {
      d.push({ rank: r, suit: s });
    }
  }
  return d;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function drawCard() {
  if (deck.length === 0) {
    deck = createDeck();
    shuffle(deck);
  }
  return deck.pop();
}

function cardValue(card) {
  if (card.rank === "A") return 11;
  if (["J","Q","K"].includes(card.rank)) return 10;
  return Number(card.rank);
}

function handValue(hand) {
  let total = 0;
  let aces = 0;
  for (const card of hand) {
    total += cardValue(card);
    if (card.rank === "A") aces += 1;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
}

function renderCards() {
  dealerCardsEl.innerHTML = "";
  playerCardsEl.innerHTML = "";

  dealerHand.forEach((card) => {
    const el = document.createElement("div");
    el.className = "card";
    el.textContent = `${card.rank}-${card.suit}`;
    dealerCardsEl.appendChild(el);
  });

  playerHand.forEach((card) => {
    const el = document.createElement("div");
    el.className = "card";
    el.textContent = `${card.rank}-${card.suit}`;
    playerCardsEl.appendChild(el);
  });

  dealerScoreEl.textContent = String(handValue(dealerHand));
  playerScoreEl.textContent = String(handValue(playerHand));
}

function setResult(text) {
  if (resultEl) resultEl.textContent = text;
}

function startRound() {
  deck = createDeck();
  shuffle(deck);
  dealerHand = [drawCard(), drawCard()];
  playerHand = [drawCard(), drawCard()];
  gameOver = false;
  setResult("Aguardando jogada...");
  renderCards();
}

function checkPlayerBust() {
  if (handValue(playerHand) > 21) {
    gameOver = true;
    setResult("Voce estourou. Dealer venceu.");
  }
}

function dealerPlay() {
  while (handValue(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }
}

function finishRound() {
  dealerPlay();
  const dealerScore = handValue(dealerHand);
  const playerScore = handValue(playerHand);

  if (dealerScore > 21) {
    setResult("Dealer estourou. Voce venceu.");
  } else if (playerScore > dealerScore) {
    setResult("Voce venceu.");
  } else if (playerScore < dealerScore) {
    setResult("Dealer venceu.");
  } else {
    setResult("Empate.");
  }
  gameOver = true;
  renderCards();
}

if (hitBtn) {
  hitBtn.addEventListener("click", () => {
    if (gameOver) return;
    playerHand.push(drawCard());
    renderCards();
    checkPlayerBust();
  });
}

if (standBtn) {
  standBtn.addEventListener("click", () => {
    if (gameOver) return;
    finishRound();
  });
}

if (doubleBtn) {
  doubleBtn.addEventListener("click", () => {
    if (gameOver) return;
    playerHand.push(drawCard());
    renderCards();
    if (!gameOver) finishRound();
  });
}

if (dealBtn) {
  dealBtn.addEventListener("click", startRound);
}

startRound();

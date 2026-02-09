// Script da Roleta

// Variaveis globais
const numberButtons = document.querySelectorAll("[data-number]");
const colorButtons = document.querySelectorAll(".chip[data-color]");
const parityButtons = document.querySelectorAll(".chip[data-parity]");
const resultadoFront = document.querySelector(".result-box");
const spinBtn = document.querySelector(".spin-btn");
const wheel = document.querySelector(".wheel");
const saldoEl = document.querySelector("#saldo");
const lucroEl = document.querySelector("#lucro");
const betValueEl = document.querySelector("#bet-value");
const betDec = document.querySelector("#bet-dec");
const betInc = document.querySelector("#bet-inc");

let selected = { number: null, color: null, parity: null };
let saldo = 100;
let bet = 10;
let currentRotation = 0;

const roleta = {
  green: [0],
  red: [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],
  black: [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]
};

// Funcoes do jogo
function corDoNumero(n) {
  if (roleta.green.includes(n)) return "green";
  if (roleta.red.includes(n)) return "red";
  return "black";
}

function clearSelection() {
  [...numberButtons, ...colorButtons, ...parityButtons].forEach((btn) =>
    btn.classList.remove("is-selected")
  );
  selected = { number: null, color: null, parity: null };
}

function updateResult() {
  if (!resultadoFront) return;
  const parts = [];
  if (selected.number !== null) parts.push(`Numero: ${selected.number}`);
  if (selected.color) parts.push(`Cor: ${selected.color}`);
  if (selected.parity) parts.push(`Paridade: ${selected.parity}`);
  resultadoFront.textContent = parts.length ? parts.join(" | ") : "Aguardando giro...";
}

function updateBank() {
  if (saldoEl) saldoEl.textContent = String(saldo);
  if (betValueEl) betValueEl.textContent = String(bet);
}

// Configuracao dos botoes de aposta (um selecionado por tipo)
const setupToggle = (elements, type) => {
  elements.forEach((btn) => {
    btn.addEventListener("click", () => {
      elements.forEach((el) => el.classList.remove("is-selected"));
      btn.classList.add("is-selected");
      selected[type] = btn.dataset[type];
      updateResult();
    });
  });
};

setupToggle(numberButtons, "number");
setupToggle(colorButtons, "color");
setupToggle(parityButtons, "parity");

function girarRoleta() {
  const numeroSorteado = Math.floor(Math.random() * 37);
  const corSorteada = corDoNumero(numeroSorteado);

  const apostas = [
    selected.number !== null ? "number" : null,
    selected.color ? "color" : null,
    selected.parity ? "parity" : null
  ].filter(Boolean);

  if (apostas.length === 0) {
    if (resultadoFront) resultadoFront.textContent = "Escolha uma aposta antes de girar.";
    return;
  }

  const totalStake = bet * apostas.length;
  if (saldo < totalStake) {
    if (resultadoFront) resultadoFront.textContent = "Saldo insuficiente.";
    return;
  }

  saldo -= totalStake;

  let ganho = 0;
  if (selected.number !== null && Number(selected.number) === numeroSorteado) {
    ganho += bet * 36;
  }
  if (selected.color && selected.color === corSorteada) {
    ganho += bet * 2;
  }
  if (selected.parity && numeroSorteado !== 0) {
    const par = numeroSorteado % 2 === 0;
    if ((par && selected.parity === "even") || (!par && selected.parity === "odd")) {
      ganho += bet * 2;
    }
  }

  saldo += ganho;
  if (lucroEl) lucroEl.textContent = String(ganho - totalStake);
  updateBank();

  if (wheel) {
    const base = 360 * 4;
    const ajuste = Math.floor(Math.random() * 360);
    currentRotation += base + ajuste;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
  }

  if (resultadoFront) {
    resultadoFront.textContent = `Sorteado: ${numeroSorteado} (${corSorteada})`;
  }
}

if (spinBtn) {
  spinBtn.addEventListener("click", girarRoleta);
}

if (betDec) {
  betDec.addEventListener("click", () => {
    bet = Math.max(1, bet - 1);
    updateBank();
  });
}

if (betInc) {
  betInc.addEventListener("click", () => {
    bet += 1;
    updateBank();
  });
}

updateBank();

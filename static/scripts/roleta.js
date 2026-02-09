//Script da Roleta

//Variaveis globais
const numberButtons = document.querySelectorAll(".number-chip");
const colorButtons = document.querySelectorAll(".chip[data-color]");
const parityButtons = document.querySelectorAll(".chip[data-parity]");
const resultadoFront = document.querySelector(".result-box");
const spinBtn = document.querySelector(".spin-btn");

let selected = { number: null, color: null, parity: null };

const roleta = {
    green: [0],
    red: [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],
    black: [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]
};

//Funções do jogo
function corDoNumero(n) {
    if (roleta.green.includes(n)) return 'green';
    if (roleta.red.includes(n)) return 'red';
    return 'black';
}

function clearSelection() {
    [...numberButtons, ...colorButtons, ...parityButtons].forEach(btn => btn.classList.remove("is-selected"));
    selected = { number: null, color: null, parity: null };
}

function updateResult() {
    if (!resultadoFront) return;
    const parts = [];
    if (selected.number !== null) parts.push(`Número: ${selected.number}`);
    if (selected.color) parts.push(`Cor: ${selected.color}`);
    if (selected.parity) parts.push(`Paridade: ${selected.parity}`);
    resultadoFront.textContent = parts.length ? parts.join(" | ") : "Aguardando giro...";
}

// Configuração dos botões de aposta
const setupToggle = (elements, type) => {
    elements.forEach(btn => {
        btn.addEventListener("click", () => {
            elements.forEach(el => el.classList.remove("is-selected")); // remove outros do mesmo tipo
            btn.classList.add("is-selected");
            selected[type] = btn.dataset[type];
            updateResult();
        });
    });
};

setupToggle(numberButtons, 'number');
setupToggle(colorButtons, 'color');
setupToggle(parityButtons, 'parity');

function girarRoleta() {
    const numeroSorteado = Math.floor(Math.random() * 37);
    const corSorteada = corDoNumero(numeroSorteado);
    
    // verifica se o selected bate com o sorteio
    resultadoFront.textContent = `Sorteado: ${numeroSorteado} (${corSorteada})`;
}

if (spinBtn) {
    spinBtn.addEventListener('click', girarRoleta);
}
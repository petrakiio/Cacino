const emojisCacaNiquel = ["🎰", "🪙", "🎲", "💎", "♦️", "🍀", "🍒", "🍋"];
let valor_aposta_contador = 10;
let valorAposta = document.getElementById('valor-aposta');
let girar = document.getElementById('girar');
let reels = document.querySelectorAll('#Combinações .reel');
let resultadofront = document.getElementById('resultado');
let valor_ganho = document.getElementById('valor-ganho');
let percas = document.getElementById('valor-perdidio');

valorAposta.textContent = valor_aposta_contador;

function gerarCombinacao() {
    let resultado = [];
    for (let i = 0; i < 3; i++) {
        resultado.push(emojisCacaNiquel[Math.floor(Math.random() * emojisCacaNiquel.length)]);
    }
    return resultado;
}

function girarRoleta() {
    return new Promise((resolve) => {
        const resultadoFinal = gerarCombinacao();
        reels.forEach((reel, index) => {
            let giros = 0;
            const maxGiros = 10 + index * 5;
            const timer = setInterval(() => {
                reel.textContent = emojisCacaNiquel[Math.floor(Math.random() * emojisCacaNiquel.length)];
                giros++;
                if (giros >= maxGiros) {
                    clearInterval(timer);
                    reel.textContent = resultadoFinal[index];
                    if (index === reels.length - 1) resolve(resultadoFinal);
                }
            }, 100);
        });
    });
}

function verificar(resultado) {
    if (resultado.includes('💎') || resultado.includes('🍀')) {
        return { valor: valor_aposta_contador * 3, status: 'ganhou' };
    } else if (resultado.includes('🎰') || resultado.includes('🎲')) {
        return { valor: valor_aposta_contador * 2, status: 'ganhou' };
    }
    return { valor: -valor_aposta_contador, status: 'perdeu' };
}

girar.addEventListener('click', async () => {
    if (valor_aposta_contador <= 0) return; 

    girar.disabled = true;
    resultadofront.textContent = "Girando..."; 
    
    const resultado = await girarRoleta();
    const analise = verificar(resultado);

    if (analise.status === 'ganhou') {
        valor_ganho.textContent = (parseInt(valor_ganho.textContent) || 0) + analise.valor;
        resultadofront.textContent = `Ganhou! +${analise.valor}`;
    } else {
        percas.textContent = (parseInt(percas.textContent) || 0) + Math.abs(analise.valor);
        resultadofront.textContent = 'Perdeu!';
    }
    
    girar.disabled = false;
});

document.getElementById('aumentar-aposta').onclick = () => {
    valor_aposta_contador += 10;
    valorAposta.textContent = valor_aposta_contador;
};

document.getElementById('diminuir-aposta').onclick = () => {
    if (valor_aposta_contador > 0) {
        valor_aposta_contador -= 10;
        valorAposta.textContent = valor_aposta_contador;
    }
};
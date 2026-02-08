//script do caça niquel

//variáveis globais
const emojisCacaNiquel = [
  "🎰",
  "🪙",
  "🎲",
  "💎",
  "🔔",
  "🍀",
  "🍒",
  "🍋",
]
let valor_aposta_contador=10
let valorAposta = document.getElementById('valor-aposta')
let combinacoes = document.getElementById('Combinações')
let aumentarApostaBtn = document.getElementById('aumentar-aposta')
let diminuirApostaBtn = document.getElementById('diminuir-aposta')
let girar = document.getElementById('girar')
let reels = document.querySelectorAll('#Combinações .reel')
let resultadofront = document.getElementById('resultado')
let valor_ganho = document.getAnimations('valor-ganho')
let percas = document.getElementById('valor-perdido')

//text inicial
valorAposta.textContent=valor_aposta_contador


//função para gerar combinações aleatórias
function gerarCombinação(){
    let resultado = []
    for (let i = 0; i < 3; i++) {
        let indiceAleatorio = Math.floor(Math.random() * emojisCacaNiquel.length)
        resultado.push(emojisCacaNiquel[indiceAleatorio])
    }
    return resultado
}

//função de girar a roleta
function girarRoleta(){
    if (!reels.length) return

    reels.forEach((reel, index) => {
        reel.classList.add('spinning')
        let tempo = 0
        const intervalo = 80 + index * 30
        const duracao = 700 + index * 250
        const timer = setInterval(() => {
            const emoji = emojisCacaNiquel[Math.floor(Math.random() * emojisCacaNiquel.length)]
            reel.textContent = emoji
            tempo += intervalo
            if (tempo >= duracao) {
                clearInterval(timer)
                reel.classList.remove('spinning')
            }
        }, intervalo)
    })
}
//função pra verificar jogo
function verificar(resultado){
    if(resultado.includes('💎') | resultado.includes('🍀')){
        return valor_aposta_contador * 3,'ganho1'
    }else if(resultado.includes('🎰') | resultado.includes('🎲')){
        return valor_aposta_contador  * 2,'ganhou2'
    }else{
        if (valor_aposta_contador === 0){
            return 'você faliu'
        }else{
        return valor_aposta_contador  - valor_aposta_contador  * 2 
        }
    }
}

//funções btn

function aumentar(){
    valorAposta.textContent=valor_aposta_contador + 10
}
function diminuir(){
    valorAposta.textContent=valor_aposta_contador - 10
}

//eventos

girar.addEventListener('click', () => {
    let resultado = girarRoleta()
    if (resultado[1] === 'ganhou1'){
        if(valor_ganho.textContent === 0){
            valor_ganho.textContent=resultado
        }else{
            valor_ganho.textContent += resultado
        }
        resultadofront.textContent='Você ganhou!!,seu valor dobrou um 3 vzs'
    }else if (resultado[1] === 'ganhou2'){
         if(valor_ganho.textContent === 0){
            valor_ganho.textContent=resultado
        }else{
            valor_ganho.textContent += resultado
        }
        resultadofront.textContent='Você ganhou!!,seu valor dobrou em 2 vzs'
    }else if (resultado[1] === 'faliu'){
        resultadofront.textContent='Aumente o valor pra continuar jogando!!'
    }
    else{
        if(percas.textContent === 0){
            percas.textContent=resultado
        }else{
            percas.textContent +=resultado
        }
        resultadofront.textContent='Você perdeu :('
    }
})
aumentarApostaBtn.addEventListener('click',() =>{aumentar()})
diminuirApostaBtn.addEventListener('click',()=>{diminuir()})
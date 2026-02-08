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
let valorAposta = document.getElementById('valor-aposta')
let combinacoes = document.getElementById('Combinações')
let aumentarApostaBtn = document.getElementById('aumentar-aposta')
let diminuirApostaBtn = document.getElementById('diminuir-aposta')
let girar = document.getElementById('girar')
let reels = document.querySelectorAll('#Combinações .reel')
let resultado = document.getElementById('resultado')
let valor_ganho = document.getAnimations('valor-ganho')
let percas = document.getElementById('valor-perdido')

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



girar.addEventListener('click', () => {
    girarRoleta()
})

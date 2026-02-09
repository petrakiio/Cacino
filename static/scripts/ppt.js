//Script ppt(pedra,papel e tesoura)

const { match } = require("node:assert")

//Variaveis
const btnpedra = document.querySelector('[data-choice=pedra]')
const btnpapel = document.querySelector('[data-choice=papel]')
const btntesoura = document.querySelector('[data-choice=tesoura]')
const playerscore = document.getElementById('player-score')
const cpuscore = document.getElementById('cpu-score')
let cpupoint = 0
let playerpoint = 0
const resultado = document.getElementById('ppt-result')
const opncpu = ['pedra','papel','tesoura']

//Reset

cpuscore.textContent=cpupoint
playerscore.textContent=playerpoint

//Funções
function atualizarscore(ganhador){
    if (ganhador === 'player'){
        playerpoint +=1
        playerscore.textContent=playerpoint
    }else{
        cpupoint +=1
        cpuscore.textContent=cpupoint
    }
}

function escolhacpu(){
    const escolha = opncpu[Math.floor(Math.random() * opncpu.length)]
    return escolha
}

function verificar(escplayer,esccpu){
    if(
        escplayer == 'papel'  && esccpu == 'pedra' |
        
    )
}
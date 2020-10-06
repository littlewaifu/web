var imgP1;
var imgP2;
var vezJogador;
var fimJogo = false;
var imgX = "Image/x-jogo-velha.jpg";
var imgO = "Image/o-jogo-velha.jpg";

var nomeP1;
var nomeP2;
var escolhaXouO;

function novoJogo() {
    nomeP1 = prompt('Digite o nome do Jogador 1');
    nomeP2 = prompt('Digite o nome do Jogador 2');
    document.getElementById('jogadorAtual').innerHTML = "Vez do: " + nomeP1;

    escolhaXouO = prompt(nomeP1 + ", agora digite X ou O, para escolher seu símbolo");

    if (escolhaXouO == null || escolhaXouO == '' || (escolhaXouO != "x" && escolhaXouO != "o")) {
        alert(nomeP1 + "Você deve digitar x ou o para prosseguir");
        location.reload();
    }

    var imgJogador = document.getElementById("jogadorAtualImg");
    imgJogador.src = imgEscolha();

    if (imgEscolha() == imgX) {
        imgP1 = imgX;
        imgP2 = imgO;
    }
    else {
        imgP1 = imgO;
        imgP2 = imgX;
    }

    vezJogador = nomeP1;
}

function imgEscolha() {
    if (escolhaXouO == "x") {
        return imgX;
    }
    if (escolhaXouO == "o") {
        return imgO;
    }
}

function mostraVez() {
    if (fimJogo == true) {
        return;
    }

    if (vezJogador == nomeP1) {
        var imgJogador = document.getElementById("jogadorAtualImg");
        imgJogador.src = imgP1;
    }
    else {
        var imgJogador = document.getElementById("jogadorAtualImg");
        imgJogador.src = imgP2;
    }
}

function jogada(ident) {
    if (vezJogador == nomeP1) {
        var imgJogada = document.getElementById(ident);
        imgJogada.src = imgP1;
        vezJogador = nomeP2;
        mostraVez();
    } else {
        var imgJogada = document.getElementById(ident);
        imgJogada.src = imgP2;
        vezJogador = nomeP1;
        mostraVez();
    }
}
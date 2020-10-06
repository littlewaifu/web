var jogador1 = "x";
var jogador2 = "o";
var vezJogador = jogador1;
var fimJogo = false;
var imgX = "Image/x-jogo-velha.jpg";
var imgO = "Image/o-jogo-velha.jpg";

var escolhaXouO;

function novoJogo()
{
    var nomeP1 = prompt('Digite o nome do Jogador 1');
    var nomeP2 = prompt('Digite o nome do Jogador 2');
    document.getElementById('jogadorAtual').innerHTML = "Vez do: " + nomeP1;

    escolhaXouO = prompt(nomeP1 + ", agora digite X ou O, para escolher seu símbolo");

    if (escolhaXouO == null || escolhaXouO == '' || (escolhaXouO != "x" && escolhaXouO != "o"))
    {
        alert(nomeP1 + "Você deve digitar x ou o para prosseguir");
        location.reload();
    }

    var imgJogador = document.getElementById("jogadorAtualImg");
    imgJogador.src = imgEscolha();
}

function imgEscolha()
{
    if (escolhaXouO == "x")
    {
        return imgX;
    }
    if (escolhaXouO == "o")
    {
        return imgO;
    }
}

function mostraVez() {
    if (fimJogo == true) {
        return;
    }

    if (vezJogador == jogador1) {
        var imgJogador = document.getElementById("jogadorAtualImg");
        imgJogador.src = imgX;
    }
    else {
        var imgJogador = document.getElementById("jogadorAtualImg");
        imgJogador.src = imgO;
    }


}

function jogada(ident) {
    if (vezJogador == jogador1) {
        var imgJogada = document.getElementById(ident);
        imgJogada.src = imgX;
        vezJogador = jogador2;
        mostraVez();
    } else {
        var imgJogada = document.getElementById(ident);
        imgJogada.src = imgO;
        vezJogador = jogador1;
        mostraVez();
    }
}

/*function iniciarJogada() {
    var casa = document.getElementsByClassName("quad");
    for (var i = 0; i < casa.length; i++) {

        casa[i].addEventListener("click", "jogada()")
    }
}*/

/*function jogada() {
    if (fimJogo == true) {
        return;
    }
    if (this.getElementsByTagName("img").lenght == 0) {
        if (vezJogador == jogador1) {
            this.innerHTML = "<img src = 'Image/x-jogo-velha.jpg'>";
        } else {
            this.innerHTML = "<img src = 'Image/o-jogo-velha.jpg'>";
        }
    }

}
*/
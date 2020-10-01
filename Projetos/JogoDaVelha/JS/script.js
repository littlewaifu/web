var jogador1 = "x";
var jogador2 = "o";
var vezJogador = jogador1;
var fimJogo = false;
var imgX = "Image/x-jogo-velha.jpg";
var imgO = "Image/o-jogo-velha.jpg";



function mostraVez() {
    if (fimJogo == true) {
        return;
    }

    if (vezJogador == jogador1) {
        var imgJogador = document.getElementById("proxJogador");
        imgJogador.src = imgX;
    }
    else {
        var imgJogador = document.getElementById("proxJogador");
        imgJogador.src = imgO;
    }


}

function jogada(ident){
    if(vezJogador == jogador1){
        var imgJogada = document.getElementById(ident);
        imgJogada.src = imgX;
        vezJogador = jogador2;
        mostraVez();
    }else{
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
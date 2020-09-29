var palavra = new Array();
var imagemLetra;
function jogar(){

    palavra[0] = "r";
    palavra[1] = "a";
    palavra[2] = "t";
    palavra[3] = "o";
    verificaPalavra();

}
function verificaPalavra(){
    var letra = prompt("Digite aqui sua letra");
    for( var i = 0; i < palavra.length; i++)
    {
        if(palavra[i] == letra)
        {
            alert("Você acertou!");
        }
        else
        {
            alert("Você errou, forca!");
     
        }
        
    }

}
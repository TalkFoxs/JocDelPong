//Variables i constants globals
//Main de l'aplicatiu
var joc;
let animacioId = null;
$(function () {
    $("#startGame").click(function () {
        if (animacioId !== null) {
            cancelAnimationFrame(animacioId);
            animacioId = null;
        }

        $("#menujoc").show();
        $("#menu").hide();
        var myCanvas = $("#joc")[0];
        var myCtx = myCanvas.getContext("2d");
        joc = new Joc(myCanvas, myCtx);
        joc.inicialitza();
    });




    /********************************* 
     * Tasca. Inicialitza la classe JOC les posicions 
     * dels elements del joc
     * al canva: Pales, bola, etc
    **********************************/
    // animacio();


})

function animacio() {
    joc.update();
    //Oportunitat per actualitzar les puntuacions
    //revisar si seguim jugant o no
    //Si pujem de nivell, etc

    //Crida recursiva per generar animació
    if (!joc.acabat) {
        animacioId = requestAnimationFrame(animacio);
    }
}
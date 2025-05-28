//Variables i constants globals
//Main de l'aplicatiu
let joc = null;
let animacioId = null;
const display = new Display();
const bgMusic = document.getElementById('bgMusic');
const muteBtn = $('#muteBtn');

let isMuted = false;


$(function () {
    inicialitzarAplicacio();
    display.mostrarRanking();
    $("#startGame").click(function () {
        if (animacioId !== null) {
            cancelAnimationFrame(animacioId);
            animacioId = null;
        }

        $("#menujoc").show();
        $("#menu").hide();
        $("#configuracion").hide();
        var myCanvas = $("#joc")[0];
        var myCtx = myCanvas.getContext("2d");
        joc = new Joc(myCanvas, myCtx);
        joc.inicialitza();
    });
    $("#clearRanking").click(function () {
        localStorage.removeItem("ranking");
        display.mostrarRanking();
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

function inicialitzarAplicacio() {
    configurarAudio();
    configurarEvents();
    display.mostrarRanking();
}

function configurarAudio() {
    bgMusic.volume = 0.3;
    bgMusic.muted = false;
    isMuted = false;
    
    muteBtn.text('Cilencio');
    muteBtn.on('click', toggleMute);
}

function toggleMute() {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    muteBtn.text(isMuted ? 'Cancelar Cilencio' : 'Cilencio');
}

function configurarEvents() {
    $('#startGame').on('click', iniciarJoc);
    $('#clearRanking').on('click', netejarRanking);
}
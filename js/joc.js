class Joc {
    constructor(myCanvas, myCtx) {
        this.myCanvas = myCanvas;
        this.myCtx = myCtx;
        this.amplada = myCanvas.width;
        this.alcada = myCanvas.height;
        this.palaPoints = 0;
        this.pcPoints = 0;
        this.acabat = false;
        this.raking = [];
        this.display = new Display();

        //Elements del joc
        /********************************* 
         * Tasca. Crear els elements del joc
         * Pales, bola, etc
        **********************************/
        this.pala = new Pala(new Punt(5, (this.alcada / 2) - 25), 10, 50);
        this.palaPC = new Pala(new Punt(285, (this.alcada / 2) - 25), 10, 50);
        this.bola = new Bola(new Punt((this.amplada / 2) - 5, (this.alcada / 2) - 5), 10, 10, this);



        //Tecles de control
        //tecles del Joc. Només fem servir up i down
        this.key = {
            RIGHT: { code: 39, pressed: false },
            LEFT: { code: 37, pressed: false },
            DOWN: { code: 40, pressed: false },
            UP: { code: 38, pressed: false }
        }

        this.bola.setVelocitat($("#dificultat").find(":selected").val());
    }

    inicialitza() {
        $(document).on("keydown", { joc: this }, function (e) {
            /********************************* 
            * Tasca. Indetificar la tecla premuda si és alguna
            * de les definides com a tecla de moviment
            * Actualitzar la propietat pressed a true 
           **********************************/
            switch (e.keyCode) {
                case 38:
                    joc.key.UP.pressed = true;
                    joc.bola.running = true;
                    break;
                case 40:
                    joc.key.DOWN.pressed = true;
                    joc.bola.running = true;
                    break;
            }
        });
        $(document).on("keyup", { joc: this }, function (e) {
            /********************************* 
             * Tasca. Indetificar la tecla que ja no està premuda,
             * si és alguna de les definides com a tecla de moviment
             * Actualitzar la propietat pressed a false
            **********************************/
            const joc = e.data.joc;
            switch (e.keyCode) {
                case 38:
                    joc.key.UP.pressed = false;
                    break;
                case 40:
                    joc.key.DOWN.pressed = false;
                    break;
            }
        });

        /********************************* 
         * Tasca. Dibuixar inicialment els elements del joc
         * al canva: Pales, bola, etc
        **********************************/
        //Màtode de crida recursiva per generar l'animació dels objectes

        requestAnimationFrame(animacio);

    }

    update() {
        /********************************* 
       * Tasca. Actualitzar les posicions 
       * dels elements del joc
       * al canva: Pales, bola, etc
      **********************************/

        if (this.acabat === true) return;

        this.bola.update(this.amplada, this.alcada, this.pala, this.palaPC);
        joc.pala.update(joc.key, joc.alcada);

        this.palaPC.updateAuto(this.bola, this.palaPC);
        this.draw();
    }

    draw() {
        this.clearCanvas();
        /********************************* 
         * Tasca. Dibuixar els elements del joc
         * al canva, un cop actualitzades
         * les seves posicions: Pales, bola, etc
        **********************************/
        this.pala.colorRectangle = "#f00";
        this.pala.draw(this.myCtx);
        this.palaPC.draw(this.myCtx);
        this.bola.colorRectangle = "#00f";
        this.bola.draw(this.myCtx);
    }
    //Neteja el canvas
    clearCanvas() {
        this.myCtx.clearRect(
            0, 0,
            this.amplada, this.alcada
        )
    }
    updatePuntuacio(jugador) {
        if (jugador == true) {
            this.palaPoints++;
        } else {
            this.pcPoints++;
        }
        $("#score-jugador2").text(this.palaPoints);
        $("#score-jugador1").text(this.pcPoints);

        if (this.palaPoints == 1) {
            this.jocAcabat();
        }
    }


    /*********************************
     * Tasca. Afegir un jugador al raking
     * **********************************/
    afegirJugador(jugador) {
        this.raking.push(jugador);
        this.raking.sort((a, b) => b.puntuacio_jugador - a.puntuacio_jugador);
        if (this.raking.length > 10) {
            this.raking.pop();
        }
        this.mostrarRanking(this.raking);
    };


    /*******    
     * Tasca joc acabat
     */

    jocAcabat() {
        this.acabat = true;
        this.display.setPuntuacio($("#nomjugador").val(), this.pcPoints);
        this.display.mostrarRanking(this.display.obtenirRanking());

        console.log(this.display);
        this.palaPoints = 0;
        this.pcPoints = 0;
        $("#score-jugador2").text(this.palaPoints);
        $("#score-jugador1").text(this.pcPoints);
        $("#menujoc").hide();
        $("#menu").show();
         $("#configuracion").show();
    }

    /**Mostrar raking */
    mostrarRanking(ranking) {
        const table = document.getElementById("ranking");
        console.log(this.raking);
        table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

        ranking.forEach(jugador => {
            const fila = document.createElement("tr");
            const nomTd = document.createElement("td");
            nomTd.textContent = jugador.nomjugador;
            const puntuacioTd = document.createElement("td");
            puntuacioTd.textContent = jugador.puntuacio_jugador;
            fila.appendChild(nomTd);
            fila.appendChild(puntuacioTd);
            table.appendChild(fila);
        });
    }
}
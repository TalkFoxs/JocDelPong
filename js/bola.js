class Bola extends Rectangle {

    constructor(puntPosicio, amplada, alcada, joc) {
        super(puntPosicio, amplada, alcada);
        this.joc = joc;
        this.velocitat = 10;
        this.velocitatx = this.velocitat * (Math.random() < 0.5 ? 1 : -1);
        this.velocitaty = this.velocitat * (Math.random() < 0.5 ? 1 : -1);
        this.colorCercle = "#eee";
        this.running = false;
    };
    mou(mouX, mouY) {
        this.puntPosicio.x += x;
        this.puntPosicio.y += y;
    }

    update(ampleCanva, altCanva, palaJugador, palaOrdinador) {
        /********************************* 
         * Tasca. Actualitzar la posició de la bola tenin en compte
         * Si xoca o no amb els marges del canvas
         * Si xoca o no amb les pales dels jugadors 
        **********************************/
        /********************************* 
         * Identifica el punt actual
         * Defineix el punt següent. On ha d'anar la bola
         * Definiex un SEGMENT que vagi del PuntActual al PuntSegüent
         * Revisar si xoca amb les vores del canvas 
         * Si xoca amb una vora superior o inferior, canviar el sentit i sortir
         * Si xoca amb una vora lateral, identificar punt aconseguit i reiniciar
         * Revisar si xoca amb una Pala
         * Si xoca, canviar el sentit en funció de si ha xocar
         * a dreta, esquerra, a dalt o a baix de la pala
         * canviar el sentit en funció d'on ha xocat i sortir
        **********************************/
        if(this.running){
            let xoc = false; 
            let segmentTrajectoria = new Segment(this.puntPosicio, {x: this.puntPosicio.x + this.velocitatx, y: this.puntPosicio.y + this.velocitaty});
            /********************************* 
             * Tasca. Revisar si xoca amb tots els marges del canva 
            **********************************/ 
            xoc = this.revisaXocTop(segmentTrajectoria) || 
                    this.revisaXocBot(segmentTrajectoria, altCanva) || 
                    this.revisaXocLeft(segmentTrajectoria, new Punt((ampleCanva / 2) - 5, (altCanva / 2) - 5)) || 
                    this.revisaXocRight(segmentTrajectoria, new Punt((ampleCanva / 2) - 5, (altCanva / 2) - 5), ampleCanva);
            if(!xoc){
                /********************************* 
                 * Tasca. Revisar si xoca amb alguna pala i 
                 * en quina vora de la pala xoca 
                    **********************************/ 
                let xocPala = this.revisaXocPales(segmentTrajectoria,palaJugador, palaOrdinador);
                if(xocPala){
                    xoc = true;
                    /********************************* 
                     * Tasca. Si xoca amb alguna pala 
                     * canviar el sentit en funció de si ha xocar
                    * a dreta, esquerra, a dalt o a baix de la pala 
                    * Poder heu de tenir en compte en quina pala s'ha produït el xoc
                    **********************************/ 
                    console.log(xocPala.vora);
                    switch (xocPala.vora) {
                        case "right":
                            if (xocPala.pala == "jugador") {
                                this.velocitatx = -this.velocitatx;
                                this.puntPosicio.x = segmentTrajectoria.puntB.x;
                            } else if (xocPala.pala == "ordinador") {
                                this.velocitatx = -this.velocitatx;
                                this.puntPosicio.x = segmentTrajectoria.puntB.x;
                            }
                            break;
                        case "left":
                            if (xocPala.pala == "jugador") {
                                this.velocitatx = -this.velocitatx;
                                this.puntPosicio.x = segmentTrajectoria.puntB.x;
                            } else if (xocPala.pala == "ordinador") {
                                this.velocitatx = -this.velocitatx;
                                this.puntPosicio.x = segmentTrajectoria.puntB.x;
                            }
                            break;
                        case "bottom":
                            if (xocPala.pala == "jugador") {
                                this.velocitaty = -this.velocitaty;
                                this.puntPosicio.y = segmentTrajectoria.puntB.y;
                            } else if (xocPala.pala == "ordinador") {
                                this.velocitaty = -this.velocitaty;
                                this.puntPosicio.y = segmentTrajectoria.puntB.y;
                            }
                            break;
                        case "top":
                            if (xocPala.pala == "jugador") {
                                this.velocitaty = -this.velocitaty;
                                this.puntPosicio.y = segmentTrajectoria.puntB.y;
                            } else if (xocPala.pala == "ordinador") {
                                this.velocitaty = -this.velocitaty;
                                this.puntPosicio.y = segmentTrajectoria.puntB.y;
                            }
                            break;
                    }  
                }
            }
            if(!xoc){
                //Si no hi ha xoc és mou on pertoca
                this.puntPosicio.x = segmentTrajectoria.puntB.x;
                this.puntPosicio.y = segmentTrajectoria.puntB.y;
            }
        }else{
            this.velocitatx = 2*(Math.random() < 0.5 ? 1 : -1);
            this.velocitaty = 2*(Math.random() < 0.5 ? 1 : -1);
        }
    }
    /********************************* 
     * Tasca. Mètode que utilitza un objecte SEGMENT
     * i identifica si hi ha un xoc amb alguna de les
     * vores del camp
     * Aquí un exemple de com identificar un xoc al marge superior
     * Com a paràmetre accepta un SEGMENT que heu de crear anteriorment
     * Cal fer un mètode per cada lateral que manca: esquerra, dret i inferior
     * El el cas dels laterals caldrà assignar puntuació i reiniciar un nou joc
    **********************************/

    revisaXocTop(segmentTrajectoria) {
        if (segmentTrajectoria.puntB.y < 0) {
            let exces = (segmentTrajectoria.puntB.y) / this.velocitaty;
            this.puntPosicio.x = segmentTrajectoria.puntB.x - exces * this.velocitatx;
            this.puntPosicio.y = 0;
            this.velocitaty = -this.velocitaty;
            return true;
        }
    }

    revisaXocBot(segmentTrajectoria, alcada) {
        if (segmentTrajectoria.puntB.y > alcada - this.alcada) {
            let exces = (segmentTrajectoria.puntB.x) / this.velocitatx;
            this.puntPosicio.x = segmentTrajectoria.puntB.x;
            this.puntPosicio.y = alcada - this.alcada;
            this.velocitaty = -this.velocitaty;
            return true;
        }
    }

    revisaXocLeft(segmentTrajectoria,start){
        if(segmentTrajectoria.puntB.x < 0){
            this.puntPosicio.x = start.x;
            this.puntPosicio.y = start.y;
            this.joc.updatePuntuacio(true);
            this.running = false;
            return true;
        }
    } 
    revisaXocRight(segmentTrajectoria,start,amplada){
        if(segmentTrajectoria.puntB.x > amplada-this.amplada){
            this.puntPosicio.x = start.x;
            this.puntPosicio.y = start.y;
            this.joc.updatePuntuacio(false);
            this.running = false;
            return true;
        }
    } 
    /********************************* 
    * Tasca. Mètode que utilitza un objecte SEGMENT
    * i el seu mètode INTERSECCIOSEGMENTRECTANGLE per determinar
    * a quina vora del rectangle s'ha produït la col·lisió
    * i quin ha sigut el punt d'intersecció
    * Complemem la informació retornada amb la identificació
    * de quina pala (jugador o màquina) ha provocat el xoc
    * retorna PuntVora, que conté:
    * -El punt d'intersecció
    * -El costat de la pala on s'ha donat la col·lisió
    * -Un identificador de quina pala ha col.lisionat
   **********************************/
    calculaVora(punt, pala) {
        let vora = "";
        const marge = 5;

        if (Math.abs(punt.x + this.amplada - pala.puntPosicio.x) <= marge) {
            vora = "left";
        } else if (Math.abs(punt.x - (pala.puntPosicio.x + pala.amplada)) <= marge) {
            vora = "right";
        } else if (Math.abs(punt.y + this.alcada - pala.puntPosicio.y) <= marge) {
            vora = "top";
        } else if (Math.abs(punt.y - (pala.puntPosicio.y + pala.alcada)) <= marge) {
            vora = "bottom";
        }

        return vora;
    }

    revisaXocPales(segmentTrajectoria, palaJugador, palaOrdinador) {
        let xocB = segmentTrajectoria.puntB;

        function tocaPala(punt, pala) {
            return (
                punt.x + this.amplada > pala.puntPosicio.x &&
                punt.x < pala.puntPosicio.x + pala.amplada &&
                punt.y + this.alcada > pala.puntPosicio.y &&
                punt.y < pala.puntPosicio.y + pala.alcada
            );
        }

        let toca = tocaPala.bind(this);

        if (toca(xocB, palaJugador)) {
            let vora = this.calculaVora(xocB, palaJugador);
            return {
                punt: xocB,
                vora: vora,
                pala: "jugador"
            };
        }

        if (toca(xocB, palaOrdinador)) {
            let vora = this.calculaVora(xocB, palaOrdinador);
            return {
                punt: xocB,
                vora: vora,
                pala: "ordinador"
            };
        }

        return null;
    }

    setVelocitat(x) {
        this.velocitat = x;
    }
}

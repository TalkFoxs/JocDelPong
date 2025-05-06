class Display{
    constructor(nomjugador){
        this.nomjugador = nomjugador;
        this.puntuacio_jugador = 0;
        this.puntuacio_ordinador = 0;
    }

    setPuntuacio(jugador){
        if(jugador == 0){
            this.puntuacio_jugador++;
            $("score-jugador1").html(this.puntuacio_jugador);
        }else{
            this.puntuacio_ordinador++;
            $("score-jugador2").html(this.puntuacio_ordinador);
        }
    }
    getPuntuacio(jugador){
        if(jugador == 0){
            return this.puntuacio_jugador;
        }else{
            return this.puntuacio_ordinador;
        }
    }


    
}
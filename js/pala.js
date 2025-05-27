class Pala extends Rectangle {
    constructor(puntPosicio, amplada, alcada) {
        super(puntPosicio, amplada, alcada);
        this.velocitatX = 2;
        this.velocitatY = 2;
        this.colorRectangle = "#fff";
    }
    mou(x, y) {
        this.puntPosicio.x += x;
        this.puntPosicio.y += y;
    }
    update(key, alcada) {

        if (key.DOWN.pressed) {
            /********************************* 
            * Tasca. Definir el moviment de la pala
            * en funció de la tecla premuda
           **********************************/
            if (this.puntPosicio.y - (this.velocitatY) < alcada - this.alcada) {
                this.mou(0, this.velocitatY);
            }
        }
        if (key.UP.pressed) {
            /********************************* 
              * Tasca. Definir el moviment de la pala
              * en funció de la tecla premuda
             **********************************/
            if (this.puntPosicio.y - (this.velocitatY) > 0) {
                this.mou(0, -this.velocitatY);
            } else {
                this.puntPosicio.y = 0;
            }
        }
    }
    updateAuto(_bola, _palaPC) {
        const zonaMort = 30;
        const maxVelocitat = this.velocitatY;

        const posBola = _bola.puntPosicio.y + _bola.alcada / 2;
        const posPala = this.puntPosicio.y + this.alcada / 2;

        const diferència = posBola - posPala;

        if (Math.abs(diferència) <= zonaMort) {
            return;
        }


        let velocitatObjectiu = diferència * 0.2;
        if (velocitatObjectiu > maxVelocitat) velocitatObjectiu = maxVelocitat;
        if (velocitatObjectiu < -maxVelocitat) velocitatObjectiu = -maxVelocitat;

        this.mou(0, velocitatObjectiu);
    }


    setVelocitat(v) {
        this.velocitatX = v;
        this.velocitatY = v;
    }
}
class Pala extends Rectangle{
    constructor(puntPosicio, amplada, alcada){
        super(puntPosicio, amplada, alcada);
        this.velocitatX = 2;
        this.velocitatY = 2;
        this.colorRectangle = "#fff";
    }
    mou(x,y){
        this.puntPosicio.x += x;
        this.puntPosicio.y += y;
    }
    update(key, alcada){
        if(key.DOWN.pressed){
         /********************************* 
         * Tasca. Definir el moviment de la pala
         * en funció de la tecla premuda
        **********************************/
            if(this.puntPosicio.y-(this.velocitatY)<alcada-this.alcada){
                this.mou(0,this.velocitatY);
            }
        }
        if(key.UP.pressed){
       /********************************* 
         * Tasca. Definir el moviment de la pala
         * en funció de la tecla premuda
        **********************************/
            if(this.puntPosicio.y-(this.velocitatY)>0){
                this.mou(0,-this.velocitatY);
            }else{
                this.puntPosicio.y = 0;
            }
        }
    }
    updateAuto(alcadabola,alcada){
        /********************************* 
         * Tasca. Definir el moviment de la pala
         * automàtica en moviment constant 
         * o amb variacions aleatories
        **********************************/
        alcadabola+=5;
        if(this.puntPosicio.y+(this.alcada/2)!=alcadabola){
            // console.log(this.puntPosicio.y,alcadabola);
            if(this.puntPosicio.y-alcadabola>0){
                if (this.puntPosicio.y-alcadabola>2) {
                    this.mou(0,-this.velocitatY);
                }
            }else{
                this.mou(0,this.velocitatY);
            }
            
            
        }
    }

}
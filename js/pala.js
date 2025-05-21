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
    updateAuto(_bola,_palaPC){
        /********************************* 
         * Tasca. Definir el moviment de la pala
         * automàtica en moviment constant 
         * o amb variacions aleatories
        **********************************/
        
        let puntB = _bola.puntPosicio.y+_bola.amplada/2;
        let puntC = _palaPC.puntPosicio.y+_palaPC.alcada/2;
        if(puntB>puntC){
            this.mou(0,this.velocitatY);
        }else{
            this.mou(0,-this.velocitatY);
        }
    }
    
    setVelocitat(v){
        this.velocitatX = v;
        this.velocitatY = v;
    }
}
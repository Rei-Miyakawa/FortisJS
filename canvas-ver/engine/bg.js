Fortis.ColorBG = class{
    constructor(color){
        if(color == null){//色指定なし
            this.color = new Fortis.Color();
        }else if(Fortis.util.checkType(color,"object","Color")){//色判定
            this.color = color;
        }else{
            Fortis.error.ArgTypeWrong();
        }
        this.type = "ColorBG";
    }
    getType(){//タイプ取得
        return this.type;
    }
    delete(){//削除
        this.color = null;
        this.type = null;
    }
    getColor(){//色取得
        return this.color;
    }
}
Fortis.Vector2 = class {
    constructor(x, y) {
        this.type = "Vector2";//タイプ
        
        //x要素の判定
        if(x == null){
            this.x = 0;
        }else{
            if(Fortis.util.checkType(x,"number")){
                this.x = x;
            }else{
                Fortis.error.ArgTypeWrong();
            }
        }
        
        //y要素の判定
        if(y == null){
            this.y = 0;
        }else{
            if(Fortis.util.checkType(y,"number")){
                this.y = y;
            }else{
                Fortis.error.ArgTypeWrong();
            }
        }
    }
    getType() {//タイプを取得
        return this.type;
    }
    delete() {//削除
        this.x = null;
        this.y = null;
        this.type = null;
    }
    add(vec) {//足し算
        if (Fortis.util.checkType(vec, "object", "Vector2")) {
            this.x += vec.x;
            this.y += vec.y;
        } else {
            Fortis.error.ArgTypeWrong();
        }
    }
    sub(vec) {//引き算
        if (Fortis.util.checkType(vec, "object", "Vector2")) {
            this.x -= vec.x;
            this.y -= vec.y;
        } else {
            Fortis.error.ArgTypeWrong();
        }
    }
    rotation(deg, rad) {//円周上を回転
        let degree = 0;
        if(deg != null){
            if(Fortis.util.checkType(deg,"number")){
                degree = deg;
            }else{
                Fortis.error.ArgTypeWrong();
            }
        }

        let radius = 1;
        if(rad != null){
            if(Fortis.util.checkType(rad,"number")){
                raidus = rad;
            }else{
                Fortis.error.ArgTypeWrong();
            }
        }
        return new Vector2(this.x + Math.cos(degree) * radius, this.y + Math.sin(degree) * radius);
    }
    copy() {//コピー
        return new Vector2(this.x, this.y);
    }
}
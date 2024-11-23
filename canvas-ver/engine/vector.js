Fortis.Vector2 = class {
    get type(){
        return "Vector2";
    }
    constructor(x, y) {
        //x要素の判定
        if (x == null) {
            this.x = 0;
        } else {
            if (Fortis.util.checkType(x, "number")) {
                this.x = x;
            } else {
                return Fortis.error.ArgTypeWrong();
            }
        }

        //y要素の判定
        if (y == null) {
            this.y = 0;
        } else {
            if (Fortis.util.checkType(y, "number")) {
                this.y = y;
            } else {
                return Fortis.error.ArgTypeWrong();
            }
        }
    }
    getType() {//タイプを取得
        return this.type;
    }
    delete() {//削除
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                this[key] = null;
            }
        }
    }
    add(vec) {//足し算
        if (vec == null) return Fortis.error.ArgNotExists();
        if (Fortis.util.checkType(vec, "object", "Vector2")) {
            this.x += vec.x;
            this.y += vec.y;
            return this;
        }
        return Fortis.error.ArgTypeWrong();
    }
    sub(vec) {//引き算
        if (vec == null) return Fortis.error.ArgNotExists();
        if (Fortis.util.checkType(vec, "object", "Vector2")) {
            this.x -= vec.x;
            this.y -= vec.y;
            return this;
        }
        return Fortis.error.ArgTypeWrong();
    }
    mul(scale) {//掛け算
        if (scale == null) return Fortis.error.ArgNotExists();
        if (Fortis.util.checkType(scale, "number")) {
            this.x *= scale;
            this.y *= scale;
            return this;
        }
        return Fortis.error.ArgTypeWrong();
    }
    mag() {//大きさ、原点(左上)からの距離
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    normalize() {//単位ベクトルにする
        let mag = this.mag();
        let vec = this.copy();
        return vec.mul(1 / mag);

    }
    distance(vec) {//2点間の距離
        if (vec == null) return Fortis.error.ArgNotExists();
        if (Fortis.util.checkType(vec, "object", "Vector2")) {
            vec.sub(this);
            return Math.sqrt(vec.x ** 2 + vec.y ** 2);
        }
        return Fortis.error.ArgTypeWrong();
    }
    copy() {//コピー
        return new Fortis.Vector2(this.x, this.y);
    }
}
Fortis.ColorMaterial = class {
    constructor(fillColor, strokeColor) {
        this.type = "ColorMaterial";
        if (fillColor != null) {
            if (!Fortis.util.checkType(fillColor, "object", "Color")) return Fortis.error.ArgTypeWrong();
            this.fill = fillColor;
        } else {
            this.fill = false;
        }
        if (strokeColor != null) {
            if (!Fortis.util.checkType(strokeColor, "object", "Color")) return Fortis.error.ArgTypeWrong();
            this.stroke = strokeColor;
        } else {
            this.stroke = false;
        }
    }
    getType() {//タイプ取得
        return this.type;
    }
    delete() {//削除
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                this[key] = null;
            }
        }
    }
    getFillColor() {//塗りつぶしの色を取得
        return this.fill;
    }
    setFillColor(color) {//塗りつぶしの色を設定
        if (color == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(color, "object", "Color")) return Fortis.error.ArgTypeWrong();
        this.fill = color;
        return this.fill;
    }
    getStrokeColor() {//枠の色を取得
        return this.stroke;
    }
    setStrokeColor(color) {//枠の色を設定
        if (color == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(color, "object", "Color")) return Fortis.error.ArgTypeWrong();
        this.stroke = color;
        return this.stroke;
    }
}
Fortis.Color = class {
    get type(){
        return "Color";
    }
    constructor(hexOrR, g, b, a) {
        this.r, this.g, this.b, this.a = 1;
        if (hexOrR == null) {//hexOrRが空なら、引数はなしで白にする判定
            this.r = 255, this.g = 255, this.b = 255;
            return true;
        } else if (g == null && b == null) {//カラーコード判定
            if (Fortis.util.checkType(hexOrR, "string", "#")) {//＃がついていたらかつ7文字ならカラーコードだとみなす
                if (hexOrR.length == 7) {
                    if (parseInt(hexOrR, 16)) return Fortis.error.NotColorCode();
                    let RGB = Fortis.util.hexToRGB(hexOrR);
                    this.r = RGB.r;
                    this.g = RGB.g;
                    this.b = RGB.b;
                    return true;
                } else {
                    return Fortis.error.NotColorCode();
                }
            } else if (Fortis.util.checkType(hexOrR, "string")) {//名前付き色判定
                if (Fortis.util.namedColors[hexOrR] == undefined) {
                    return Fortis.error.KeyNotExistsInObject();
                } else {
                    this.r = Fortis.util.namedColors[hexOrR].r;
                    this.g = Fortis.util.namedColors[hexOrR].g;
                    this.b = Fortis.util.namedColors[hexOrR].b;
                    return true;
                }
            } else {
                return Fortis.error.NotColorCode();
            }
        } else if (Fortis.util.checkType(g, "number") && Fortis.util.checkType(b, "number")) {//RGBもしくはHSVもしくはRGBAの形
            if (hexOrR >= 0 && hexOrR <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {//RGB
                this.r = hexOrR;
                this.g = g;
                this.b = b;
            } else if (hexOrR >= 0 && hexOrR <= 360 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {//HSV
                let RGB = Fortis.util.HSVToRGB({ h: hexOrR, s: g, v: b });
                this.r = RGB.r;
                this.g = RGB.g;
                this.b = RGB.b;
            }

            //aの処理
            if (a != null) {//RGBA
                if (Fortis.util.checkType(a, "number")) {
                    this.a = Math.max(0, Math.min(1, a));
                    return true;
                } else {
                    return Fortis.error.ArgTypeWrong();
                }
            }
        } else {
            return Fortis.error.ArgTypeWrong();
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
    invert() {//反転
        this.r = 255 - this, r;
        this.g = 255 - this, g;
        this.b = 255 - this, b;
        return this;
    }
    getComplementaryColor() {//補色を取得
        return new Fortis.Color(255 - this, r, 255 - this, g, 255 - this, b);
    }
    adjustBrightness(variable) {//明るさ調節
        if (!Fortis.util.checkType(variable, "number")) return Fortis.error.ArgTypeWrong();
        this.r = Math.max(0, Math.min(255, this.r + variable));
        this.g = Math.max(0, Math.min(255, this.g + variable));
        this.b = Math.max(0, Math.min(255, this.b + variable));
        return this;
    }
    toHex() {//16進数変換
        return Fortis.util.RGBToHex({ r: this.r, g: this.g, b: this.b });
    }
    toHSV() {//HSV変換
        return Fortis.util.RGBToHSV({ r: this.r, g: this.g, b: this.b });
    }
    toRGB() {//RGB変換
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }
    toRGBA() {//RGBA変換
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }
}
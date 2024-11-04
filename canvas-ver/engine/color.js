Fortis.Color = class {
    constructor(colorOrR, g, b, a) {
        this.type = "Color";
        this.r, this.g, this.b, this.a = 1;
        this.id = new Date();
        if (colorOrR == null) {//colorOrRが空なら、引数はなしで白にする判定
            this.r = 255, this.g = 255, this.b = 255;
        } else if (g == null && b == null) {//カラーコード判定
            if (Fortis.util.checkType(colorOrR, "string", "#")) {//＃がついていたらかつ7文字ならカラーコードだとみなす
                if (colorOrR.length == 7) {
                    this.r = parseInt(colorOrR.slice(1, 3), 16);
                    this.g = parseInt(colorOrR.slice(3, 5), 16);
                    this.b = parseInt(colorOrR.slice(5, 7), 16);
                } else {
                    Fortis.error.NotColorCode();
                }
            } else if (Fortis.util.checkType(colorOrR, "string")) {//名前付き色判定
                if (Fortis.util.namedColors[colorOrR] == undefined) {
                    Fortis.error.KeyNotExistsInObject();
                } else {
                    this.r = Fortis.util.namedColors[colorOrR].r;
                    this.g = Fortis.util.namedColors[colorOrR].g;
                    this.b = Fortis.util.namedColors[colorOrR].b;
                }
            } else {
                Fortis.error.NotColorCode();
            }
        } else if (Fortis.util.checkType(g, "number") && Fortis.util.checkType(b, "number")) {//RGBもしくはRGBAの形
            this.r = colorOrR;
            this.g = g;
            this.b = b;

            //aの処理
            if (a != null) {//RGBA
                if (Fortis.util.checkType(a, "number")) {
                    this.a = a;
                } else {
                    Fortis.error.ArgTypeWrong();
                }
            }
        } else {
            Fortis.error.ArgTypeWrong();
        }
    }
    getType() {//タイプを取得
        return this.type;
    }
    delete() {//削除
        this.type = null;
        this.r = null;
        this.g = null;
        this.b = null;
        this.a = null;
        this.id = null;
    }
    getId() {//IDを取得
        return this.id;
    }
    toHex() {//16進数変換
        let code_text = "#";
        let rgb = { r: this.r, g: this.g, b: this.b }
        for (let element in rgb) {
            let parsed = rgb[element].toString(16);
            if (parsed.length == 1) {
                code_text += "0";
            }
            code_text += parsed;
        }
        return code_text;
    }
    toRGB() {//RGB変換
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }
    toRGBA() {//RGBA変換
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }
}
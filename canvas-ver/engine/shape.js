Fortis.LineShape = class {
    constructor(length, thick) {
        if (length != null) {
            if (!Fortis.util.checkType(length, "number")) return Fortis.error.ArgTypeWrong();
            if (length < 0) return Fortis.error.ArgIncorrectVarRange();
            this.length = length;
        } else {
            this.length = 30;
        }
        if (thick != null) {
            if (!Fortis.util.checkType(thick, "number")) return Fortis.error.ArgTypeWrong();
            if (thick < 0) return Fortis.error.ArgIncorrectVarRange();
            this.thick = thick;
        } else {
            this.thick = 5;
        }
        this.type = "LineShape";
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
    getLength() {//長さ取得
        return this.length;
    }
    setLength(length) {//長さ指定
        if (length == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(length, "number")) return Fortis.error.ArgTypeWrong();
        if (length < 0) return Fortis.error.ArgIncorrectVarRange();
        this.length = length;
        return this.length;
    }
    getThick() {//線の太さ取得
        return this.thick;
    }
    setThick(thick) {//線の太さ指定
        if (thick == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(thick, "number")) return Fortis.error.ArgTypeWrong();
        if (thick < 0) return Fortis.error.ArgIncorrectVarRange();
        this.thick = thick;
        return this.thick;
    }
}
Fortis.FontLoader = {
    fonts: {},

    async loadFont(key, url) {//フォントのロード
        if (key == null || url == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(key, "string") || !Fortis.util.checkType(url, "string")) return Fortis.error.ArgTypeWrong();
        if (this.fonts[key] !== undefined) return Fortis.error.FontAlreadyExists(key);
        let newFont = document.createElement("link");
        document.head.appendChild(newFont);
        newFont.href = url;
        newFont.rel = "stylesheet"
        let result = await document.fonts.ready;
        if (result) {
            this.fonts[key] = url;
            return Fortis.info.FontLoaded(key);
        }
        return Fortis.error.FontCouldntLoaded(key);
    },

    loadFonts(array) {//フォントの複数ロード。配列で中にkeyとurlがあるオブジェクトを入れる。
        if (array = null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(array, "object")) return Fortis.error.ArgTypeWrong();
        array.forEach(element => {
            this.loadFont(element.key, element.url);
        });
    },

    getFont(key) {//フォントの取得
        if (key = null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (this.fonts[key] === undefined) return Fortis.error.FontNotExists(key);
        return this.fonts[key];
    },

    deleteFont(key) {//フォントの削除
        if (key = null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (this.fonts[key] === undefined) return Fortis.error.FontNotExists(key);
        document.head.removeChild(this.fonts[key])
        this.fonts.delete(key);
        return this.fonts;
    },

    getFontKeys() {//フォントのキーの取得
        return this.fonts.keys();
    },
    getFonts() {//全フォント取得
        let fonts = [];
        this.fonts.forEach(font => {
            fonts.push(font);
        });
        return font;
    }
}

//フォントファミリーについて「https://developer.mozilla.org/ja/docs/Web/CSS/font-family」「https://willcloud.jp/knowhow/font-family/」
Fortis.Font = class {
    get type() {
        return "Font";
    }
    constructor(family, size) {
        if (family == null) {
            this.family = "system-ui";
        } else {
            if (!Fortis.util.checkType(family, "string")) return Fortis.error.ArgTypeWrong();
            this.family = family;
        }
        if (size == null) {//ピクセル単位で指定
            this.size = 10;
        } else {
            if (!Fortis.util.checkType(size, "number")) return Fortis.error.ArgTypeWrong();
            if (size <= 0) return Fortis.error.ArgIncorrectVarRange();
            this.size = size;
        }
        this.weight = "400";//normalは400。boldは700。単位なし数字だけで指定
        this.style = "normal";
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
    getFamily() {//フォントファミリーを取得
        return this.family;
    }
    setFamily(family) {//フォントファミリーを設定
        if (family == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(family, "string")) return Fortis.error.ArgTypeWrong();
        this.family = family;
        return this.family;
    }
    getSize() {//フォントサイズを取得
        return this.size;
    }
    setSize(size) {//フォントサイズを設定
        if (size == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(size, "number")) return Fortis.error.ArgTypeWrong();
        this.size = size;
        return this.size;
    }
    getWeight() {//文字の方向を取得
        return this.weight;
    }
    setWeight(weight) {//文字の方向を設定
        if (weight == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(weight, "number")) return Fortis.error.ArgTypeWrong();
        if (weight <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.weight = weight;
        return this.weight;
    }
    getStyle() {//スタイルを取得
        return this.style;
    }
    setStyle(style) {//スタイルを設定
        if (style == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(style, "string")) return Fortis.error.ArgTypeWrong();
        this.style = style;
        return this.style;
    }
    output() {//出力
        return this.style + " " + this.weight + " " + this.size + "px " + this.family;
    }
}
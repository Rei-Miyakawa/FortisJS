//変数
Fortis.util.namedColors = {//カラーネーム
    white: { r: 255, g: 255, b: 255 },
    red: { r: 255, g: 0, b: 0 },
    pink: { r: 255, g: 192, b: 203 },
    orange: { r: 255, g: 165, b: 0 },
    yellow: { r: 255, g: 255, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    cyan: { r: 0, g: 255, b: 255 },
    blue: { r: 0, g: 0, b: 255 },
    purple: { r: 128, g: 0, b: 128 },
    black: { r: 0, g: 0, b: 0 }
}

//関数
Fortis.error = {
    ArgNotExists() { Fortis.util.console("Error", "引数が指定されていません。") },
    ArgTypeWrong() { Fortis.util.console("Error", "引数の型もしくはタイプが間違っています。") },
    NotColorCode() { Fortis.util.console("Error", "カラーコードは「#」と16進数6文字を足した計7文字で入力してください") },
    ArgIncorrectVarRange() { Fortis.util.console("Error", "引数の値の範囲が正しくありません。") },
    EntityAlreadyExists() { Fortis.util.console("Error", "そのエンティティは既に存在しています。") },
    EntityNotExists() { Fortis.util.console("Error", "そのエンティティは存在していません。") },
    LayerAlreadyExists() { Fortis.util.console("Error", "そのレイヤーは既に存在しています。") },
    LayerNotExists() { Fortis.util.console("Error", "そのレイヤーは存在していません。") },
    CantDeleteNamedLayer() { Fortis.util.console("Error", "名前付きのレイヤーは削除できません。") },
}

Fortis.info = {
    SystemInitCompleted() { Fortis.util.console("Info", "ゲームシステムの初期化が完了しました。") },
    StartGameLoop() { Fortis.util.console("Info", "ゲームループを開始します。") },
}

Fortis.util.console = function (type, content) {
    if (Fortis.Game.config.debug) {
        //「[Fortis] [タイプ] [日付(UTC)] - 内容」のフォーマット
        //タイプは「Info」「Error」
        switch (type) {
            case "Error"://Errorのとき
                let error = new Error();
                console.log("[Fortis] [" + type + "] [" + new Date().toUTCString() + "] - " + content, error);
                break
            case "Info"://Infoのとき
                console.log("[Fortis] [" + type + "] [" + new Date().toUTCString() + "] - " + content);
                break
        }

    }
}

Fortis.util.checkType = function (variable, varType, type) {
    if (typeof (variable) != varType) return false;//変数方チェック
    if (type == null) return true;//引数のtypeがあるか
    if (variable.type == undefined) return variable.indexOf(type) != -1;//variableにtypeが存在するか + variableのチェック
    return variable.type.indexOf(type) != -1;//variable.typeのチェック
}

Fortis.util.hexToRGB = function (hex) {
    if (!Fortis.util.checkType(hex, "string", "#")) return Fortis.error.NotColorCode();
    if (hex.length != 7) return Fortis.error.NotColorCode();
    if (isNaN(parseInt(hex, 16))) return Fortis.error.NotColorCode();
    let rgb = {};
    rgb.r = parseInt(hex.slice(1, 3), 16);
    rgb.g = parseInt(hex.slice(3, 5), 16);
    rgb.b = parseInt(hex.slice(5, 7), 16);
    return rgb;
}

Fortis.util.HSVToRGB = function (hsv) {
    if (!Fortis.util.checkType(hsv, "object")) return Fortis.error.ArgTypeWrong();
    if (hsv.h == undefined || hsv.s == undefined || hsv.v == undefined) return Fortis.error.ArgTypeWrong();
    if (!(hsv.h >= 0 && hsv.h <= 360 && hsv.s >= 0 && hsv.s <= 1 && hsv.v >= 0 && hsv.v <= 1)) return Fortis.error.ArgTypeWrong();
    let RGB = {};
    let max = hsv.v * 255;
    let min = max * (1 - hsv.s);
    let common = (max - min);
    if (hsv.h <= 60) {
        RGB.r = max;
        RGB.g = (hsv.h / 60) * common + min;
        RGB.b = min;
    } else if (hsv.h <= 120) {
        RGB.r = ((120 - hsv.h) / 60) * common + min;
        RGB.g = max;
        RGB.b = min;
    } else if (hsv.h <= 180) {
        RGB.r = min;
        RGB.g = max;
        RGB.b = ((hsv.h - 120) / 60) * common + min;
    } else if (hsv.h <= 240) {
        RGB.r = min;
        RGB.g = ((240 - hsv.h) / 60) * common + min;
        RGB.b = max;
    } else if (hsv.h <= 300) {
        RGB.r = ((hsv.h - 240) / 60) * common + min;
        RGB.g = min;
        RGB.b = max;
    } else {
        RGB.r = max;
        RGB.g = min;
        RGB.b = ((360 - hsv.h) / 60) * common + min;
    }
    return RGB;
}

Fortis.util.RGBToHex = function (rgb) {
    if (!Fortis.util.checkType(rgb, "object")) return Fortis.error.ArgTypeWrong();
    if (rgb.r == undefined || rgb.g == undefined || rgb.b == undefined) return Fortis.error.ArgTypeWrong();
    if (!(rgb.r >= 0 && rgb.r <= 255 && rgb.g >= 0 && rgb.g <= 255 && rgb.b >= 0 && rgb.b <= 255)) return Fortis.error.ArgTypeWrong();
    let code_text = "#";
    let RGB = { r: rgb.r, g: rgb.g, b: rgb.b }
    for (let element in RGB) {
        let parsed = parseInt(RGB[element], 16).toString();
        if (parsed.length == 1) {
            code_text += "0";
        }
        code_text += parsed;
    }
    return code_text;
}

Fortis.util.RGBToHSV = function (rgb) {
    if (!Fortis.util.checkType(rgb, "object")) return Fortis.error.ArgTypeWrong();
    if (rgb.r == undefined || rgb.g == undefined || rgb.b == undefined) return Fortis.error.ArgTypeWrong();
    if (!(rgb.r >= 0 && rgb.r <= 255 && rgb.g >= 0 && rgb.g <= 255 && rgb.b >= 0 && rgb.b <= 255)) return Fortis.error.ArgTypeWrong();
    let HSV = {};
    let max = Math.max(rgb.r, Math.max(rgb.g, rgb.b));
    let min = Math.min(rgb.r, Math.min(rgb.g, rgb.b));
    switch (max) {
        case rgb.r:
            HSV.h = (rgb.g - rgb.b) * 60 / (max - min);
            break
        case rgb.g:
            HSV.h = (rgb.b - rgb.r) * 60 / (max - min) + 120;
            break
        case rgb.b:
            HSV.h = (rgb.r - rgb.g) * 60 / (max - min) + 240;
            break
    }
    if (rgb.r == rgb.g && rgb.g == rgb.b) HSV.h = 0;
    if (HSV.h < 0) HSV.h += 360;
    if (max == 0) {
        HSV.h = 0;
        HSV.s = 0;
        HSV.v = 0;
    } else {
        HSV.s = (max - min) / max;
        HSV.v = max / 255;
    }
    return HSV;
}

Fortis.util.randomID = function (numOfDigit, decimal_system) {//digit=桁数、decimal_system=DS=N進数
    let digit, DS;
    if (numOfDigit == null) {
        digit = 32;
    } else if (Fortis.util.checkType(numOfDigit, "number")) {
        if (numOfDigit < 1) return Fortis.error.ArgIncorrectVarRange();
        digit = Math.floor(numOfDigit);
    } else {
        return Fortis.error.ArgTypeWrong();
    }

    if (decimal_system == null) {
        DS = 16;
    } else if (Fortis.util.checkType(decimal_system, "number")) {
        DS = decimal_system;
    } else {
        return Fortis.error.ArgTypeWrong();
    }

    let id = "";
    for (let i = 0; i < digit; i++) {
        id += Math.round(Math.random() * DS).toString(DS);
    }
    return id;
}

Fortis.util.degreeToRadian = function(degree){
    if (degree == null) return Fortis.error.ArgNotExists();
    if (!Fortis.util.checkType(degree, "number")) return Fortis.error.ArgTypeWrong();
    return degree * (Math.PI / 180);
}

Fortis.util.radianToDegree = function(radian){
    if (radian == null) return Fortis.error.ArgNotExists();
    if (!Fortis.util.checkType(radian, "number")) return Fortis.error.ArgTypeWrong();
    return radian * (180 / Math.PI);
}

Fortis.util.getPointOnCircle = function(pos,radius,degree){
    if(pos == null || radius == null || degree == null)return Fortis.error.ArgNotExists();
    if(!Fortis.util.checkType(pos,"object","Vector2")||!Fortis.util.checkType(radius,"number")||!Fortis.util.checkType(degree,"number"))return Fortis.error.ArgTypeWrong();
    return new Fortis.Vector2(pos.x+radius*Math.cos(Fortis.util.degreeToRadian(degree)),pos.y+radius*Math.sin(Fortis.util.degreeToRadian(degree)));
}
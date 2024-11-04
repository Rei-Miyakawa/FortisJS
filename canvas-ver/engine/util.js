//変数
Fortis.util.namedColors = {
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
    //よく使う
    ArgNotExists() { Fortis.util.console("Error", "引数が指定されていません。") },
    ArgTypeWrong() { Fortis.util.console("Error", "引数の型もしくはタイプが間違っています。") },
    KeyNotExistsInObject() { Fortis.util.console("Error", "オブジェクトにそのキーは存在していません。") },

    //color
    NotColorCode() { Fortis.util.console("Error", "カラーコードは「#」を含めた7文字で入力してください") },

    //その他
    SceneNotSet() { Fortis.util.console("Error", "シーンが設定されていません") },
}

Fortis.info = {
    SystemInitCompleted() { Fortis.util.console("Info", "ゲームシステムの初期化が完了しました。") },
    StartGameLoop() { Fortis.util.console("Info", "ゲームループを開始します。") },
}

Fortis.util.console = function (type, content) {
    //console.log(this.Game.config.debug,content)
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
    if (typeof (variable) == varType) {//変数型
        if (type != null) {//typeがあるか
            if (variable.type == undefined) {//variableにtypeが存在するか
                if(variable.indexOf(type) != -1){
                    return true;
                }else{
                    return false;
                }
            } else if (variable.type.indexOf(type) != -1) {//variable.type
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}
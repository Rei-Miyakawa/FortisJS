Fortis.TransitionManager = {
    list: {},
    //{id:{type:対象の変数の型,target:ターゲット,tVar:変数名,time:時間,elapsedTime:経過時間,from:初期値,to:最終値,difference:fromとtoの差,now:現在の値}}
    add(target, tVar, time, from, to) {//追加
        if (target == null || tVar == null || from == null || to == null) return Fortis.error.ArgNotExists();

        let list = {};
        list["activity"] = false;

        list["target"] = target;

        let tmpDic = { tVar };
        list["tVar"] = tmpDic["tVar"];
        let tVarType = typeof (target[tVar])
        //console.log(target[tVar])
        list["type"] = tVarType;
        if (tVarType == "number") {
            list["difference"] = to - from;
            if (list["difference"] == 0) return false;
        } else if (tVarType == "object") {
            list["difference"] = to.copy().sub(from);
            if (list["difference"].x == 0 && list["difference"].y == 0) return false;
        }

        /*
        if (!Fortis.util.checkType(type, "string")) return Fortis.error.ArgTypeWrong();
        switch (type) {
            case "fade":
                if (!Fortis.util.checkType(from, "number") || !Fortis.util.checkType(to, "number")) return Fortis.error.ArgTypeWrong();
                if ((from < 0 || from > 1) || (to < 0 || to > 1)) return Fortis.error.ArgIncorrectVarRange();
                list["difference"] = to - from;
                if (list["difference"] == 0) return false;
                break;
            case "pos":
                if (!Fortis.util.checkType(from, "object", "Vector2") || !Fortis.util.checkType(to, "object", "Vector2")) return Fortis.error.ArgTypeWrong();
                list["difference"] = to.copy().sub(from);
                if (list["difference"].x == 0 && list["difference"].y == 0) return false;
                break;
            case "size":
                if (!Fortis.util.checkType(from, "object", "Vector2") || !Fortis.util.checkType(to, "object", "Vector2")) return Fortis.error.ArgTypeWrong();
                list["difference"] = to.copy().sub(from);
                if (list["difference"].x == 0 && list["difference"].y == 0) return false;
                break;
            case "angle":
                if (!Fortis.util.checkType(from, "number") || !Fortis.util.checkType(to, "number")) return Fortis.error.ArgTypeWrong();
                list["difference"] = to - from;
                if (list["difference"] == 0) return false;
                break;
            case "scale":
                if (!Fortis.util.checkType(from, "number") || !Fortis.util.checkType(to, "number")) return Fortis.error.ArgTypeWrong();
                if (from < 0 || to < 0) return Fortis.error.ArgIncorrectVarRange();
                list["difference"] = to - from;
                if (list["difference"] == 0) return false;
                break;
            default:
                return Fortis.error.ArgTypeWrong();
        }
        list["type"] = type;
        */
        list["from"] = from;
        list["now"] = from;
        list["to"] = to;
        list["elapsedTime"] = 0;

        if (time == null) {//ms
            list["time"] = 3000;
        } else if (Fortis.util.checkType(time, "number")) {
            list["time"] = time;
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        let id = Fortis.util.randomID();
        this.list[id] = list;
        return id;
    },
    remove(id) {//ID
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TransitionNotExists(id);
        delete this.list[id];
        return this.list;
    },
    stop(id) {
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TransitionNotExists(id);
        this.list[id]["activity"] = false;
    },
    start(id) {
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TransitionNotExists(id);
        this.list[id]["activity"] = true;
    },
    update(delta) {
        for (id in this.list) {
            if (this.list[id]["activity"]) {
                //console.log(this.list[id]["target"])
                Fortis.TransitionManager.list[id]["elapsedTime"] += delta;
                let finish = false;
                if (Fortis.TransitionManager.list[id]["elapsedTime"] >= Fortis.TransitionManager.list[id]["time"]) finish = true;
                if (Fortis.TransitionManager.list[id]["type"] == "number") {
                    Fortis.TransitionManager.list[id]["now"] += delta * Fortis.TransitionManager.list[id]["difference"] / Fortis.TransitionManager.list[id]["time"];
                    if (Fortis.TransitionManager.list[id]["difference"] > 0) {
                        if (Fortis.TransitionManager.list[id]["now"] > Fortis.TransitionManager.list[id]["to"]) {
                            Fortis.TransitionManager.list[id]["target"][Fortis.TransitionManager.list[id]["tVar"]] = Math.min(Fortis.TransitionManager.list[id]["to"], Fortis.TransitionManager.list[id]["now"]);
                        } else {
                            Fortis.TransitionManager.list[id]["target"][Fortis.TransitionManager.list[id]["tVar"]] = Fortis.TransitionManager.list[id]["now"];
                        }
                    } else {
                        if (Fortis.TransitionManager.list[id]["now"] < Fortis.TransitionManager.list[id]["to"]) {
                            Fortis.TransitionManager.list[id]["target"][Fortis.TransitionManager.list[id]["tVar"]] = Math.max(Fortis.TransitionManager.list[id]["to"], Fortis.TransitionManager.list[id]["now"]);
                        } else {
                            Fortis.TransitionManager.list[id]["target"][Fortis.TransitionManager.list[id]["tVar"]] = Fortis.TransitionManager.list[id]["now"];
                        }
                    }
                    if (finish) Fortis.TransitionManager.list[id]["target"][Fortis.TransitionManager.list[id]["tVar"]] = Fortis.TransitionManager.list[id]["to"];
                } else if (Fortis.TransitionManager.list[id]["type"] == "object") {
                    Fortis.TransitionManager.list[id]["now"].add(Fortis.TransitionManager.list[id]["difference"].copy().mul(delta / Fortis.TransitionManager.list[id]["time"]));
                    Fortis.TransitionManager.list[id]["target"][Fortis.TransitionManager.list[id]["tVar"]] = Fortis.TransitionManager.list[id]["now"];
                    if (finish) Fortis.TransitionManager.list[id]["target"][Fortis.TransitionManager.list[id]["tVar"]] = Fortis.TransitionManager.list[id]["to"];
                }
                /*
                switch (Fortis.TransitionManager.list[id]["type"]) {
                    case "fade":
                        Fortis.TransitionManager.list[id]["now"] += delta * Fortis.TransitionManager.list[id]["difference"] / Fortis.TransitionManager.list[id]["time"];
                        Fortis.TransitionManager.list[id]["target"].alpha = Fortis.TransitionManager.list[id]["now"];
                        if (finish) Fortis.TransitionManager.list[id]["target"].alpha = Fortis.TransitionManager.list[id]["to"];
                        break;
                    case "pos":
                        Fortis.TransitionManager.list[id]["now"].add(Fortis.TransitionManager.list[id]["difference"].copy().mul(delta / Fortis.TransitionManager.list[id]["time"]));
                        Fortis.TransitionManager.list[id]["target"].pos = Fortis.TransitionManager.list[id]["now"];
                        if (finish) Fortis.TransitionManager.list[id]["target"].pos = Fortis.TransitionManager.list[id]["to"];
                        break;
                    case "angle":
                        Fortis.TransitionManager.list[id]["now"] += delta * Fortis.TransitionManager.list[id]["difference"] / Fortis.TransitionManager.list[id]["time"];
                        Fortis.TransitionManager.list[id]["target"].angle = Fortis.TransitionManager.list[id]["now"];
                        if (finish) Fortis.TransitionManager.list[id]["target"].angle = Fortis.TransitionManager.list[id]["to"];
                        break;
                    case "size":
                        Fortis.TransitionManager.list[id]["now"].add(Fortis.TransitionManager.list[id]["difference"].copy().mul(delta / Fortis.TransitionManager.list[id]["time"]));
                        Fortis.TransitionManager.list[id]["target"].scale = Fortis.TransitionManager.list[id]["now"];
                        if (finish) Fortis.TransitionManager.list[id]["target"].scale = Fortis.TransitionManager.list[id]["to"];
                        break;
                    case "scale":
                        Fortis.TransitionManager.list[id]["now"] += delta * Fortis.TransitionManager.list[id]["difference"] / Fortis.TransitionManager.list[id]["time"];
                        Fortis.TransitionManager.list[id]["target"].scale.x = Fortis.TransitionManager.list[id]["target"].scale.y = Fortis.TransitionManager.list[id]["now"];
                        if (finish) Fortis.TransitionManager.list[id]["target"].scale.x = Fortis.TransitionManager.list[id]["target"].scale.y = Fortis.TransitionManager.list[id]["to"];
                        break;
                }
                        */
                if (finish) {
                    Fortis.TransitionManager.remove(id);
                }
            }
        }
    },
    get(id) {
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return false
        return this.list[id];
    }
}
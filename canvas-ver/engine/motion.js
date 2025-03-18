Fortis.MotionManager = {
    list: {},
    //{id:{type:タイプ,target:ターゲット,time:時間,elapsedTime:経過時間,from:初期値,to:最終値,difference:fromとtoの差,now:現在の値}}
    //fade from:0から1 to・now:fromと同じ
    //pos from:Vector2 to・now:fromと同じ
    //angle from:度数法 to・now:fromと同じ
    //size from:Vector2 to・now:fromと同じ
    //scale from:0以上の整数 to・now:fromと同じ
    add(target, type, time, from, to) {//追加
        if (target == null || type == null || from == null || to == null) return Fortis.error.ArgNotExists();

        let list = {};

        if (!Fortis.util.checkType(target, "object", "Entity")) return Fortis.error.ArgTypeWrong();
        list["target"] = target;

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
        console.log(list["difference"])
        list["type"] = type;
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
        if (this.list[id] === undefined) return Fortis.error.MotionNotExists(id);
        delete this.list[id];
        return this.list;
    },
    update(delta) {
        for (id in this.list) {
            Fortis.MotionManager.list[id]["elapsedTime"] += delta;
            let finish = false;
            if (Fortis.MotionManager.list[id]["elapsedTime"] >= Fortis.MotionManager.list[id]["time"]) finish = true;
            switch (Fortis.MotionManager.list[id]["type"]) {
                case "fade":
                    Fortis.MotionManager.list[id]["now"] += delta * Fortis.MotionManager.list[id]["difference"] / Fortis.MotionManager.list[id]["time"];
                    Fortis.MotionManager.list[id]["target"].alpha = Fortis.MotionManager.list[id]["now"];
                    if (finish) Fortis.MotionManager.list[id]["target"].alpha = Fortis.MotionManager.list[id]["to"];
                    break;
                case "pos":
                    Fortis.MotionManager.list[id]["now"].add(Fortis.MotionManager.list[id]["difference"].copy().mul(delta / Fortis.MotionManager.list[id]["time"]));
                    Fortis.MotionManager.list[id]["target"].pos = Fortis.MotionManager.list[id]["now"];
                    if (finish) Fortis.MotionManager.list[id]["target"].pos = Fortis.MotionManager.list[id]["to"];
                    break;
                case "angle":
                    Fortis.MotionManager.list[id]["now"] += delta * Fortis.MotionManager.list[id]["difference"] / Fortis.MotionManager.list[id]["time"];
                    Fortis.MotionManager.list[id]["target"].angle = Fortis.MotionManager.list[id]["now"];
                    if (finish) Fortis.MotionManager.list[id]["target"].angle = Fortis.MotionManager.list[id]["to"];
                    break;
                case "size":
                    Fortis.MotionManager.list[id]["now"].add(Fortis.MotionManager.list[id]["difference"].copy().mul(delta / Fortis.MotionManager.list[id]["time"]));
                    Fortis.MotionManager.list[id]["target"].scale = Fortis.MotionManager.list[id]["now"];
                    if (finish) Fortis.MotionManager.list[id]["target"].scale = Fortis.MotionManager.list[id]["to"];
                    break;
                case "scale":
                    Fortis.MotionManager.list[id]["now"] += delta * Fortis.MotionManager.list[id]["difference"] / Fortis.MotionManager.list[id]["time"];
                    Fortis.MotionManager.list[id]["target"].scale.x = Fortis.MotionManager.list[id]["target"].scale.y = Fortis.MotionManager.list[id]["now"];
                    if (finish) Fortis.MotionManager.list[id]["target"].scale.x = Fortis.MotionManager.list[id]["target"].scale.y = Fortis.MotionManager.list[id]["to"];
                    break;
            }
            if (finish) {
                Fortis.MotionManager.remove(id);
            }
        }
    },
    get(id) {
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.MotionNotExists(id);
        return this.list[id];
    }
}
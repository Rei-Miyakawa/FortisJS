Fortis.Timer = {
    list: {},//中身id:{time:時間(ms),repeat:繰り返すか(boolean),func:呼び出す関数,id:ID}
    add(time, repeat, func, target) {//追加
        let list = {};
        if (repeat == null) {
            list["repeat"] = false;
        } else if (Fortis.util.checkType(repeat, "boolean")) {
            list["repeat"] = repeat;
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        if (time == null) {
            list["time"] = 5000;
        } else if (Fortis.util.checkType(time, "number")) {
            list["time"] = time;
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        if (target == null) {
            if (func == null) return Fortis.error.ArgNotExists();
            if (!Fortis.util.checkType(func, "function")) return Fortis.error.ArgTypeWrong();
            list["func"] = func;
        } else {
            if (!Fortis.util.checkType(target, "object")) return Fortis.error.ArgTypeWrong();
            if (func == null) return Fortis.error.ArgNotExists();
            if (!Fortis.util.checkType(func, "string")) return Fortis.error.ArgTypeWrong();
            list["func"] = [target,func];
        }


        let id = Fortis.util.randomID();
        list["management"] = { "time": list["time"], "activity": false };
        this.list[id] = list;
        return id;
    },
    addLists(lists) {//追加
        if (lists == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(lists, "object")) return Fortis.error.ArgTypeWrong();
        let ids = [];
        for (let list in lists) {
            ids.push(Fortis.Timer.add(list));
        }
        return ids;
    },
    remove(id) {//削除
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TimerNotExists(id);
        this.list[id] = null;
        return this.list;
    },
    removeLists(ids) {//複数削除
        if (ids == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(ids, "object")) return Fortis.error.ArgTypeWrong();
        for (let id in ids) {
            Fortis.Timer.remove(id);
        }
        return this.list;
    },
    getList() {//取得
        return this.list;
    },
    getTimer(id) {//タイマー取得
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TimerNotExists();
        return this.list[id];
    },
    start(id) {//タイマースタート
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TimerNotExists();
        this.list[id]["management"]["activity"] = true;
        return this.list[id];
    },
    stop(id) {//タイマーストップ
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TimerNotExists();
        this.list[id]["management"]["activity"] = false;
        return this.list[id];
    },
    reset(id) {//タイマーリセット(タイマーは停止状態になる)
        if (id == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TimerNotExists();
        this.list[id]["management"]["activity"] = false;
        this.list[id]["management"]["time"] = this.list[id]["time"];
        return this.list[id];
    },
    setStatus(id, time, repeat, func) {//ステータス変更
        if (id == null || time == null || repeat == null || func == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(id, "string") || !Fortis.util.checkType(time, "number") || !Fortis.util.checkType(repeat, "boolean") || !Fortis.util.checkType(func, "function")) return Fortis.error.ArgTypeWrong();
        if (this.list[id] === undefined) return Fortis.error.TimerNotExists();
        this.list[id]["time"] = time;
        this.list[id]["repeat"] = repeat;
        this.list[id]["func"] = func;
        return this.list[id];
    },
    update(delta) {//タイマーの更新
        for (let id in this.list) {
            if (this.list[id]["management"]["activity"]) {
                //console.log(this.list[id]["management"]["time"])
                this.list[id]["management"]["time"] -= delta;
                if (this.list[id]["management"]["time"] <= 0) {
                    if(Fortis.util.checkType(this.list[id]["func"],"object")){
                        this.list[id]["func"][0].shape[this.list[id]["func"][1]]();
                    }else{
                        this.list[id]["func"]();
                    }
                    if (this.list[id]["repeat"]) {
                        this.list[id]["management"]["time"] = this.list[id]["time"];
                    } else {
                        Fortis.Timer.reset(id);
                    }
                }
            }
        }
    },
}
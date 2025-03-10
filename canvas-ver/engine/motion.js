Fortis.MotionManager = {
    list: {},
    //{id:{type:タイプ,target:ターゲット,time:時間,nowTime:経過時間,from:初期値,to:最終値,now:現在の値}}
    //fade from:0or1 to・now:fromと同じ
    //pos from:Vector2 to・now:fromと同じ
    //angle from:度数法 to・now:fromと同じ
    //size from:Vector2 to・now:fromと同じ
    //scale from:0以上の整数 to・now:fromと同じ
    add(target,type,time,from,to){//追加
        if(target == null || type == null || from == null || to == null)return Fortis.error.ArgNotExists();
        
        let list = {};
        
        if(!Fortis.util,checkType(target,"object","Entity"))return Fortis.error.ArgTypeWrong();
        list["target"] = target;

        if(!Fortis.util.checkType(type,"string"))return Fortis.error.ArgTypeWrong();
        switch (type) {
            case "fade":
                list["type"] = type;
                if(!Fortis.util.checkType(from,"number") || !Fortis.util.checkType(to,"number"))return Fortis.error.ArgTypeWrong();
                list["from"] = from;
                list["to"] = to;
                break;
        }

        if(time == null){//ms
            list["time"] = 3000;
        }else if(Fortis.util.checkType(time,"number")){
            list["time"] = time;
        }else{
            return Fortis.error.ArgTypeWrong();
        }
    },
    remove(id){//ID
        if(id==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(id,"string"))return Fortis.error.ArgTypeWrong();
        if(this.list[id]===undefined)return Fortis.error.MotionNotExists(id);
        delete this.list[id];
        return this.list;
    },
    update(delta){},
    get(id){
        if(id==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(id,"string"))return Fortis.error.ArgTypeWrong();
        if(this.list[id]===undefined)return Fortis.error.MotionNotExists(id);
        return this.list[id];
    }
}
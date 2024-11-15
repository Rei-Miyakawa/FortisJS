Fortis.Scene = class{
    constructor(){
        this.type = "Scene";
        this.layer = [
        ];
    }
    getType(){//タイプ取得
        return this.type;
    }
    delete(){//削除
        for(let key in this){
            if(this.hasOwnProperty(key)){
                this[key] = null;
            }
        }
    }
}

Fortis.Layer = class{
    constructor(){
        this.type = "Layer";
        this.entity = [];
        this.ids = {};
        this.id = Fortis.util.randomID();
    }
    getType(){//タイプ取得
        return this.type;
    }
    delete(){//削除
        for(let key in this){
            if(this.hasOwnProperty(key)){
                this[key] = null;
            }
        }
    }
    getEntity(){//エンティティ取得
        return this.entities;    
    }
    add(entity){//エンティティ追加
        if(entity == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(entity,"object","Entity"))return Fortis.error.ArgTypeWrong();
        if(ids[entity.id] != undefined)return Fortis.error.EntityAlreadyExists();
        entity.push(entity);
        this.ids[entity.id] = this.entity.length-1;
        return this.entity;
    }
    addEntities(array){//エンティティを複数追加
        if(array == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(array,"array"))return Fortis.error.ArgTypeWrong();
        array.forEach(entity => {
            this.add(entity);
        });
    }
    remove(entity){//エンティティ削除
        if(entity == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(entity,"object","Entity"))return Fortis.error.ArgTypeWrong();
        if(ids[entity.id] == undefined)return Fortis.error.EntityNotExists();
        let repeat_count = this.entity.length - ids[entity.id] -1;
        let start_index = ids[entity.id]+1;
        for(let i = 0; i<repeat_count; i++){
            ids[this.entity[start_index+i].id] ++;
        }
        this.entity.splice(this.ids[entity.id],1);
        delete this.ids[entity.id];
    }
    removeEntities(array){//エンティティを複数削除
        if(array == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(array,"array"))return Fortis.error.ArgTypeWrong();
        array.forEach(entity => {
            this.remove(entity);
        });
    }
}
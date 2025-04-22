Fortis.Scene = class {
    get type() {
        return "Scene";
    }
    constructor() {
        this.layer = [];
        this.ids = {};
        this.namedLayer = {
            "BG": null,
            "Obj": null,
            "UI": null,
        }
        for (let key in this.namedLayer) {
            let new_layer = new Fortis.Layer()
            this.layer.push(new_layer);
            this.namedLayer[key] = new_layer;
        }
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
    add(layer) {//レイヤー追加
        if (layer == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(layer, "object", "Layer")) return Fortis.error.ArgTypeWrong();
        if (this.ids[layer.id] != undefined) return Fortis.error.LayerAlreadyExists();
        this.layer.push(layer);
        this.ids[layer.id] = this.layer.length - 1;
        return this.layer;
    }
    addLayers(array) {//レイヤーを複数追加
        if (array == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(array, "object")) return Fortis.error.ArgTypeWrong();
        array.forEach(layer => {
            this.add(layer);
        });
    }
    remove(layer) {//レイヤー削除
        if (layer == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(layer, "object", "Layer")) return Fortis.error.ArgTypeWrong();
        if (this.ids[layer.id] === undefined) return Fortis.error.LayerNotExists();
        if (layer.id == this.namedLayer["BG"].id || layer.id == this.namedLayer["Obj"].id || layer.id == this.namedLayer["UI"].id) return Fortis.error.CantDeleteNamedLayer();
        let repeat_count = this.layer.length - this.ids[layer.id] - 1;
        let start_index = this.ids[layer.id] + 1;
        for (let i = 0; i < repeat_count; i++) {
            this.ids[this.layer[start_index + i].id]++;
        }
        this.layer.splice(this.ids[layer.id], 1);
        delete this.ids[layer.id];
        return this.layer;
    }
    removeLayers(array) {//レイヤーを複数削除
        if (array == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(array, "object")) return Fortis.error.ArgTypeWrong();
        array.forEach(layer => {
            this.remove(layer);
        });
    }
    reorder(layer, index) {//順番を変える
        if (layer == null || index == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(layer, "object", "Layer") || !Fortis.util.checkType(index, "number")) return Fortis.error.ArgTypeWrong();
        if (this.ids[layer.id] === undefined) return Fortis.error.LayerNotExists();
        if (index < 0 || index > this.layer - 1) return Fortis.error.ArgIncorrectVarRange();
        if (index == this.ids[layer.id]) return this.layer;
        let index_id = this.layer[index].id
        this.layer[this.ids[layer.id]] = this.layer[index];
        this.layer[this.ids[index_id]] = layer;
        this.ids[index_id] = this.ids[layer.id];
        this.ids[layer.id] = index;
        return this.layer;
    }
    getBG() {//BGのレイヤー取得
        return this.namedLayer["BG"];
    }
    getObj() {//Objのレイヤー取得
        return this.namedLayer["Obj"];
    }
    getUI() {//UIのレイヤー取得
        return this.namedLayer["UI"];
    }
}

Fortis.Layer = class {
    get type() {
        return "Layer";
    }
    constructor() {
        this.entity = [];
        this.ids = {};
        this.id = Fortis.util.randomID();
        this.camera = new Fortis.Camera();
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
    getEntity() {//エンティティ取得
        return this.entity;
    }
    add(entity) {//エンティティ追加
        if (entity == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(entity, "object", "Entity") && !Fortis.util.checkType(entity,"object","Function")) return Fortis.error.ArgTypeWrong();
        if (this.ids[entity.id] != undefined) return Fortis.error.EntityAlreadyExists();
        this.entity.push(entity);
        this.ids[entity.id] = this.entity.length - 1;
        return this.entity;
    }
    addEntities(array) {//エンティティを複数追加
        if (array == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(array, "object")) return Fortis.error.ArgTypeWrong();
        array.forEach(entity => {
            this.add(entity);
        });
    }
    remove(entity) {//エンティティ削除
        if (entity == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(entity, "object", "Entity") && !Fortis.util.checkType(entity,"object","Function")) return Fortis.error.ArgTypeWrong();
        if (this.ids[entity.id] === undefined) return Fortis.error.EntityNotExists();
        let repeat_count = this.entity.length - this.ids[entity.id] - 1;
        let start_index = this.ids[entity.id] + 1;
        for (let i = 0; i < repeat_count; i++) {
            this.ids[this.entity[start_index + i].id]++;
        }
        this.entity.splice(this.ids[entity.id], 1);
        delete this.ids[entity.id];
        return this.entity;
    }
    removeEntities(array) {//エンティティを複数削除
        if (array == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(array, "object")) return Fortis.error.ArgTypeWrong();
        array.forEach(entity => {
            this.remove(entity);
        });
    }
    reorder(entity, index) {//順番を変える
        if (entity == null || index == null) return Fortis.error.ArgNotExists();
        if ((!Fortis.util.checkType(entity, "object", "Entity") && !Fortis.util.checkType(entity,"object","Function")) || !Fortis.util.checkType(index, "number")) return Fortis.error.ArgTypeWrong();
        if (this.ids[entity.id] === undefined) return Fortis.error.EntityNotExists();
        if (index < 0 || index > this.entity - 1) return Fortis.error.ArgIncorrectVarRange();
        if (index == this.ids[entity.id]) return this.entity;
        let index_id = this.entity[index].id
        this.entity[this.ids[entity.id]] = this.entity[index];
        this.entity[this.ids[index_id]] = entity;
        this.ids[index_id] = this.ids[entity.id];
        this.ids[entity.id] = index;
        return this.entity;
    }
}

Fortis.CRFunction = class{
    get type() {
        return "CustomRenderFunction";
    }
    constructor(func) {
        if(func == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(func,"function"))return Fortis.error.ArgTypeWrong();
        this.func = func;//引数にdeltaを入れておくこと
        this.activity = true;
        this.id = Fortis.util.randomID();
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
    setActivity(boolean){
        if(boolean == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(boolean,"boolean"))return Fortis.error.ArgTypeWrong();
        this.activity = boolean;
        return boolean;
    }
    getActivity(){
        return this.activity;
    }
    setFunc(func){
        if(func == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(func,"function"))return Fortis.error.ArgTypeWrong();
        this.func = func;
        return func;
    }
    getFunc(){
        return this.func;
    }
    getId(){
        return this.id;
    }
}

Fortis.Camera = class{
    get type() {
        return "Camera";
    }
    constructor() {
        this.pos = new Fortis.Vector2();
        this.displayRange = Fortis.Game.canvasCfg.initialSize.copy();
        this.id = Fortis.util.randomID();
        this.data = null;
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
    getPos(){//位置を取得
        return this.pos;
    }
    setPos(vec){
        if(vec == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(vec,"object","Vector2"))return Fortis.error.ArgTypeWrong();
        this.pos = vec;
        return vec;
    }
    getDisplayRange(){//位置を取得
        return this.displayRange;
    }
    setDisplayRange(vec){
        if(vec == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(vec,"object","Vector2"))return Fortis.error.ArgTypeWrong();
        this.displayRange = vec;
        return vec;
    }
    shot(){
        this.data = Fortis.Game.context.getImageData(this.pos.x,this.pos.y,this.displayRange.x,this.displayRange.y)
        console.log(this.data)
    return this.data;
    }
    getData(){
        return this.data;
    }
}
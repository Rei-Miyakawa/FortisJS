Fortis.ColliderGroup = class{
    get type() {
        return "ColliderGroup";
    }
    constructor() {
        this.id = Fortis.util.randomID();
        this.pos = new Fortis.Vector2();
        this.scale = new Fortis.Vector2(1,1);
        this.angle = 0;
        this.colliders = {};
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
    getID(){
        return this.id;
    }
    getPos() {//位置取得
        return this.pos;
    }
    setPos(vec) {//位置設定
        if (vec == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vec, "object", "Vector2")) return Fortis.error.ArgTypeWrong();
        return this.pos = vec.copy();
    }
    getScale() {//拡大縮小率を取得
        return this.scale;
    }
    setScale(value) {//拡大縮小率を変更
        if (value == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(value, "object", "Vector2")) return Fortis.error.ArgTypeWrong();
        if (value.x < 0 || value.y < 0) return Fortis.error.ArgIncorrectVarRange();
        this.scale = value;
        return this.scale;
    }
    getAngle() {//角度取得
        return this.angle;
    }
    setAngle(new_angle) {//角度を変える
        if (new_angle == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(new_angle, "number")) return Fortis.error.ArgTypeWrong();
        this.angle = new_angle;
        return this.angle;
    }
    add(collider){
        if(collider ==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(collider,"object","Collider"))return Fortis.error.ArgTypeWrong();
        if(this.colliders[collider.id] !== undefined)return Fortis.error.ColliderAlreadyExists(collider.id);
        this.colliders[collider.id] = collider;
        return collider;
    }
    addList(list){
        if(list == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(list,"object"))return Fortis.error.ArgTypeWrong();
        for(col in list){
            this.add(list[col]);
        }
    }
    remove(collider){
        if(collider ==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(collider,"object","Collider"))return Fortis.error.ArgTypeWrong();
        if(this.colliders[collider.id] === undefined)return Fortis.error.ColliderNotExists(collider.id);
        this.colliders[collider.id] = null;
        delete this.colliders[collider.id];
        return collider;
    }
    removeList(list){
        if(list == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(list,"object"))return Fortis.error.ArgTypeWrong();
        for(col in list){
            this.remove(list[col]);
        }
    }
    get(collider){
        if(collider ==null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(collider,"object","Collider"))return Fortis.error.ArgTypeWrong();
        if(this.colliders[collider.id] === undefined)return false;
        return this.colliders[collider.id]
    }
    getAll(){
        return this.colliders;
    }
}

Fortis.ProtoCollider = class{
    constructor(distance) {
        this.id = Fortis.util.randomID();
        if (distance == null) {
            this.distance = new Fortis.Vector2();
        } else if (Fortis.util.checkType(distance, "obejct", "Vector2")) {
            this.distance = distance;
        } else {
            Fortis.error.ArgTypeWrong();
        }
        this.activity = true;
    }
    delete() {//削除
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                this[key] = null;
            }
        }
    }
    getDistance() {
        return this.distance;
    }
    setDistance(vec) {
        if (vec == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vec, "obejct", "Vector2")) return Fortis.error.ArgTypeWrong();
        this.distance = vec;
        return vec;
    }
    getActivity(){
        return this.activity;
    }
    reverseAvtivity(){
        if(this.activity){
            this.activity = false;
        }else{
            this.activity = true;
        }
        return this.activity;
    }
    getID(){
        return this.id;
    }
}

Fortis.LineCollider = class extends Fortis.ProtoCollider{
    get type() {
        return "LineCollider";
    }
    constructor(vec, distance) {
        super(distance);
        if (vec != null) {
            if (!Fortis.util.checkType(vec, "object","Vector2")) return Fortis.error.ArgTypeWrong();
            this.vector = vec;
        } else {
            this.vector = new Fortis.Vector2(50,0);
        }
    }
    getType() {//タイプ取得
        return this.type;
    }
    getVector() {
        return this.vector;
    }
    setVector(vec) {
        if (vec == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vec, "obejct", "Vector2")) return Fortis.error.ArgTypeWrong();
        this.vector = vec;
        return vec;
    }
}

Fortis.RectCollider = class extends Fortis.ProtoCollider{
    get type() {
        return "RectCollider";
    }
    constructor(width,height, distance) {
        super(distance);
        this.size = new Fortis.Vector2(30,30);
        if(width != null){
            if(!Fortis.util.checkType(width,"number"))return Fortis.error.ArgTypeWrong();
            if(width<=0)return Fortis.error.ArgIncorrectVarRange();
            this.size.x = width;
        }
        if(height != null){
            if(!Fortis.util.checkType(height,"number"))return Fortis.error.ArgTypeWrong();
            if(height<=0)return Fortis.error.ArgIncorrectVarRange();
            this.size.y = height;
        }
    }
    getType() {//タイプ取得
        return this.type;
    }
    getSize() {
        return this.size;
    }
    setSize(vec) {
        if (vec == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vec, "obejct", "Vector2")) return Fortis.error.ArgTypeWrong();
        this.size = vec;
        return vec;
    }
}

Fortis.CircleCollider = class extends Fortis.ProtoCollider{
    get type() {
        return "CircleCollider";
    }
    constructor(radX,radY, distance) {
        super(distance);
        this.radSize = Fortis.Vector2(40,20);
        if(radX != null){
            if(!Fortis.util.checkType(radX,"number"))return Fortis.error.ArgTypeWrong();
            if(radX<=0)return Fortis.error.ArgIncorrectVarRange();
            this.radSize.x = radX;
        }
        if(radY != null){
            if(!Fortis.util.checkType(radY,"number"))return Fortis.error.ArgTypeWrong();
            if(radY<=0)return Fortis.error.ArgIncorrectVarRange();
            this.radSize.y = radY;
        }
    }
    getType() {//タイプ取得
        return this.type;
    }
    getRadSize() {
        return this.radSize;
    }
    setRadSize(vec) {
        if (vec == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vec, "obejct", "Vector2")) return Fortis.error.ArgTypeWrong();
        this.radSize = vec;
        return vec;
    }
}

Fortis.RegPolygonCollider = class extends Fortis.ProtoCollider{
    get type() {
        return "RegPolygonCollider";
    }
    constructor(radius, sides, distance) {
        super(distance);
        this.radius = 25;
        this.sides = 3;

        if (radius != null) {
            if (!Fortis.util.checkType(radius, "number")) return Fortis.error.ArgTypeWrong();
            if (radius <= 0) return Fortis.error.ArgIncorrectVarRange();
            this.radius = radius;
        }
        if (sides != null) {
            if (!Fortis.util.checkType(sides, "number")) return Fortis.error.ArgTypeWrong();
            if (sides <= 2) return Fortis.error.ArgIncorrectVarRange();
            this.sides = sides;
        }
    }
    getType() {//タイプ取得
        return this.type;
    }
    getRadius() {//中心からの距離を取得
        return this.radius;
    }
    setRadius(raidus) {//中心からの距離を変更
        if (raidus == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(raidus, "number")) return Fortis.error.ArgTypeWrong();
        if (raidus <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.radius = raidus;
        if (this.vertices != false) {
            this.vertices = this.getPolyVertices();
        }
        return raidus;
    }
    getSides() {//頂点の数を取得
        return this.sides;
    }
    setSides(sides) {//頂点の数を変更
        if (sides == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(sides, "number")) return Fortis.error.ArgTypeWrong();
        if (sides <= 2) return Fortis.error.ArgIncorrectVarRange();
        this.sides = sides;
        if (this.vertices != false) {
            this.vertices = this.getPolyVertices();
        }
        return sides;
    }
}

Fortis.PolygonCollider = class extends Fortis.ProtoCollider{
    get type() {
        return "PolygonCollider";
    }
    constructor(vertices, distance) {
        super(distance);
        if (vertices == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vertices, "object")) return Fortis.error.ArgTypeWrong();
        this.vertices = vertices;
        if (distance == null) {
            this.distance = new Fortis.Vector2();
        } else if (Fortis.util.checkType(distance, "obejct", "Vector2")) {
            this.distance = distance;
        } else {
            Fortis.error.ArgTypeWrong();
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
    getVertices() {//頂点を取得
        return this.vertices;
    }
    setVertices(vertices) {//頂点を変更
        if (vertices == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vertices, "object")) return Fortis.error.ArgTypeWrong();
        this.vertices = vertices;
        return vertices;
    }
}
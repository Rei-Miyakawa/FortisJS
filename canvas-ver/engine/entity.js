Fortis.Entity = class {
    constructor(shape, material) {
        this.type = "Entity";
        this.id = Fortis.util.randomID();
        if (shape == null || shape == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(shape, "object", "Shape") || !Fortis.util.checkType(material, "object", "Material")) return Fortis.error.ArgTypeWrong();
        this.shape = shape;
        this.material = material;
        this.pos = new Fortis.Vector2();
        this.scale = 1;
        this.angle = 0;
        this.invisibility = false;
    }
    getType() {//タイプ取得
        return this.type;
    }
    getID() {//ID取得
        return this.id;
    }
    delete() {//削除
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                this[key] = null;
            }
        }
    }
    show() {//表示させる
        this.invisibility = true;
    }
    hide() {//隠す
        this.invisibility = false;
    }
    getShape() {//図形取得
        return this.shape;
    }
    setShape(new_shape) {//図形変更
        if (new_shape == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(new_shape, "object", "Shape")) return Fortis.error.ArgTypeWrong();
        this.shape = new_shape;
        return this.shape;
    }
    getMaterial() {//マテリアル取得
        return this.material;
    }
    setMaterial(new_material) {//図形変更
        if (new_material == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(new_material, "object", "Material")) return Fortis.error.ArgTypeWrong();
        this.material = new_material;
        return this.material;
    }
    getPos(normalize) {//位置取得
        if (normalize) return new Fortis.Vector2(this.pos.x / Fortis.Game.size.x, this.pos.y / Fortis.Game.size.y);//正規化(画面のサイズと比べてどのくらいか)
        return this.pos;
    }
    setPos(vec) {//位置設定
        if (vec == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vec, "object", "Vector2")) return Fortis.error.ArgTypeWrong();
        return this.pos = vec.copy();
    }
    move(vec) {//相対的な移動
        if (vec == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vec, "object", "Vector2")) return Fortis.error.ArgTypeWrong();
        return this.pos.add(vec);
    }
    getScale() {//拡大縮小率を取得
        return this.scale;
    }
    setScale(value) {//拡大縮小率を変更
        if (value == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(value, "number")) return Fortis.error.ArgTypeWrong();
        if (value < 0) return Fortis.error.ArgIncorrectVarRange();
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
}
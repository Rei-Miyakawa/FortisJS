Fortis.LineShape = class {
    get type() {
        return "LineShape";
    }
    constructor(length, thick) {
        if (length != null) {
            if (!Fortis.util.checkType(length, "number")) return Fortis.error.ArgTypeWrong();
            if (length < 0) return Fortis.error.ArgIncorrectVarRange();
            this.length = length;
        } else {
            this.length = 50;
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
    getLength() {//長さ取得
        return this.length;
    }
    setLength(length) {//長さ指定
        if (length == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(length, "number")) return Fortis.error.ArgTypeWrong();
        if (length < 0) return Fortis.error.ArgIncorrectVarRange();
        this.length = length;
        return this.length;
    }
}

Fortis.RectShape = class {
    get type() {
        return "RectShape";
    }
    constructor(width, height) {
        let tmpWidth = 30;
        let tmpHeight = 30;
        if (width != null) {
            if (!Fortis.util.checkType(width, "number")) return Fortis.error.ArgTypeWrong();
            if (width <= 0) return Fortis.error.ArgIncorrectVarRange();
            tmpWidth = width;
        }
        if (height != null) {
            if (!Fortis.util.checkType(height, "number")) return Fortis.error.ArgTypeWrong();
            if (height <= 0) return Fortis.error.ArgIncorrectVarRange();
            tmpHeight = height;
        }
        this.size = new Fortis.Vector2(tmpWidth, tmpHeight);
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
    getWidth() {//横幅取得
        return this.size.x;
    }
    setWidth(width) {//横幅変更
        if (width == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(width, "number")) return Fortis.error.ArgTypeWrong();
        if (width <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.size.x = width;
        return width;
    }
    getHeight() {//縦幅取得
        return this.size.y;
    }
    setHeight(height) {//横幅変更
        if (height == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(height, "number")) return Fortis.error.ArgTypeWrong();
        if (height <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.size.y = height;
        return height;
    }
}

Fortis.CircleShape = class{
    get type() {
        return "CircleShape";
    }
    constructor(radius) {
        if(radius == null){
            this.radius = 20;
        }else{
            if(!Fortis.util.checkType(radius,"number"))return Fortis.error.ArgTypeWrong();
            if(radius <= 0)return Fortis.error.ArgIncorrectVarRange();
            this.radius = radius;
        }
        this.degree = 360;
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
    getRadius(){//半径取得
        return this.radius;    
    }
    setRadius(radius){//半径変更
        if(radius == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(radius,"number"))return Fortis.error.ArgTypeWrong();
        if(radius <= 0)return Fortis.error.ArgIncorrectVarRange();
        this.radius = radius; 
    }
    getDegree(){//弧の角度取得
        return this.degree;    
    }
    setDegree(degree){//弧の角度変更
        if(degree == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(degree,"number"))return Fortis.error.ArgTypeWrong();
        if(degree <= 0)return Fortis.error.ArgIncorrectVarRange();
        this.degree = degree; 
    }
}

Fortis.EllipseShape = class{
    get type() {
        return "EllipseShape";
    }
    constructor(radiusX,radiusY) {
        let radX = 40;
        let radY = 20;
        if(radiusX != null){
            if(!Fortis.util.checkType(radiusX,"number"))return Fortis.error.ArgTypeWrong();
            if(radiusX <= 0)return Fortis.error.ArgIncorrectVarRange();
            radX = radiusX;
        }
        if(radiusY != null){
            if(!Fortis.util.checkType(radiusY,"number"))return Fortis.error.ArgTypeWrong();
            if(radiusY <= 0)return Fortis.error.ArgIncorrectVarRange();
            radY = radiusY;
        }
        this.radSize = new Fortis.Vector2(radX,radY);
        this.degree = 360;
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
    getRadius(){//半径取得
        return this.radSize;    
    }
    setRadius(radius){//半径変更
        if(radius == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(radius,"object","Vector2"))return Fortis.error.ArgTypeWrong();
        this.radSize = radius; 
    }
    getRadiusX(){//長辺の半径取得
        return this.radSize.x;    
    }
    setRadiusX(radius){//長辺の半径変更
        if(radius == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(radius,"number"))return Fortis.error.ArgTypeWrong();
        if(radius <= 0)return Fortis.error.ArgIncorrectVarRange();
        this.radSize.x = radius; 
    }
    getRadiusY(){//短辺の半径取得
        return this.radSize.y;    
    }
    setRadiusY(radius){//短辺の半径変更
        if(radius == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(radius,"number"))return Fortis.error.ArgTypeWrong();
        if(radius <= 0)return Fortis.error.ArgIncorrectVarRange();
        this.radSize.y = radius; 
    }
    getDegree(){//弧の角度取得
        return this.degree;    
    }
    setDegree(degree){//弧の角度変更
        if(degree == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(degree,"number"))return Fortis.error.ArgTypeWrong();
        if(degree <= 0)return Fortis.error.ArgIncorrectVarRange();
        this.degree = degree; 
    }
}
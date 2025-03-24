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

Fortis.CircleShape = class {
    get type() {
        return "CircleShape";
    }
    constructor(radius) {
        if (radius == null) {
            this.radius = 20;
        } else {
            if (!Fortis.util.checkType(radius, "number")) return Fortis.error.ArgTypeWrong();
            if (radius <= 0) return Fortis.error.ArgIncorrectVarRange();
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
    getRadius() {//半径取得
        return this.radius;
    }
    setRadius(radius) {//半径変更
        if (radius == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(radius, "number")) return Fortis.error.ArgTypeWrong();
        if (radius <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.radius = radius;
        return radius;
    }
    getDegree() {//弧の角度取得
        return this.degree;
    }
    setDegree(degree) {//弧の角度変更
        if (degree == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(degree, "number")) return Fortis.error.ArgTypeWrong();
        if (degree <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.degree = degree;
        return degree;
    }
}

Fortis.EllipseShape = class {
    get type() {
        return "EllipseShape";
    }
    constructor(radiusX, radiusY) {
        let radX = 40;
        let radY = 20;
        if (radiusX != null) {
            if (!Fortis.util.checkType(radiusX, "number")) return Fortis.error.ArgTypeWrong();
            if (radiusX <= 0) return Fortis.error.ArgIncorrectVarRange();
            radX = radiusX;
        }
        if (radiusY != null) {
            if (!Fortis.util.checkType(radiusY, "number")) return Fortis.error.ArgTypeWrong();
            if (radiusY <= 0) return Fortis.error.ArgIncorrectVarRange();
            radY = radiusY;
        }
        this.radSize = new Fortis.Vector2(radX, radY);
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
    getRadius() {//半径取得
        return this.radSize;
    }
    setRadius(radius) {//半径変更
        if (radius == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(radius, "object", "Vector2")) return Fortis.error.ArgTypeWrong();
        this.radSize = radius;
        return radius;
    }
    getRadiusX() {//長辺の半径取得
        return this.radSize.x;
    }
    setRadiusX(radius) {//長辺の半径変更
        if (radius == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(radius, "number")) return Fortis.error.ArgTypeWrong();
        if (radius <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.radSize.x = radius;
        return this.radSize.x;
    }
    getRadiusY() {//短辺の半径取得
        return this.radSize.y;
    }
    setRadiusY(radius) {//短辺の半径変更
        if (radius == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(radius, "number")) return Fortis.error.ArgTypeWrong();
        if (radius <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.radSize.y = radius;
        return this.radSize.y;
    }
    getDegree() {//弧の角度取得
        return this.degree;
    }
    setDegree(degree) {//弧の角度変更
        if (degree == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(degree, "number")) return Fortis.error.ArgTypeWrong();
        if (degree <= 0) return Fortis.error.ArgIncorrectVarRange();
        this.degree = degree;
        return this.degree;
    }
}

Fortis.RegPolygonShape = class {
    get type() {
        return "RegPolygonShape";
    }
    constructor(type, radius, sides) {
        this.radius = 25;
        this.sides = 3;
        this.vertices;

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
        if (type == null) {//先に頂点を計算するか(trueならする、falseならしない、指定なしはtrue判定)
            this.vertices = this.getPolyVertices();
        } else if (type) {
            this.vertices = this.getPolyVertices();
        } else if (!type) {
            this.vertices = false;
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
    getPolyVertices() {//正多角形の頂点の相対的な座標を出力
        let vertices = [];
        let angle_increment = 360 / this.sides;
        let a = angle_increment;
        let b = 360;
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        let gcd = a;
        let lcm = (angle_increment * 360) / gcd;
        let points = lcm / angle_increment;
        let angle = 270;
        vertices.push(Fortis.util.getPointOnCircle(new Fortis.Vector2(), this.radius, angle));
        for (let i = 1; i < points; i++) {
            angle += angle_increment;
            vertices.push(Fortis.util.getPointOnCircle(new Fortis.Vector2(), this.radius, angle));
        }
        return vertices;
    }
    getVertices() {//頂点取得
        return this.vertices;
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

Fortis.PolygonShape = class {
    get type() {
        return "PolygonShape";
    }
    constructor(vertices) {
        if (vertices == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(vertices, "object")) return Fortis.error.ArgTypeWrong();
        this.vertices = vertices;
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

Fortis.TextShape = class {
    get type() {
        return "TextShape";
    }
    constructor(font, text) {
        if (font == null) {
            this.font = new Fortis.Font();
        } else {
            if (!Fortis.util.checkType(font, "object", "Font")) return Fortis.error.ArgTypeWrong();
            this.font = font;
        }
        if (text == null) {
            this.text = "Hello World.";
        } else {
            if (!Fortis.util.checkType(text, "string")) return Fortis.error.ArgTypeWrong();
            this.text = text;
        }
        this.direction = "inherit";
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
    getText() {//テキスト取得
        return this.text;
    }
    setText(text) {//テキスト設定
        if (text == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(text, "string")) return Fortis.error.ArgTypeWrong();
        this.text = text;
        return this.text;
    }
    getFont() {//フォント取得
        return this.font;
    }
    setFont(font) {//フォント設定
        if (font == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(font, "object", "Font")) return Fortis.error.ArgTypeWrong();
        this.font = font;
        return this.font;
    }
    getDirection() {//フォント取得
        return this.direction;
    }
    setDirection(direction) {//フォント設定
        if (direction == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(direction, "string")) return Fortis.error.ArgTypeWrong();
        this.direction = direction;
        return this.direction;
    }
}

Fortis.ImageShape = class {
    get type() {
        return "ImageShape";
    }
    constructor(imgOrVec) {//imgもしくはVector2を引数とする
        //サイズ
        if (imgOrVec == null) {
            this.size = new Fortis.Vector2(100, 100);
        } else if (Fortis.util.checkType(imgOrVec, "object") && imgOrVec.tagName == "IMG") {
            this.size = new Fortis.Vector2(imgOrVec.width, imgOrVec.height);
        } else if (Fortis.util.checkType(imgOrVec, "object", "Vector2")) {
            this.size = imgOrVec.copy();
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        this.clipPos;
        this.clipSize;
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
    setSize(imgOrVec) {//サイズ変更
        if (imgOrVec == null) {
            this.size = new Fortis.Vector2(100, 100);
        } else if (Fortis.util.checkType(imgOrVec, "object", "Vector2")) {
            this.size = imgOrVec.copy();
        } else if (Fortis.util.checkType(imgOrVec, "object") && imgOrVec.tagName == "IMG") {
            this.size = new Fortis.Vector2(imgOrVec.width, imgOrVec.height);
        } else {
            return Fortis.error.ArgTypeWrong();
        }
        return this.size;
    }
    getSize() {//サイズ取得
        return this.size;
    }
    setClip(pos, size) {//画像クリップの情報を設定
        if (pos == null) {
            this.clipPos = new Fortis.Vector2();
        } else if (Fortis.util.checkType(pos, "object", "Vector2")) {
            this.clipPos = pos;
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        if (size == null) {
            this.clipSize = new Fortis.Vector2();
        } else if (Fortis.util.checkType(size, "object", "Vector2")) {
            this.clipSize = size;
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        return { pos: this.clipPos, size: this.clipSize };
    }
    getClip() {//クリップの情報を取得
        return { pos: this.clipPos, size: this.clipSize };
    }
}

Fortis.SpriteShape = class {
    get type() {
        return "SpriteShape";
    }
    constructor(img, aspect, frameCount, size) {//imgもしくはVector2を引数とする・aspectは画像を縦横に分割する数
        this.nowFrame = 1;//表示中のフレーム

        if (aspect == null) {
            this.aspect = new Fortis.Vector2(1, 1);
        } else if (Fortis.util.checkType(aspect, "object", "Vector2")) {
            this.aspect = aspect.copy();
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        if (frameCount == null) {
            this.frameCount = 1;
        } else if (Fortis.util.checkType(frameCount, "number")) {
            this.frameCount = frameCount;
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        if (img == null) {
            this.imgSize = new Fortis.Vector2(100, 100);
            let imgSizeCopy = this.imgSize.copy();
            this.clipSize = new Fortis.Vector2(imgSizeCopy.x*(1/this.aspect.x),imgSizeCopy.y*(1/this.aspect.y));
        } else if (Fortis.util.checkType(img, "object") && img.tagName == "IMG") {
            this.imgSize = new Fortis.Vector2(img.width, img.height);
            let imgSizeCopy = this.imgSize.copy();
            this.clipSize = new Fortis.Vector2(imgSizeCopy.x*(1/this.aspect.x),imgSizeCopy.y*(1/this.aspect.y));
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        //サイズ
        if (size == null) {
            this.size = this.clipSize.copy()
        } else if (Fortis.util.checkType(size, "object", "Vector2")) {
            this.size = size.copy();
        } else {
            return Fortis.error.ArgTypeWrong();
        }

        this.autoId;
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
    setSize(size) {//サイズ変更
        if (size == null) return Fortis.error.ArgNotExists();
        if (Fortis.util.checkType(size, "object", "Vector2")) {
            this.size = size.copy();
        } else {
            return Fortis.error.ArgTypeWrong();
        }
        return this.size;
    }
    getSize(){//サイズ取得
        return this.size;    
    }
    setImgSize(img) {//サイズ変更(画像を引数とする)
        if (img == null) return Fortis.error.ArgNotExists();
        if (Fortis.util.checkType(img, "object") && img.tagName == "IMG") {
            this.imgSize = new Fortis.Vector2(img.width, img.height);
            let imgSizeCopy = this.imgSize.copy();
            this.clipSize = new Fortis.Vector2(imgSizeCopy.x*(1/this.aspect.x),imgSizeCopy.y*(1/this.aspect.y));
        } else {
            return Fortis.error.ArgTypeWrong();
        }
        return this.imgSize;
    }
    getImgSize() {//サイズ取得
        return this.imgSize;
    }
    setAspect(aspect) {//アスペクト比を変更
        if (aspect == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(aspect, "object", "Vector2")) return Fortis.error.ArgTypeWrong();
        this.aspect = aspect;
        let imgSizeCopy = this.imgSize.copy();
            this.clipSize = new Fortis.Vector2(imgSizeCopy.x*(1/this.aspect.x),imgSizeCopy.y*(1/this.aspect.y));
        return aspect;
    }
    getAspect() {//アスペクト比を取得
        return this.aspect;
    }
    nextFrame() {//次のフレームへ
        this.nowFrame++;
        if (this.frameCount < this.nowFrame) this.nowFrame = 1;
        return this.nowFrame;
    }
    backFrame() {//前のフレームへ
        this.nowFrame--;
        if (this.nowFrame < 1) this.nowFrame = this.frameCount;
        return this.nowFrame;
    }
    set(number) {//フレームのジャンプ
        if (number == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(number, "number")) return Fortis.error.ArgTypeWrong();
        if (number < 1 || number > this.frameCount) return Fortis.error.ArgIncorrectVarRange();
        this.nowFrame = number;
        return this.nowFrame;
    }
    getNowFrame() {//現在のフレームを取得
        return this.nowFrame;
    }
    setRepeat(time,order){//自動でアニメーション

        let animationOrder;
        if(order == null){
            animationOrder = "nextFrame";
        }else if(Fortis.util.checkType(order,"boolean")){
            if(order){
                animationOrder = "nextFrame";
            }else{
                animationOrder = "backFrame";
            }
        }else{
            return Fortis.error.ArgTypeWrong();
        }
        if(time == null){
            this.autoId = Fortis.Timer.add(1000,true,animationOrder,this);
        }else if(Fortis.util.checkType(time,"number")){
            this.autoId = Fortis.Timer.add(time,true,animationOrder,this);
        }
        return this.autoId;
    }
    deleteRepeat(){//自動アニメーションを削除
        Fortis.Timer.remove(this.autoId);
    }
    start(){//自動アニメーション開始
        return Fortis.Timer.start(this.autoId);
    }
    stop(){//自動アニメーション停止
        return Fortis.Timer.stop(this.autoId);
    }
    reset(){//自動アニメーションリセット
        return Fortis.Timer.reset(this.autoId);
    }
}
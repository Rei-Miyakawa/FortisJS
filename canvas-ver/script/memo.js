Fortis.SimpleSound = class {
    get type() {
        return "SimpleSound";
    }
    constructor(sound) {
        if (!Fortis.util.checkType(sound, "object") || sound.tagName === undefined) return Fortis.error.ArgTypeWrong();
        if (!sound.tagName == "AUDIO") return Fortis.error.ArgTypeWrong();
        this.sound = sound;
        this.rate = sound.playbackRate;//再生速度
        this.volume = sound.volume;//0.0～1.0
        this.time = sound.duration * 1000;//再生時間(msに直す)
        this.loop = sound.loop;
        this.status = true;//falseで再生中、trueで停止/終了
        this.fadeOutData = { id: null, time: null, tId: null };//Timerで指定の時間まで待ち、fadeOut関数でtransitionの関数を実行。tIdはtransitionManagerの方でのID
        this.fadeInData = { id: null }//transitionで管理
        this.sound.onended = () => {
            this.status = true;
        }
        this.sound.ontimeupdate = () => {
            this.nowTime = this.sound.currentTime;
        }
    }
    getType() {//タイプ取得
        return this.type;
    }
    delete() {//削除
        if (Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
            Fortis.Timer.remove(this.fadeOutData.id);
        }
        if (Fortis.TransitionManager.get(this.fadeOutData.tId) != false) {
            Fortis.TransitionManager.remove(this.fadeOutData.tId);
        }
        if (Fortis.TransitionManager.get(this.fadeInData) != false) {
            Fortis.TransitionManager.remove(this.fadeInData.id);
        }
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                this[key] = null;
            }
        }
    }
    setSound(sound) {//サウンドを設定
        if (!Fortis.util.checkType(sound, "object") || sound.simpleName === undefined) return Fortis.error.ArgTypeWrong();
        if (!sound.simpleName == "AUDIO") return Fortis.error.ArgTypeWrong();
        this.sound = sound;
        this.rate = sound.playbackRate;
        this.volume = sound.volume;
        this.time = sound.duration * 1000;
        this.nowTime = sound.currentTime;
        this.loop = sound.loop;
        this.status = true;
        return this.sound;
    }
    getSound() {//サウンドを取得
        return this.sound;
    }
    setRate(value) {//再生速度を設定
        if (value == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(value, "number")) return Fortis.error.ArgTypeWrong();
        this.sound.playbackRate = value;
        this.rate = value;
        return this.rate;
    }
    setVolume(value) {//音量を設定
        if (value == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(value, "number")) return Fortis.error.ArgTypeWrong();
        if (value < 0 || value > 1) return Fortis.error.ArgIncorrectVarRange();
        this.sound.volume = value;
        this.volume = value;
        return this.volume;
    }
    setNowTime(value) {//現在の時間を設定(ms)
        if (value == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(value, "number")) return Fortis.error.ArgTypeWrong();
        if (value < 0 || value > this.time) return Fortis.error.ArgIncorrectVarRange();
        this.sound.currentTime = value / 1000;
        return value;
    }
    setLoop(boolean) {//ループするか
        if (boolean == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(boolean, "boolean")) return Fortis.error.ArgTypeWrong();
        this.sound.loop = boolean;
        this.loop = boolean;
        return this.loop;
    }
    getRate() {//再生速度を取得
        return this.rate;
    }
    getVolume() {//音量を取得
        return this.volume;
    }
    getTime() {//再生時間を取得
        return this.time;
    }
    getNowTime() {//現在の再生時間を取得
        return this.sound.currentTime * 1000;
    }
    getloop() {//ループするか
        return this.loop;
    }
    getStatus() {//現在の状況を取得
        return this.status;
    }
    play(time, fadeIn, fadeOut) {//再生
        let Time = 0;
        if (time != null) {
            if (!Fortis.util.checkType(time, "number")) return Fortis.error.ArgTypeWrong();
            if (time < 0 || time > this.time) return Fortis.error.ArgIncorrectVarRange();
            Time = time;
        }

        if (this.fadeInData.id != null && Fortis.TransitionManager.get(this.fadeInData.id) != false) {
            Fortis.TransitionManager.remove(this.fadeInData.id);
        }
        if (this.fadeOutData.tId != null && Fortis.TransitionManager.get(this.fadeOutData.tId) != false) {
            Fortis.TransitionManager.remove(this.fadeOutData.tId);
        }
        if (this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
            Fortis.Timer.remove(this.fadeOutData.id);
        }

        this.status = false;
        this.sound.currentTime = Time / 1000;
        this.sound.play();
        this.sound.volume = this.volume;
        this.sound.playbackRate = this.rate;
        this.sound.loop = this.loop;



        if (fadeIn != null) {
            if (!Fortis.util.checkType(fadeIn, "number")) return Fortis.error.ArgTypeWrong();
            this.fadeInData.id = Fortis.TransitionManager.add(this.sound, "volume", fadeIn, 0.0, this.volume);
            Fortis.TransitionManager.start(this.fadeInData.id);
            //console.log(this.fadeInData)
        }
        if (fadeOut != null) {
            if (!Fortis.util.checkType(fadeIn, "number")) return Fortis.error.ArgTypeWrong();
            if (fadeOut < 0 || fadeOut > this.time) return Fortis.error.ArgIncorrectVarRange();
            if (this.fadeOutData.id == null || Fortis.Timer.getTimer(this.fadeOutData.id) == false) {
                this.fadeOutData = { id: Fortis.Timer.add(this.time - fadeOut - Time, false, "fadeOut", this), time: fadeOut };
            }
            Fortis.Timer.start(this.fadeOutData.id);
        }
    }
    pause() {//中断
        this.status = true;
        this.sound.pause();
        if (this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
            Fortis.Timer.stop(this.fadeOutData.id);
        }
        if (this.fadeOutData.tId != null && Fortis.TransitionManager.get(this.fadeOutData.tId) != false) {
            Fortis.TransitionManager.stop(this.fadeOutData.tId);
        }
        if (this.fadeInData.id != null && Fortis.TransitionManager.get(this.fadeInData.id) != false) {
            Fortis.TransitionManager.stop(this.fadeInData.id);
        }
        return this.sound.currentTime;
    }
    continue(fadeIn) {//再開
        this.status = false;
        this.sound.play();
        if (fadeIn == null) {
            if (this.fadeInData.id != null && Fortis.TransitionManager.get(this.fadeInData.id) != false) {
                Fortis.TransitionManager.start(this.fadeInData.id);
            }
        } else {
            if (!Fortis.util.checkType(fadeIn, "number")) return Fortis.error.ArgTypeWrong();
            if (this.fadeInData.id != null && Fortis.TransitionManager.get(this.fadeInData.id) != false) {
                Fortis.TransitionManager.remove(this.fadeInData.id);
            }
            this.fadeInData.id = Fortis.TransitionManager.add(this.sound, "volume", fadeIn, 0.0, this.volume);
            Fortis.TransitionManager.start(this.fadeInData.id)
        }
        if (this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
            Fortis.Timer.start(this.fadeOutData.id);
        }
        if (this.fadeOutData.tId != null && Fortis.TransitionManager.get(this.fadeOutData.tId) != false) {
            Fortis.TransitionManager.stop(this.fadeOutData.tId);
        }
    }
    resetConfig() {//設定をリセット
        this.rate = sound.playbackRate = 1.0;
        this.volume = sound.volume = 1.0;
        this.loop = sound.loop = false;
    }
    fadeOut(time, identify) {//フェードアウト(timeはms、identifyはTimerから呼び出されているかfalseいないかtrue)
        //console.log(identify)
        if (this.status == false) {
            if (identify != null) {
                if (!Fortis.util.checkType(identify, "boolean")) return Fortis.error.ArgTypeWrong();
            }
            if (identify) {
                if (time == null) return Fortis.error.ArgNotExists();
                if (!Fortis.util.checkType(time, "number")) return Fortis.error.ArgTypeWrong();
                this.fadeOutData.tId = Fortis.TransitionManager.add(this.sound, "volume", time, this.volume, 0.0);
                Fortis.TransitionManager.start(this.fadeOutData.tId);
            } else {
                this.fadeOutData.tId = Fortis.TransitionManager.add(this.sound, "volume", this.fadeOutData.time, this.volume, 0.0);
                Fortis.TransitionManager.start(this.fadeOutData.tId);
            }
        }

    }
}

Fortis.NormalSound = class {
    get type() {
        return "NormalSound";
    }
    constructor(soundBuffer) {//基本的にはSimpleSoundと同じ
        if (soundBuffer == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(soundBuffer, "object")) return Fortis.error.ArgTypeWrong();
        this.buffer = soundBuffer;
        this.gain = Fortis.Game.audioCtx.createGain();
        this.rate = 1;//this.source.playbackRate.value
        this.volume = 1;//this.gain.gain.value
        this.time = soundBuffer.duration * 1000;
        this.loop = false;//this.source.loop
        this.status = true;
        this.startTime = null;
        this.nowTime = 0;
        this.fadeOutData = { id: null, time: null };
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
    play(time, fadeIn, fadeOut) {//再生(timeは再生開始時間でms、fadeInはフェードインの時間でms、fadeOutはフェードアウトの時間でms)
        if (this.status) {

        }
        let Time = 0;
        if (time != null) {
            if (!Fortis.util.checkType(time, "number")) return Fortis.error.ArgTypeWrong();
            if (time < 0 || time > this.time) return Fortis.error.ArgIncorrectVarRange();
            Time = time;
        }

        this.source = Fortis.Game.audioCtx.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gain);
        this.gain.connect(Fortis.Game.audioCtx.destination);
        this.source.playbackRate.value = this.rate;
        this.gain.gain.value = this.volume;
        this.source.loop = this.loop;
        this.source.onended = () => {
            this.status = true;
        }
        this.source.start(0, Time);
        this.status = false;
        this.startTime = performance.now() + Time;

        if (this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
            Fortis.Timer.remove(this.fadeOutData.id);
        }

        if (fadeIn != null) {
            if (!Fortis.util.checkType(fadeIn, "number")) return Fortis.error.ArgTypeWrong();
            if (fadeIn < 0 || fadeIn > this.time) return Fortis.error.ArgIncorrectVarRange();
            this.gain.gain.value = 0;
            this.gain.gain.linearRampToValueAtTime(this.volume, Fortis.Game.audioCtx.currentTime + fadeIn / 1000);
        }

        if (this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
            Fortis.Timer.remove(this.fadeOutData.id);
        }

        if (fadeOut != null) {
            if (!Fortis.util.checkType(fadeIn, "number")) return Fortis.error.ArgTypeWrong();
            if (fadeIn < 0 || fadeIn > this.time) return Fortis.error.ArgIncorrectVarRange();
            //console.log(this)
            this.fadeOutData = { id: Fortis.Timer.add(this.time - fadeOut - Time, false, "fadeOut", this), time: fadeOut };
            Fortis.Timer.start(this.fadeOutData.id);
        }
        return this.startTime;
    }
    pause() {
        if (!this.status) {
            this.source.stop();
            this.status = true;
            this.nowTime += performance.now() - this.startTime;

            if (this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
                Fortis.Timer.stop(this.fadeOutData.id);
            }

            return this.nowTime;
        }
        return false;
    }
    continue(fadeIn) {//引数はplayの二個目と同じだからそっちを見ろ
        if (this.status) {
            this.source = Fortis.Game.audioCtx.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.gain);
            this.gain.connect(Fortis.Game.audioCtx.destination);
            this.source.playbackRate.value = this.rate;
            this.gain.gain.value = this.volume;
            this.source.loop = this.loop;
            this.source.start(0, Math.max(0, this.nowTime));
            this.status = false;
            this.startTime = performance.now();
            this.source.onended = () => {
                this.status = true;
            }

            if (fadeIn != null) {
                if (!Fortis.util.checkType(fadeIn, "number")) return Fortis.error.ArgTypeWrong();
                if (fadeIn < 0 || fadeIn > this.time) return Fortis.error.ArgIncorrectVarRange();
                this.gain.gain.value = 0;
                this.gain.gain.linearRampToValueAtTime(1, Fortis.Game.audioCtx.currentTime + fadeIn);
            }

            if (this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
                Fortis.Timer.start(this.fadeOutData.id);
            }

            return this.nowTime;
        }
        return false;
    }
    fadeOut(delta) {
        this.gain.gain.value = this.volume;
        this.gain.gain.linearRampToValueAtTime(0, Fortis.Game.audioCtx.currentTime + this.fadeOutData.time / 1000);
    }
    setSound(buffer) {
        if (soundBuffer == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(soundBuffer, "object")) return Fortis.error.ArgTypeWrong();
        this.buffer = buffer;
        this.time = buffer.duration * 1000;
        return buffer;
    }
    getSound() {
        return buffer;
    }
    setVolume(value) {
        if (value == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(value, "number")) return Fortis.error.ArgTypeWrong();
        if (value < 0) return Fortis.error.ArgIncorrectVarRange();
        this.gain.gain.value = value;
        this.volume = value;
        return value;
    }
    getVolume() {
        return this.volume;
    }
    setRate(value) {
        if (value == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(value, "number")) return Fortis.error.ArgTypeWrong();
        if (!this.status) {
            this.source.playbackRate.value = value;
        }
        this.rate = value;
        return value;
    }
    getRate() {
        return this.rate;
    }
    setLoop(boolean) {
        if (boolean == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(boolean, "boolean")) return Fortis.error.ArgTypeWrong();
        if (!this.status) {
            this.source.loop = boolean;
        }
        this.loop = boolean;
        return boolean;
    }
    getLoop() {
        return this.loop;
    }
    getStatus() {
        return this.status;
    }
    getNowTime() {
        if (this.status) {
            return this.nowTime;
        } else {
            return this.nowTime + performance.now() - this.startTime;
        }
    }
    getTime() {
        return this.time;
    }
}

Fortis.ImageMaterial = class {
    get type() {
        return "ImageMaterial";
    }
    constructor(img) {
        if (img == null) {
            this.img = Fortis.ImageLoader.getImg("sample");
        } else {
            if (!Fortis.util.checkType(img, "object") || img.tagName === undefined) return Fortis.error.ArgTypeWrong();
            if (!img.tagName == "IMG") return Fortis.error.ArgTypeWrong();
            this.img = img;
        }
        this.size = new Fortis.Vector2(img.width, img.height);
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
    setImage(img) {//画像を変更
        if (img == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(img, "object") || img.tagName === undefined) return Fortis.error.ArgTypeWrong();
        this.img = img;
        return img;
    }
    getImage() {//画像を取得
        return this.img;
    }
    getSize() {//画像のサイズを取得
        return this.size;
    }
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

changeSize(){
    this.winSize.x = document.documentElement.clientWidth;
    this.winSize.y = document.documentElement.clientHeight;
    let tmpx = this.winSize.y * 16 / 9;
    if (tmpx > this.winSize.x) {
        let y = this.winSize.x * 9 / 16;
        this.size.x = document.documentElement.clientWidth*0.95;
        this.size.y = y*0.95;
    } else {
        this.size.x = tmpx*0.95;
        this.size.y = document.documentElement.clientHeight*0.95;
    }
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;

    this.draw();
}

Fortis.Game.context.translate(entity.pos.x*array.camera.scale.x*Math.cos(Fortis.util.degreeToRadian(degree+array.camera.angle)) + array.camera.pos.x, entity.pos.y*array.camera.scale.y*Math.sin(Fortis.util.degreeToRadian(degree+array.camera.angle)) + array.camera.pos.y);
Fortis.Game.context.translate(entity.pos.x*array.camera.scale.x + array.camera.pos.x, entity.pos.y*array.camera.scale.y + array.camera.pos.y);

Fortis.Game.draw = function (delta) {
    if (Fortis.Game.scene == null) return Fortis.error.SceneNotSet();//シーンが設定されているか
    camera.context.clearRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);//オフスクリーンキャンバスの初期化
    Fortis.Game.scene.layer.forEach(layer => {
        //camera.context.clearRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);//オフスクリーンキャンバスの初期化
        //Fortis.Game.canvas.width = layer.camera.displayRange.x;
        //Fortis.Game.canvas.height = layer.camera.displayRange.y;
        /*
        camera.context.save();
        camera.context.globalCompositeOperation = "source-in"
        Fortis.draw.setFillColor(camera,new Fortis.Color(0,0,0,1));
        camera.context.fillRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);//オフスクリーンキャンバスの初期化
        camera.context.restore();
        */
        repeatIdentifyingEntity(layer, false);
        camera.context.save();
        camera.context.globalCompositeOperation = "destination-in";
        camera.context.translate(layer.camera.pos.x, layer.camera.pos.y);
        camera.context.rotate(Fortis.util.degreeToRadian(layer.camera.angle));
        camera.context.scale(layer.camera.scale.x, layer.camera.scale.y);
        Fortis.draw.setFillColor(camera,new Fortis.Color(0,0,0,1));
        camera.context.fillRect(layer.camera.startPos.x,layer.camera.startPos.y,layer.camera.displayRange.x,layer.camera.displayRange.y);
        camera.context.restore();
        //layer.camera.shot();
    });

    //実際に表示されるキャンバスの処理
    Fortis.Game.finalContext.clearRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);
    Fortis.Game.finalContext.fillStyle = Fortis.Game.canvasCfg.BGColor.toHex();
    Fortis.Game.finalContext.fillRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);
    //Fortis.Game.scene.layer.forEach(layer => {
    //Fortis.Game.finalContext.drawImage(layer.camera.getData(), layer.camera.pos.x, layer.camera.pos.y, layer.camera.displayRange.x*layer.camera.scale.x, layer.camera.displayRange.y*layer.camera.scale.y);
    //});

    Fortis.Game.finalContext.drawImage(Fortis.Game.canvas.transferToImageBitmap(), 0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);

    function repeatIdentifyingEntity(array, mode) {//arrayにlayerもしくはContainer、modeにtrueかfalse(containerならtrue)
        array.entity.forEach(tmpEntity => {
            let entity = tmpEntity;
            if (entity.alpha !== undefined && entity.alpha != 0) {
                camera.context.save();
                if (mode) {
                    entity = tmpEntity["entity"];
                    camera.context.globalCompositeOperation = tmpEntity["composite"];
                } else {
                    camera.context.globalCompositeOperation = "source-over";
                }
                if (entity.type == "EntityContainer") {
                    repeatIdentifyingEntity(entity, true);
                } else {
                    camera.context.globalAlpha = entity.alpha;
                    let degree = Fortis.util.radianToDegree(Math.atan2(entity.pos.y - array.camera.centerPos.y, entity.pos.x - array.camera.centerPos.x));
                    let length = Math.sqrt(Math.pow((entity.pos.x - array.camera.centerPos.x) * array.camera.scale.x, 2) + Math.pow((entity.pos.y - array.camera.centerPos.y) * array.camera.scale.y, 2))
                    camera.context.translate(length * Math.cos(Fortis.util.degreeToRadian(degree + array.camera.angle)) + array.camera.pos.x, length * Math.sin(Fortis.util.degreeToRadian(degree + array.camera.angle)) + array.camera.pos.y);
                    camera.context.rotate(Fortis.util.degreeToRadian(entity.angle + array.camera.angle));
                    camera.context.scale(array.camera.scale.x, array.camera.scale.y);
                    switch (entity.shape.type) {
                        case "LineShape":
                            Fortis.draw.line(camera,entity);
                            break
                        case "RectShape":
                            Fortis.draw.rect(camera,entity);
                            break
                        case "CircleShape":
                            Fortis.draw.circle(camera,entity);
                            break
                        case "EllipseShape":
                            Fortis.draw.ellipse(camera,entity);
                            break
                        case "RegPolygonShape":
                            Fortis.draw.regPolygon(camera,entity);
                            break
                        case "PolygonShape":
                            Fortis.draw.polygon(camera,entity);
                            break
                        case "TextShape":
                            Fortis.draw.text(camera,entity);
                            break
                        case "ImageShape":
                            Fortis.draw.image(camera,entity);
                            break
                        case "SpriteShape":
                            Fortis.draw.image(entity, true);
                            break
                    }
                    camera.context.restore();
                }
            } else {
                entity.func(delta);
            }
        });
    }
}

Fortis.draw.line = function (camera,entity) {
    if (entity.material.stroke != false) {
        camera.context.beginPath();
        camera.context.moveTo(entity.shape.distance.x, entity.shape.distance.y);
        camera.context.lineTo(entity.shape.distance.x + entity.shape.length * entity.scale.x, 0);
        Fortis.draw.setStrokeColor(camera,entity.material.stroke);
        camera.context.lineWidth = entity.material.thick * entity.scale.x;
        camera.context.stroke();
        camera.context.closePath();
    }
}

Fortis.draw.rect = function (camera,entity) {
    let size = entity.shape.size.copy();
    size.x *= entity.scale.x;
    size.y *= entity.scale.x;
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(camera,entity.material.fill);
        camera.context.fillRect(entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(camera,entity.material.stroke);
        camera.context.lineWidth = entity.material.thick;
        camera.context.strokeRect(entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    }
}

Fortis.draw.circle = function (camera,entity) {
    camera.context.beginPath();
    camera.context.arc(entity.shape.distance.x, entity.shape.distance.y, entity.shape.radius * entity.scale.x, 0, Fortis.util.degreeToRadian(entity.shape.degree));
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(camera,entity.material.fill);
        camera.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(camera,entity.material.stroke);
        camera.context.lineWidth = entity.material.thick * entity.scale.x;
        camera.context.stroke();
    }
    camera.context.closePath();
}

Fortis.draw.ellipse = function (camera,entity) {
    camera.context.beginPath();
    camera.context.ellipse(entity.shape.distance.x, entity.shape.distance.y, entity.shape.radSize.x * entity.scale.x, entity.shape.radSize.y * entity.scale.y, 0, 0, Fortis.util.degreeToRadian(entity.shape.degree));
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(camera,entity.material.fill);
        camera.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(camera,entity.material.stroke);
        camera.context.lineWidth = entity.material.thick * entity.scale.x;
        camera.context.stroke();
    }
    camera.context.closePath();
}

Fortis.draw.regPolygon = function (camera,entity) {
    camera.context.beginPath();

    let vertices;
    if (entity.shape.vertices == false) {
        vertices = entity.shape.getPolyVertices();
    } else {
        vertices = entity.shape.vertices;
    }
    let vertice_count = 0;
    vertices.forEach(vertice => {
        if (vertice_count == 0) {
            camera.context.moveTo(entity.shape.distance.x + vertice.x * entity.scale.x, entity.shape.distance.y + vertice.y * entity.scale.y);
        } else {
            camera.context.lineTo(entity.shape.distance.x + vertice.x * entity.scale.x, entity.shape.distance.y + vertice.y * entity.scale.y);
        }
        vertice_count++;
    });
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(camera,entity.material.fill);
        camera.context.closePath();
        camera.context.fill();
    }
    if (entity.material.stroke != false) {
        camera.context.lineTo(entity.shape.distance.x + vertices[0].x * entity.scale.x, entity.shape.distance.y + vertices[0].y * entity.scale.y);
        Fortis.draw.setStrokeColor(camera,entity.material.stroke);
        camera.context.lineWidth = entity.material.thick * entity.scale.x;
        camera.context.closePath();
        camera.context.stroke();
    }
}

Fortis.draw.polygon = function (camera,entity) {
    camera.context.beginPath();

    let vertices = entity.shape.vertices
    let vertice_count = 0;
    vertices.forEach(vertice => {
        if (vertice_count == 0) {
            camera.context.moveTo(entity.shape.distance.x + vertice.x * entity.scale.x, entity.shape.distance.y + vertice.y * entity.scale.y);
        } else {
            camera.context.lineTo(entity.shape.distance.x + vertice.x * entity.scale.x, entity.shape.distance.y + vertice.y * entity.scale.y);
        }
        vertice_count++;
    });

    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(camera,entity.material.fill);
        camera.context.closePath();
        camera.context.fill();
    }
    if (entity.material.stroke != false) {
        camera.context.lineTo(entity.shape.distance.x + vertices[0].x * entity.scale.x, entity.shape.distance.y + vertices[0].y * entity.scale.y);
        Fortis.draw.setStrokeColor(camera,entity.material.stroke);
        camera.context.lineWidth = entity.material.thick * entity.scale.x;
        camera.context.closePath();
        camera.context.stroke();
    }
}

Fortis.draw.text = function (camera,entity) {
    camera.context.textAlign = "center";
    camera.context.textBaseline = "middle";
    camera.context.font = entity.shape.font.output(entity.scale.x);
    camera.context.direction = entity.shape.direction;
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(camera,entity.material.fill);
        camera.context.fillText(entity.shape.text, entity.shape.distance.x, entity.shape.distance.y);
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(camera,entity.material.stroke);
        camera.context.strokeText(entity.shape.text, entity.shape.distance.x, entity.shape.distance.y);
    }
}

Fortis.draw.image = function (entity, sprite) {
    let size = entity.shape.size.copy();
    size.x *= entity.scale.x;
    size.y *= entity.scale.x;
    if (sprite) {
        camera.context.drawImage(Fortis.ImageLoader.getImg(entity.material.key), entity.shape.clipSize.x * ((entity.shape.nowFrame - 1) % entity.shape.aspect.x), entity.shape.clipSize.y * Math.floor((entity.shape.nowFrame - 1) / entity.shape.aspect.x), entity.shape.clipSize.x, entity.shape.clipSize.y, entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    } else if (entity.shape.clipPos === undefined) {
        camera.context.drawImage(Fortis.ImageLoader.getImg(entity.material.key), entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    } else {
        camera.context.drawImage(Fortis.ImageLoader.getImg(entity.material.key), entity.shape.clipPos.x, entity.shape.clipPos.y, entity.shape.clipSize.x, entity.shape.clipSize.y, entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    }
}

Fortis.draw.setFillColor = function (camera,color) {
    if (color.type.indexOf("Gradation") == -1) {
        camera.context.fillStyle = color.toRGBA();
    } else {
        camera.context.fillStyle = color.gradation;
    }
}

Fortis.draw.setStrokeColor = function (camera,color) {
    if (color.type.indexOf("Gradation") == -1) {
        camera.context.strokeStyle = color.toRGBA();
    } else {
        camera.context.strokeStyle = color.gradation;

    }
}
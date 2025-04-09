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
        this.fadeInData = { id: null}//transitionで管理
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
        if(Fortis.Timer.getTimer(this.fadeOutData.id) != false){
            Fortis.Timer.remove(this.fadeOutData.id);
        }
        if(Fortis.TransitionManager.get(this.fadeOutData.tId) != false){
            Fortis.TransitionManager.remove(this.fadeOutData.tId);
        }
        if(Fortis.TransitionManager.get(this.fadeInData) != false){
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
        
        if(this.fadeInData.id != null && Fortis.TransitionManager.get(this.fadeInData.id) != false){
            Fortis.TransitionManager.remove(this.fadeInData.id);
        }
        if(this.fadeOutData.tId != null && Fortis.TransitionManager.get(this.fadeOutData.tId) != false){
            Fortis.TransitionManager.remove(this.fadeOutData.tId);
        }
        if(this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false){
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
        if(this.fadeOutData.tId != null && Fortis.TransitionManager.get(this.fadeOutData.tId) != false){
            Fortis.TransitionManager.stop(this.fadeOutData.tId);
        }
        if(this.fadeInData.id != null && Fortis.TransitionManager.get(this.fadeInData.id) != false){
            Fortis.TransitionManager.stop(this.fadeInData.id);
        }
        return this.sound.currentTime;
    }
    continue(fadeIn) {//再開
        this.status = false;
        this.sound.play();
        if(fadeIn == null){
            if(this.fadeInData.id != null && Fortis.TransitionManager.get(this.fadeInData.id) != false){
                Fortis.TransitionManager.start(this.fadeInData.id);
            }
        }else{
            if (!Fortis.util.checkType(fadeIn, "number")) return Fortis.error.ArgTypeWrong();
            if(this.fadeInData.id != null && Fortis.TransitionManager.get(this.fadeInData.id) != false){
                Fortis.TransitionManager.remove(this.fadeInData.id);
            }
            this.fadeInData.id = Fortis.TransitionManager.add(this.sound, "volume", fadeIn, 0.0, this.volume);
            Fortis.TransitionManager.start(this.fadeInData.id)
        }
        if (this.fadeOutData.id != null && Fortis.Timer.getTimer(this.fadeOutData.id) != false) {
            Fortis.Timer.start(this.fadeOutData.id);
        }
        if(this.fadeOutData.tId != null && Fortis.TransitionManager.get(this.fadeOutData.tId) != false){
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
            } else{
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

Fortis.ImageMaterial = class{
    get type() {
        return "ImageMaterial";
    }
    constructor(img) {
    if(img == null){
        this.img = Fortis.ImageLoader.getImg("sample");
    }else{
        if(!Fortis.util.checkType(img,"object") || img.tagName === undefined)return Fortis.error.ArgTypeWrong();
        if(!img.tagName == "IMG")return Fortis.error.ArgTypeWrong();
        this.img = img;
    }
    this.size = new Fortis.Vector2(img.width,img.height);
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
    setImage(img){//画像を変更
        if(img == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(img,"object") || img.tagName === undefined)return Fortis.error.ArgTypeWrong();
        this.img = img;
        return img;
    }
    getImage(){//画像を取得
        return this.img;    
    }
    getSize(){//画像のサイズを取得
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
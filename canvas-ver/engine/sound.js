Fortis.SoundLoader = {
    tagSounds: {},
    APISounds: {},

    loadTagSound(key) {//タグサウンドのロード(一枚ずつ)
        if (key == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (!Fortis.util.checkType(Fortis.SoundLoader.tagSounds[key], "string")) return Fortis.error.TagSoundAlreadyExists(key);
        let newSound = new Audio();
        return new Promise((resolve, reject) => {
            newSound.addEventListener("canplaythrough", completed);
            function completed(){
                newSound.removeEventListener("canplaythrough",completed);
                Fortis.SoundLoader.tagSounds[key] = newSound;
                Fortis.info.TagSoundLoaded(key);
                resolve(true);
            }
            newSound.onerror = () => {
                Fortis.error.TagSoundCouldntLoaded(key);
                reject(false);
            }
            newSound.src = Fortis.SoundLoader.tagSounds[key];
        })
    },

    loadTagSounds() {//サウンドのロード(loadSoundで一枚ずつ処理する)
        return new Promise((resolve, reject) => {
            async function promise() {
                let keys = Object.keys(Fortis.SoundLoader.tagSounds);
                try {
                    const sounds = await Promise.all(keys.map(Fortis.SoundLoader.loadTagSound));
                    return sounds;
                } catch (error) {
                    console.log(error)
                    throw error; // エラーを伝播させる場合
                }
            }
            promise()
                .then(() => {//サウンドのロードが終わった
                    resolve(true);
                })
                .catch((error) => {
                    reject(false);
                });
        })
    },

    addTagSounds(object) {//タグサウンドを追加
        if (object == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(object, "object")) return Fortis.error.ArgTypeWrong();
        for (let key in object) {
            let url = object[key];
            if (key == null || url == null) return Fortis.error.ArgNotExists();
            if (!Fortis.util.checkType(key, "string") || !Fortis.util.checkType(url, "string")) return Fortis.error.ArgTypeWrong();
            if (Fortis.SoundLoader.tagSounds[key] !== undefined) return Fortis.error.TagSoundAlreadyExists(key);
            Fortis.SoundLoader.tagSounds[key] = url;
        }
        return this.tagSounds;
    },

    getTagSound(key) {//タグサウンドの取得
        if (key == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (this.tagSounds[key] === undefined) return Fortis.error.TagSoundNotExists(key);
        return this.tagSounds[key];
    },

    deleteTagSound(key) {//タグサウンドの削除
        if (key == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (this.tagSounds[key] === undefined) return Fortis.error.TagSoundNotExists(key);
        document.head.removeChild(this.tagSounds[key])
        this.tagSounds.delete(key);
        return this.tagSounds;
    },

    getTagSoundKeys() {//タグサウンドのキーの取得
        return this.tagSounds.keys();
    },
    getTagSounds() {//全タグサウンド取得
        let tagSounds = [];
        this.tagSounds.forEach(tagSound => {
            tagSounds.push(tagSound);
        });
        return tagSound;
    }
}

Fortis.Sound = class{
    get type() {
        return "Sound";
    }
    constructor(sound){
        if(!Fortis.util.checkType(sound,"object") || sound.tagName === undefined)return Fortis.error.ArgTypeWrong();
        if(!sound.tagName == "AUDIO")return Fortis.error.ArgTypeWrong();
        this.sound = sound;
        this.rate = sound.playbackRate;//再生速度
        this.volume = sound.volume;//0.0～1.0
        this.time = sound.duration*1000;//再生時間(msに直す)
        this.loop = sound.loop;
        this.status = false;//falseで再生中、trueで停止/終了

        this.sound.onended = function(){
            this.status = false;
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
    setSound(sound){//サウンドを設定
        if(!Fortis.util.checkType(sound,"object") || sound.tagName === undefined)return Fortis.error.ArgTypeWrong();
        if(!sound.tagName == "AUDIO")return Fortis.error.ArgTypeWrong();
        this.sound = sound;
        this.rate = sound.playbackRate;
        this.volume = sound.volume;
        this.time = sound.duration*1000;
        this.loop = sound.loop;
        this.status = false;
        return this.sound;
    }
    getSound(){//サウンドを取得
        return this.sound;
    }
    setRate(value){//再生速度を設定
        if(value == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(value,"number"))return Fortis.error.ArgTypeWrong();
        this.sound.playbackRate = value;
        this.rate = value;
        return this.rate;
    }
    setVolume(value){//音量を設定
        if(value == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(value,"number"))return Fortis.error.ArgTypeWrong();
        if(value<0 || value>1)return Fortis.error.ArgIncorrectVarRange();
        this.sound.volume = value;
        this.volume = value;
        return this.volume;
    }
    setNowTime(value){//現在の時間を設定(ms)
        if(value == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(value,"number"))return Fortis.error.ArgTypeWrong();
        if(value<0 || value>this.time)return Fortis.error.ArgIncorrectVarRange();
        this.sound.currentTime = value/1000;
        return value;
    }
    setLoop(boolean){//ループするか
        if(boolean == null)return Fortis.error.ArgNotExists();
        if(!Fortis.util.checkType(boolean,"boolean"))return Fortis.error.ArgTypeWrong();
        this.sound.loop = boolean;
        this.loop = boolean;
        return this.loop;
    }
    getRate(){//再生速度を取得
        return this.rate;    
    }
    getVolume(){//音量を取得
        return this.volume;
    }
    getTime(){//再生時間を取得
        return this.time;    
    }
    getNowTime(){//現在の再生時間を取得
        return this.sound.currentTime*1000;    
    }
    getloop(){//ループするか
        return this.loop;
    }
    getStatus(){//現在の状況を取得
        return this.status;    
    }
    play(time){//再生
        let Time = 0;
        if(time != null){
            if(!Fortis.util.checkType(time,"number"))return Fortis.error.ArgTypeWrong();
            if(time<0 || time>this.time)return Fortis.error.ArgIncorrectVarRange();
            Time = time;
        }
        this.status = false;
        this.sound.currentTime = Time/1000;
        this.sound.play();
    }
    pause(){//中断
        this.status = true;
        this.sound.pause();   
        return this.sound.currentTime;
    }
    continue(){//再開
        this.status = false;
        this.sound.play();
    }
}
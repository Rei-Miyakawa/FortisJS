Fortis.SoundManager = {
    sounds: {},

    loadSound(key) {//画像のロード(一枚ずつ)
        if (key == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (!Fortis.util.checkType(Fortis.SoundManager.sounds[key], "string")) return Fortis.error.SoundAlreadyExists(key);
        let newSound = new Audio();
        return new Promise((resolve, reject) => {
            newSound.oncanplaythrough = () => {
                Fortis.SoundManager.sounds[key] = newSound;
                Fortis.info.SoundLoaded(key);
                resolve(true);
            }
            newSound.onerror = () => {
                Fortis.error.SoundCouldntLoaded(key);
                reject(false);
            }
            newSound.src = Fortis.SoundManager.sounds[key];
        })
    },

    loadSounds() {//サウンドのロード(loadSoundで一枚ずつ処理する)
        return new Promise((resolve, reject) => {
            async function promise() {
                let keys = Object.keys(Fortis.SoundManager.sounds);
                try {
                    const sounds = await Promise.all(keys.map(Fortis.SoundManager.loadSound));
                    return sounds;
                } catch (error) {
                    throw error; // エラーを伝播させる場合
                }
            }
            promise()
                .then(() => {//フォントのロードが終わった
                    resolve(true);
                })
                .catch((error) => {
                    reject(false);
                });
        })
    },

    addSounds(object) {//画像を追加
        if (object == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(object, "object")) return Fortis.error.ArgTypeWrong();
        for (let key in object) {
            let url = object[key];
            if (key == null || url == null) return Fortis.error.ArgNotExists();
            if (!Fortis.util.checkType(key, "string") || !Fortis.util.checkType(url, "string")) return Fortis.error.ArgTypeWrong();
            if (Fortis.SoundManager.sounds[key] !== undefined) return Fortis.error.SoundAlreadyExists(key);
            Fortis.SoundManager.sounds[key] = url;
        }
        return this.sounds;
    },

    getSound(key) {//画像の取得
        if (key == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (this.sounds[key] === undefined) return Fortis.error.SoundNotExists(key);
        return this.sounds[key];
    },

    deleteSound(key) {//画像の削除
        if (key == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (this.sounds[key] === undefined) return Fortis.error.SoundNotExists(key);
        document.head.removeChild(this.sounds[key])
        this.sounds.delete(key);
        return this.sounds;
    },

    getSoundKeys() {//画像のキーの取得
        return this.sounds.keys();
    },
    getSounds() {//全画像取得
        let sounds = [];
        this.sounds.forEach(sound => {
            sounds.push(sound);
        });
        return sound;
    }
}
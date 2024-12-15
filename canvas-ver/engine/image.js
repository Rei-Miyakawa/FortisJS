Fortis.ImageLoader = {
    imgs: {},

    async loadImg(key, url) {//画像のロード
        if (key == null || url == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(key, "string") || !Fortis.util.checkType(url, "string")) return Fortis.error.ArgTypeWrong();
        if (this.imgs[key] !== undefined) return Fortis.error.ImgAlreadyExists(key);
        try {
            let loadFile = new Promise((resolve, reject) => {
                let newImg = new Image();
                newImg.src = url;
                newImg.onload = () => {
                    this.imgs[key] = newImg;
                    resolve(key);
                };
                newImg.onerror = function () {
                    reject(key);
                }
            });
            await loadFile;
            Fortis.info.ImageLoaded(key);
        } catch (error) {
            return Fortis.error.ImgCouldntLoaded(error);
        }
    },

    loadImgs(array) {//画像の複数ロード。配列で中にkeyとurlがあるオブジェクトを入れる。
        if (array == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(array, "object")) return Fortis.error.ArgTypeWrong();
        array.forEach(element => {
            this.loadImg(element.key, element.url);
        });
    },

    getImg(key) {//画像の取得
        if (key == null) return Fortis.error.ArgNotExsits();
        console.log(key)
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (this.imgs[key] === undefined) return Fortis.error.ImgNotExists(key);
        return this.imgs[key];
    },

    deleteImg(key) {//画像の削除
        if (key == null) return Fortis.error.ArgNotExsits();
        if (!Fortis.util.checkType(key, "string")) return Fortis.error.ArgTypeWrong();
        if (this.imgs[key] === undefined) return Fortis.error.ImgNotExists(key);
        document.head.removeChild(this.imgs[key])
        this.imgs.delete(key);
        return this.imgs;
    },

    getImgKeys() {//画像のキーの取得
        return this.imgs.keys();
    },
    getImgs() {//全画像取得
        let imgs = [];
        this.imgs.forEach(img => {
            imgs.push(img);
        });
        return img;
    }
}
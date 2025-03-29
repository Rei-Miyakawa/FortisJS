let Fortis = {
    //変数
    Game: null,//メインのゲームシステム
    TransitionManager: null,//エンティティのモーション(フェードなど)-animation.js
    InputKey: {},//キーインプット

    //便利なやつをまとめたもの-util.js
    util: {
        //変数
        namedColors: null,//名前付き色
        //関数
        console: null,//コンソール(ゲームの設定のデバッグがtrueでないと機能しない)
        checkType: null,//変数の型やタイプなどについてチェックする
        randomID: null,//ランダムにIDを作成
        degreeToRadian: null,//度数法から弧度法
        radianToDegree: null,//弧度法から度数法
        getPointOnCircle: null,//任意の座標を中心として任意の半径の円周上の任意の角度の点の座標を取得
        argAdjustmentWithDelta: null,//deltaを使って引数の時間に処理を完了するように調整する
        //色
        hexToRGB: null,//カラーコードをRGBに
        HSVToRGB: null,//HSVをRGBに
        RGBToHex: null,//RGBをカラーコードに
        RGBToHSV: null,//RGBをHSVに
    },

    //関数
    setup: null,//ファイルの読み込みが終わったときの処理
    loadMaterials: null,//素材の読み込み(今のところ画像とフォント)
    loadfail: null,//読み込み失敗時に再読み込みする。

    error: null,//エラーをまとめたもの-util.js
    info: null,//処理完了などのお知らせをまとめたもの-util.js

    //描画系の関数-draw.js
    draw: {
        line: null,//線
        rect: null,//矩形
        circle: null,//円(弧)
        ellipse: null,//楕円
        regPolygon: null,//正多角形
        polygon: null,//多角形
        text: null,//テキスト
        image: null,//画像
        setFillColor: null,//塗りつぶしの色をセット
        setStrokeColor: null,//枠塗りの色をセット
    },

    //クラス
    Vector2: null,//二次元配列(x,y)の形-vector.js
    Timer: null,//タイマー-timer.js

    //シーン関係
    Scene: null,//シーン-scene.js
    Layer: null,//レイヤー-scene.js

    //色
    Color: null,//色-color.js
    GradationCore: null,//グラデーションのコア-color.js
    LinearGradation: null,//線形グラデーション-color.js
    RadialGradation: null,//円形グラデーション-color.js
    ConicGradation: null,//扇形グラデーション-color.js

    Entity: null,//エンティティ-entity.js

    //マテリアル
    ColorMaterial: null,//カラーマテリアル-material.js
    ImageMaterial: null,//画像マテリアル-material.js\

    //シェイプ
    LineShape: null,//線-shape.js
    RectShape: null,//矩形-shape.js
    CircleShape: null,//円(弧)-shape.js
    EllipseShape: null,//楕円-shape.js
    RegPolygonShape: null,//正多角形-shape.js
    PolygonShape: null,//多角形-shape.js
    TextShape: null,//文字-shape.js
    ImageShape: null,//画像-shape.js
    SpriteShape: null,//スプライト(画像)-shape.js

    //フォント
    FontLoader: null,//フォントの読み込み・保存-font.js
    Font: null,//フォントの管理

    //画像
    ImageLoader: null,//画像の読み込み・保存-image.js

    //サウンド-sound.js
    SoundLoader: null,//サウンドの読み込み・保存
    SimpleSound: null,//Audio要素を使ったサウンドの管理
    NormalSound: null,//Web Audio APIを使ったサウンドの管理

    //コンテナ(画像合成も可能)
    EntityContainer: null,//コンテナ-entity.js
}

Fortis.setup = function () {
    Init();//ゲーム設定を想定
    Fortis.Game.init();//ゲームシステムの初期化。素材の読み込みの設定などもここでやる
    Fortis.loadMaterials()
        .then(() => {
            document.body.removeChild(nowLoadingText);
            Ready();//ゲームが初期化された後に実行
            if (Fortis.Game.config.loop) {//ゲームループをするか
                Fortis.info.StartGameLoop();
                Fortis.Game.loop();//ゲームループスタート
            } else {
                EngineLoaded();//エンジンが読み込まれた
            }
        })
        .catch((error) => {
            console.log(error)
            Fortis.loadfail();
        })
}

Fortis.loadMaterials = async function () {
    const functionNames = [Fortis.FontLoader.loadFonts(), Fortis.ImageLoader.loadImgs(),Fortis.SoundLoader.loadSimpleSounds(),Fortis.SoundLoader.loadNormalSounds(),];
    const promiseAll = await Promise.all(functionNames);
    return promiseAll;
}

Fortis.loadfail = function () {
    alert("エラーが発生したため、ページを再読み込みしてください。");
}

Fortis.Game = {
    //変数系
    canvas: null,//オフスクリーンキャンバス(エンジン外からのアクセスの便宜上この名前とする)
    context: null,//canvasのコンテキスト(名前の理由は同上)
    audioCtx: new AudioContext(),
    finalCanvas: null,//最終的に描画されるキャンバス
    finalContext: null,//finalCanvasのコンテキスト
    size: null,//キャンバスのサイズ
    winSize: null,//ウィンドウのサイズ
    config: {//設定
        debug: false,//デバッグモード
        loop: true,//ゲームループをするか
    },
    fpsCtrl: null,//fps.js
    scene: null,//シーン
    mouse: {//マウス
        pos: null,
        movement: null,
        outsideOfCanvas: false,
        lClick: false,
        rClick: false,
        wClick: false,
        click: false,
        fFrameatClick: false,
        wheel: 0
    },

    //関数
    init() {//初期化
        //オフスクリーンキャンバス
        this.canvas = new OffscreenCanvas(100, 100);
        this.context = this.canvas.getContext("2d");

        //最終的な描画キャンバス
        this.finalCanvas = document.createElement("canvas");
        this.finalContext = this.finalCanvas.getContext("2d");
        document.body.appendChild(this.finalCanvas);

        //キャンバスのサイズ
        this.size = new Fortis.Vector2(800, 450);
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;
        this.finalCanvas.width = this.size.x;
        this.finalCanvas.height = this.size.y;

        //マウス
        this.mouse.pos = new Fortis.Vector2(0, 0);
        this.mouse.movement = new Fortis.Vector2(0,0);

        //fps
        this.fpsCtrl.init();

        Fortis.info.SystemInitCompleted();

        //マウスを押した
        Fortis.Game.finalCanvas.addEventListener("mousedown", (e) => {
            Fortis.Game.mouse.click = true;
            switch (e.button) {
                case 0://左
                    Fortis.Game.mouse.lClick = true;
                    break;
                case 1://ホイール
                    Fortis.Game.mouse.wClick = true;
                    break;
                case 2://右
                    Fortis.Game.mouse.rClick = true;
                    break
            }
            Fortis.Game.mouse.fFrameatClick = true;
        });
        //マウスを離した
        Fortis.Game.finalCanvas.addEventListener("mouseup", (e) => {
            Fortis.Game.mouse.click = false;
            switch (e.button) {
                case 0://左
                    Fortis.Game.mouse.lClick = false;
                    break;
                case 1://ホイール
                    Fortis.Game.mouse.wClick = false;
                    break;
                case 2://右
                    Fortis.Game.mouse.rClick = false;
                    break
            }
        });

        //右クリでのメニュー表示禁止
        Fortis.Game.finalCanvas.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        //マウスが動いた
        Fortis.Game.finalCanvas.addEventListener("mousemove", (e) => {
            Fortis.Game.mouse.pos.x = e.offsetX;
            Fortis.Game.mouse.pos.y = e.offsetY;
            Fortis.Game.mouse.movement.x = e.movementX;
            Fortis.Game.mouse.movement.y = e.movementY;
        });

        //ホイールが動いた
        Fortis.Game.finalCanvas.addEventListener("wheel", (e) => {
            //console.log(e)
            Fortis.Game.mouse.wheel = e.wheelDelta;
        });

        //マウスが範囲外に移動した
        Fortis.Game.finalCanvas.addEventListener("mouseout", (e) => {
            Fortis.Game.mouse.outsideOfCanvas = true;
            Fortis.Game.mouse.rClick = false;
            Fortis.Game.mouse.lClick = false;
            Fortis.Game.mouse.click = false;
            Fortis.Game.mouse.wClick = false;
        });
        //マウスが範囲外に移動した
        Fortis.Game.finalCanvas.addEventListener("mouseover", (e) => {
            Fortis.Game.mouse.outsideOfCanvas = false;
        });
    },
    setScene(scene) {//シーン設定
        if (scene == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(scene, "object", "Scene")) return Fortis.error.ArgTypeWrong();
        this.scene = scene;
        return this.scene;
    },
    getScene() {//シーン取得
        return this.scene;
    },
    getConfig() {//設定取得
        return this.config;
    },
    setConfig(object) {//設定を変更
        if (object == null) return Fortis.error.ArgNotExists();
        if (!Fortis.util.checkType(object, "object")) return Fortis.error.ArgTypeWrong();
        for (let key in object) {
            if (Fortis.Game.config[key] !== undefined) Fortis.Game.config[key] = object[key];
        }
        return this.config;
    },

    //ゲームループ
    loop() {
        let delta = this.fpsCtrl.update();
        Update(delta);//更新
        Fortis.Timer.update(delta);//タイマーの更新
        Fortis.TransitionManager.update(delta);//モーションマネージャーの更新
        this.draw();

        //マウスの変数のリセット
        this.mouse.fFrameatClick = false;
        this.mouse.wheel = 0;

        requestAnimationFrame(this.loop.bind(this));//アニメーションループ
    },

    //描画
    draw: null,
}

//キーを押した
window.addEventListener("keydown", (e) => {
    Fortis.InputKey[e.code] = true;
    console.log("down:",e.code)
});
//キーが離された
window.addEventListener("keyup", (e) => {
    Fortis.InputKey[e.code] = false;
    //console.log("up:",e.code)
});

//エラー吐いたら再読み込み
window.onerror = function () {
    Fortis.loadfail();
}

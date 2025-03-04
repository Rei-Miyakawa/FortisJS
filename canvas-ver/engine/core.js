let Fortis = {
    //変数
    Game: null,//メインのゲームシステム

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
        //色
        hexToRGB: null,//カラーコードをRGBに
        HSVToRGB: null,//HSVをRGBに
        RGBToHex: null,//RGBをカラーコードに
        RGBToHSV: null,//RGBをHSVに
    },

    //関数
    setup: null,//ファイルの読み込みが終わったときの処理
    loadMaterials: null,//素材の読み込み(今のところ画像とフォント)

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

    //コンテナ(画像合成も可能)
    EntityContainer: null,//コンテナ-entity.js
}

Fortis.setup = function () {
    Init();//ゲーム設定を想定
    Fortis.Game.init();//ゲームシステムの初期化。素材の読み込みの設定などもここでやる
    Fortis.loadMaterials()
        .then(() => {
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
            console.error("Failed to load some materials. Stopping initialization.")
        })
}

Fortis.loadMaterials = async function () {
    const functionNames = [Fortis.FontLoader.loadFonts(), Fortis.ImageLoader.loadImgs()];
    const promiseAll = await Promise.all(functionNames);
    return promiseAll;
}

Fortis.Game = {
    //変数系
    canvas: null,//オフスクリーンキャンバス(エンジン外からのアクセスの便宜上この名前とする)
    context: null,//canvasのコンテキスト(名前の理由は同上)
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

        //fps
        this.fpsCtrl.init();

        Fortis.info.SystemInitCompleted();
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
        this.draw();
        requestAnimationFrame(this.loop.bind(this));//アニメーションループ
    },

    //描画
    draw: null,
}
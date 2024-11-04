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
    },

    //関数
    setup: null,//ファイルの読み込みが終わったときの処理
    
    error: null,//エラーをまとめたもの-util.js
    info: null,//処理完了などのお知らせをまとめたもの-util.js

    //クラス
    Vector2: null,//二次元配列(x,y)の形-vector.js
    Scene: null,//シーン-scene.js
    ColorBG: null,//色のみ-bg.js
    //ImageBG: null,//画像-bg.js
    Color: null,//色-color.js
    //Gradation: null,//グラデーション-color.js
}

Fortis.setup = function () {
    Init();//ゲーム設定を想定
    Fortis.Game.init();//ゲームシステムの初期化
    Ready();//ゲームが初期化された後に実行。素材の読み込みなどを想定
    if (Fortis.Game.scene == null) {
        Fortis.error.SceneNotSet();
    } else {
        Fortis.info.StartGameLoop();
        Fortis.Game.loop();//ゲームループスタート
    }
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
        KeepCanvasAspect: false,//キャンバスのアスペクト比のキープ
    },
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

        Fortis.info.SystemInitCompleted();
    },

    //ゲームループ
    loop() {
        Update();//更新
        this.draw();
        requestAnimationFrame(this.loop.bind(this));//アニメーションループ
    },
    
    //描画
    draw: null,
}
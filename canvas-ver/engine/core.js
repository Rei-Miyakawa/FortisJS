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

    error: null,//エラーをまとめたもの-util.js
    info: null,//処理完了などのお知らせをまとめたもの-util.js

    //描画系の関数
    draw: {
        line: null,//線
        rect: null,//矩形
        circle: null,//円(弧)
        ellipse: null,//楕円
        regPolygon: null,//正多角形
        polygon: null,//多角形
    },

    //クラス
    Vector2: null,//二次元配列(x,y)の形-vector.js

    //シーン関係
    Scene: null,//シーン-scene.js
    Layer: null,//レイヤー-scene.js

    //色
    Color: null,//色-color.js
    //Gradation: null,//グラデーション-color.js

    Entity: null,//エンティティ-entity.js

    //マテリアル
    ColorMaterial: null,//カラーマテリアル-material.js

    //シェイプ
    LineShape: null,//線-shape.js
    RectShape: null,//矩形-shape.js
    CircleShape: null,//円(弧)-shape.js
    EllipseShape: null,//楕円-shape.js
    RegPolygonShape: null,//正多角形-shape.js
    PolygonShape: null,//多角形-shape.js
}

Fortis.setup = function () {
    Init();//ゲーム設定を想定
    Fortis.Game.init();//ゲームシステムの初期化
    Ready();//ゲームが初期化された後に実行。素材の読み込みなどを想定
    if (Fortis.Game.config.loop) {//ゲームループをするか
        Fortis.info.StartGameLoop();
        Fortis.Game.loop();//ゲームループスタート
    } else {
        EngineLoaded();//エンジンが読み込まれた
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
        loop: true,//ゲームループをするか
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
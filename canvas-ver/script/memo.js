/*
方針(予定)
Colliderにそれぞれ頂点、直線・曲線の式を取得する関数を用意する
どのように当たり判定を計算するか(別に、どのグループ同士の当たり判定を計算するかを管理する変数を作るか、グループ毎に、別のグループのIDを入力したら計算してくれるようにするかなど)
現在は前者が有力

次

楕円や矩形に関する当たり判定

それぞれの考え肩

線と線:Fortis.util.getLinesIntersection ✓
線と矩形:線と線に分解して求める ✓
線と円(楕円):式と曲線のやつ ✓
線とその他:線と線に分解して求める ✓

矩形と矩形:ともに角度kπ/2(kは整数)の時は幅から求める。そうでない時は線と線に分解して求める✓
矩形と円(楕円):線に分解して線と円 ✓
矩形とその他:その他を線分に分解して、線と線に分解して求める ✓

円と円(楕円):図形と方程式と式と曲線でいけるはず　楕円が絡むとできない
https://qiita.com/NaokiHori/items/daf3fd191d51a7e682f8
これでやる

楕円と円の当たり判定について、楕円を媒介変数表示を用いて正多角形に近似して、円とその他図形として処理する

当たり判定の確認
楕円同士について、片方を多角形で近似させた。最後に楕円と線分の当たり判定に持ってくところでなんかおかしい

未確認：楕円同士、円同士
*/

let c1cVertices = c1c.getVertices(c1.pos, c1.angle, c1.scale);
let c1cLines = [];
if (c1cVertices.length == 2) {
    c1cLines.push(Fortis.util.getLineSegment(c1cVertices[0], c1cVertices[1]));
} else {
    let length = c1cVertices.length;
    for (let i = 1; i <= length; i++) {
        if (i == length) {
            c1cLines.push(Fortis.util.getLineSegment(c1cVertices[0], c1cVertices[i]));
        } else {
            c1cLines.push(Fortis.util.getLineSegment(c1cVertices[i - 1], c1cVertices[i]));
        }
    }
}

let cFDomain = [-c["radius"].x, c["radius"].x];//楕円の定義域
    let cVDomain = [-c["radius"].y, c["radius"].y];//楕円の値域
    let xJudge = ((cVDomain[0] <= rotatedL["vDomain"][0] && rotatedL["vDomain"][0] <= cVDomain[1]) || (cVDomain[0] <= rotatedL["vDomain"][1] && rotatedL["vDomain"][1] <= cVDomain[1]));
    let yJudge = ((cFDomain[0] <= rotatedL["fDomain"][0] && rotatedL["fDomain"][0] <= cFDomain[1]) || (cFDomain[0] <= rotatedL["fDomain"][1] && rotatedL["fDomain"][1] <= cFDomain[1]));
    if (rotatedL["special"]["x"] != null) {//線分がx=aの形
        if (cFDomain[0] <= rotatedL["special"]["x"] && rotatedL["special"]["x"] <= cFDomain[1] && xJudge) return true;
    } else if (rotatedL["special"]["y"] != null) {//線分がy=aの形
        if (cVDomain[0] <= rotatedL["special"]["y"] && rotatedL["special"]["y"] <= cVDomain[1] && yJudge) return true;
    } else {
        if (xJudge && yJudge) {
            /*
            let bd2 = Math.pow(c["radius"].x,4)*Math.pow(rotatedL["slope"]*rotatedL["intercept"],2);
            let ac = Math.pow(c["radius"].x,2)*(Math.pow(c["radius"].y,2)+Math.pow(c["radius"]*rotatedL["slope"],2))*(Math.pow(rotatedL["intercept"],2)-Math.pow(rotatedL["slope"],2));
            */
            let qe = Fortis.util.cleanFloat(Math.pow(c["radius"].x,4)*Math.pow(rotatedL["slope"]*rotatedL["intercept"],2)-Math.pow(c["radius"].x,2)*(Math.pow(c["radius"].y,2)+Math.pow(c["radius"]*rotatedL["slope"],2))*(Math.pow(rotatedL["intercept"],2)-Math.pow(rotatedL["slope"],2)),7);
            return qe >= 0;
        }
    }


    let bgc = new Fortis.Color("black");
    bg = new Fortis.Entity(new Fortis.RectShape(10000, 10000), new Fortis.ColorMaterial(bgc));
    bgl = scene.getBG();
    //bgl.add(bg);

    sound2 = new Fortis.NormalSound("dededon");
    sound2.volume = 0.5;


    let audio = Fortis.SoundLoader.getSimpleSound("dededon");
    Sound = new Fortis.SimpleSound("dededon");
    //Sound.setLoop(true);
    Sound.setVolume(0.2);
    //Sound.play();
    //console.log(Sound)

    color = new Fortis.Color("blue");
    color2 = new Fortis.Color("red");
    Fortis.Game.scene = scene;
    material = new Fortis.ColorMaterial(null, color);
    //material.setThick(10);
    mateiral2 = new Fortis.ColorMaterial(color2);
    layer = new Fortis.Layer();

    tf = new Fortis.Font("test");
    e2 = new Fortis.Entity(new Fortis.RegPolygonShape(null,50), material);
    e2.pos = new Fortis.Vector2(150, 150)
    layer.add(e2);
    e1 = new Fortis.Entity(new Fortis.RectShape(), mateiral2);
    e1.pos = new Fortis.Vector2(200, 200);

    /*
    container = new Fortis.EntityContainer();
    container.add(e1);
    container.add(e2, "source-in");
    */
    //layer.add(e2);
    //layer.add(e1);


    ssi = Fortis.ImageLoader.getImg("ss");
    sss = new Fortis.SpriteShape("ss", new Fortis.Vector2(8, 4), 32);

    ssm = new Fortis.ImageMaterial("ss");
    //console.log(sss)
    sse = new Fortis.Entity(sss, ssm);
    sse.pos = new Fortis.Vector2(0, 0);
    sss.setRepeat(500, null, [1, 5]);
    sss.start();
    layer.add(sse);


    t1 = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("RocknRoll One", 30), "スタサポ模試の登録しろ！！！"), material);
    t1.pos = new Fortis.Vector2(150, 150);
    t1.shape.font.setStyle("italic");
    let hoge = Fortis.ImageLoader.getImg("sample");
    //console.log(hoge)
    i1 = new Fortis.ImageMaterial("sample");
    is = new Fortis.Entity(new Fortis.ImageShape("sample"), i1);
    is.pos = new Fortis.Vector2(200,200)
    is.alpha = 0.5
    i1.globalAlpha = 0.5
    t1.shape.distance = new Fortis.Vector2(100, 100);
    //is.pos = new Fortis.Vector2(300, 300);
    //bgl.add(t1)
    //layer.add(t1);
    //layer.add(is);

    uil = scene.getUI();
    let fullbg = new Fortis.Entity(new Fortis.RectShape(10000,10000),new Fortis.ColorMaterial(new Fortis.Color("yellow")))
    uil.add(fullbg)
    //uil.camera.scale = new Fortis.Vector2(0.5,0.5);
    //uil.camera.size = new Fortis.Vector2(400,225)
    //uil.camera.pos = new Fortis.Vector2(100,100);
    //uil.camera.centerPos = new Fortis.Vector2(45,45);
    //uil.camera.startPos = new Fortis.Vector2(100,100)
    //uil.camera.setDisplayRange(new Fortis.Vector2(160,90))
    for (let i = 0; i < 3; i++) {
        let rect = (new Fortis.Entity(new Fortis.RectShape(),new Fortis.ColorMaterial(new Fortis.Color("green"))))
        rect.pos = new Fortis.Vector2(0,0);
        rects.push(rect);
        uil.add(rect)
        //let nl = new Fortis.Layer();
        //nl.add(rect);
        //scene.add(nl)
    }
    
    let vec = new Fortis.Vector2(150,150);
    rects[1].pos = vec;
    vec2 = new Fortis.Vector2(45,45);
    rects[2].pos = vec2;

    scene.add(layer);
    let ttimer = Fortis.Timer.add(100,true,Test);
    //console.log(ttimer)
    Fortis.Timer.start(ttimer);
    //sse.shape.backFrame();

    /*
    let tmpf = new Fortis.CRFunction(Test);
    layer.add(tmpf);
    */

    mousePos = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font(null, 30), "こんにちは"), new Fortis.ColorMaterial(new Fortis.Color("red")));
    mousePos.pos = new Fortis.Vector2(200,200);
    layer.add(mousePos)

    //uil.camera.startPos = Fortis.Game.mouse.pos.copy().add(new Fortis.Vector2(-600,-450));
    //mousePos.shape.text = "x:"+Fortis.Game.mouse.pos.x+",y:"+Fortis.Game.mouse.pos.y
    //uil.camera.angle += 1
    //t1.angle++;
    //console.log(sse.shape.nowFrame)
    //console.log(sound2.gain.gain.value)
    if (Fortis.Game.mouse.fFrameatClick) {
        if (tkey !== undefined && Fortis.TransitionManager.get(tkey) != false) {
            //Sound.play(0,1000,3000);
            Fortis.TransitionManager.remove(tkey);
        } else {
            tkey = Fortis.TransitionManager.add(sse, "pos", 2000, new Fortis.Vector2(0, 0), new Fortis.Vector2(300, 300), Fortis.util.easing.outInSpring)
            //tkey = Fortis.TransitionManager.add(sse,"angle",2000,0,360,Fortis.util.easing.inTrig)
            Fortis.TransitionManager.start(tkey);

            //Sound.pause(1000);
        }
    }
    //console.log(Fortis.Game.mouse.wheel)
    //console.log(sse.scale)
    //t1.angle++;
    //e1.move(new Fortis.Vector2(1,1));
    //console.log(e1.material.fill.pos)
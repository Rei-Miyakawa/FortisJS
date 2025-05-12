let scene;
let layer;

function Init() {
    Fortis.Game.config.debug = true;
    //Fortis.Game.canvasCfg.keepAspect = false;
    Fortis.FontLoader.addFonts({
        "test": 'https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap',
    });
    Fortis.ImageLoader.addImages({
        "sample": "./sample.jpg",
        "ss": "./spritesheet.png",
    });

    Fortis.SoundLoader.addSimpleSounds({
        "dededon": "./get.mp3",
        "star": "./maou_14_shining_star.mp3",
    });

    Fortis.SoundLoader.addNormalSounds({
        //"star":"./maou_14_shining_star.mp3",
        "dededon": "./get.mp3",
    })
}

let col2, colR;
let col1, colL;

let testL;
let testR;

let testls;
let testRVs = [];
let result
function Ready() {
    col2 = new Fortis.ColliderGroup();
    col1 = new Fortis.ColliderGroup();
    //colR = new Fortis.RectCollider(50);
    //colR = new Fortis.RegPolygonCollider(null, 6);
    //colR = new Fortis.LineCollider();
    //colL = new Fortis.LineCollider();
    //colR = new Fortis.CircleCollider(20,20);
    colR = new Fortis.CircleCollider();
    //colL = new Fortis.RectCollider();
    colL = new Fortis.CircleCollider();
    //colL = new Fortis.RegPolygonCollider(null, 6);

    col2.addList([colR]);
    col1.addList([colL]);

    layer = new Fortis.Layer();


    //testL = new Fortis.Entity(new Fortis.LineShape(), new Fortis.ColorMaterial(null, new Fortis.Color("blue")));
    //testL = new Fortis.Entity(new Fortis.RectShape(),new Fortis.ColorMaterial(new Fortis.Color("blue")));
    testL = new Fortis.Entity(new Fortis.EllipseShape(), new Fortis.ColorMaterial(new Fortis.Color("red")));
    layer.add(testL);
    col1.link(testL)

    //let testRd = new Fortis.Entity(new Fortis.EllipseShape(), new Fortis.ColorMaterial(new Fortis.Color("green")));
    testR = new Fortis.Entity(new Fortis.EllipseShape(), new Fortis.ColorMaterial(new Fortis.Color("green")));
    //testR = new Fortis.Entity(new Fortis.RegPolygonShape(null,null,6), new Fortis.ColorMaterial(new Fortis.Color("blue")));
    //testR = new Fortis.Entity(new Fortis.RectShape(50),new Fortis.ColorMaterial(new Fortis.Color("blue")));
    //testR = new Fortis.Entity(new Fortis.RegPolygonShape(null,null,6),new Fortis.ColorMaterial(new Fortis.Color("blue")));
    //testR = new Fortis.Entity(new Fortis.LineShape(),new Fortis.ColorMaterial(null,new Fortis.Color("blue")));
    layer.add(testR);
    col2.link(testR);
    testR.pos = new Fortis.Vector2(100, 100);
    //layer.add(testRd);
    //testRd.alpha = 0.5
    //testRd.pos = new Fortis.Vector2(100, 100);

    scene = new Fortis.Scene();
    scene.add(layer);
    Fortis.Game.setScene(scene);

    testls = new Fortis.Entity(new Fortis.CircleShape(3), new Fortis.ColorMaterial(new Fortis.Color("red")));
    testls.alpha = 0.5;
    layer.add(testls)

    for (let i = 0; i < 36; i++) {
        let rv = new Fortis.Entity(new Fortis.CircleShape(3), new Fortis.ColorMaterial(new Fortis.Color("purple")));
        rv.alpha = 0.5;
        testRVs.push(rv)
        layer.add(rv)
    }

    mousePos = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font(null, 30), "こんにちは"), new Fortis.ColorMaterial(new Fortis.Color("red")));
    mousePos.pos = new Fortis.Vector2(200, 200);
    layer.add(mousePos)
    //colL.distance = new Fortis.Vector2(10,10);
    //testL.shape.distance = colL.distance
    result = Fortis.CollisionManager.add(col1, col2);
}

function Update(delta) {
    mousePos.shape.text = "x:" + Fortis.Game.mouse.pos.x + ",y:" + Fortis.Game.mouse.pos.y

    col1.update();
    col2.update();

    //console.log(colL.getVertices());
    //let v = colL.getVertices(col1.pos, col1.angle, col1.scale);
    //let aaa = colR.getVertices(col2.pos, col2.angle, col2.scale)
    //let rv = colR.getVertices(col2.pos,col2.angle,col2.scale);
    //console.log(col2.scale)
    //console.log(v[0])

    //testls.pos = v[0];
    //testRVs[0].pos = aaa.pos
    for (let i = 0; i < 4; i++) {
        //testRVs[i].pos = rv[i] 
    }
    //console.log(Fortis.CollisionManager.get(result))
    if (Fortis.CollisionManager.get(result)["result"]) {
        mousePos.material.fill = new Fortis.Color("blue");
    } else {
        mousePos.material.fill = new Fortis.Color("red");
    }
    /*
    if(Fortis.util.checkPolygonsCollide(v,rv)){
        mousePos.material.fill = new Fortis.Color("blue");
    }else{
        mousePos.material.fill = new Fortis.Color("red");
    }*/
    /*
if(Fortis.util.checkLinesCollide(Fortis.util.getLineSegment(v[0],v[1]),Fortis.util.getLineSegment(rv[0],rv[1]))){
    mousePos.material.fill = new Fortis.Color("blue");
}else{
    mousePos.material.fill = new Fortis.Color("red");
}*/

    //console.log(col1.pos)
    testL.pos = Fortis.Game.mouse.pos;
    //testL.pos = new Fortis.Vector2(75,75)
    //testL.angle = 30;
    testL.angle++;
    //testRVs[0].pos = testL.pos;
    //testRVs[1].pos = testR.pos;
}

function EngineLoaded() { }

function Test(delta) {
    /*
    for(let i = 1; i<7; i++){
        rects[i].pos = new Fortis.Vector2(Math.random()*500,Math.random()*200);
    }
    */
    //console.log(delta)
    //sse.shape.stop();
    //sse.shape.backFrame();
    //console.log("konnitiha");
}
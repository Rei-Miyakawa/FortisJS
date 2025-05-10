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

let colg, colR;
let colG, colL;

let testL;
let testR;

let testls;
let testRVs = [];
let result
function Ready() {
    colg = new Fortis.ColliderGroup();
    colG = new Fortis.ColliderGroup();
    //colR = new Fortis.RectCollider(50);
    colR = new Fortis.RegPolygonCollider(null, 6);
    //colR = new Fortis.LineCollider();
    //colL = new Fortis.LineCollider();
    //colR = new Fortis.CircleCollider(20,20);
    //colR = new Fortis.CircleCollider();
    colL = new Fortis.RectCollider();
    //colL = new Fortis.RegPolygonCollider(null, 6);

    colg.addList([colR]);
    colG.addList([colL]);

    layer = new Fortis.Layer();


    //testL = new Fortis.Entity(new Fortis.LineShape(), new Fortis.ColorMaterial(null, new Fortis.Color("blue")));
    testL = new Fortis.Entity(new Fortis.RectShape(),new Fortis.ColorMaterial(new Fortis.Color("blue")));
    layer.add(testL);
    colG.link(testL)

    //let testRd = new Fortis.Entity(new Fortis.EllipseShape(), new Fortis.ColorMaterial(new Fortis.Color("green")));
    //testR = new Fortis.Entity(new Fortis.EllipseShape(), new Fortis.ColorMaterial(new Fortis.Color("blue")));
    testR = new Fortis.Entity(new Fortis.RegPolygonShape(null,null,6), new Fortis.ColorMaterial(new Fortis.Color("blue")));
    //testR = new Fortis.Entity(new Fortis.RectShape(50),new Fortis.ColorMaterial(new Fortis.Color("blue")));
    //testR = new Fortis.Entity(new Fortis.RegPolygonShape(null,null,6),new Fortis.ColorMaterial(new Fortis.Color("blue")));
    //testR = new Fortis.Entity(new Fortis.LineShape(),new Fortis.ColorMaterial(null,new Fortis.Color("blue")));
    layer.add(testR);
    colg.link(testR);
    testR.pos = new Fortis.Vector2(100, 100);
    //layer.add(testRd);
    //testRd.alpha = 0.5
    //testRd.pos = new Fortis.Vector2(100, 100);

    scene = new Fortis.Scene();
    scene.add(layer);
    Fortis.Game.setScene(scene);

    testls = new Fortis.Entity(new Fortis.CircleShape(3), new Fortis.ColorMaterial(new Fortis.Color("green")));
    testls.alpha = 0.5;
    layer.add(testls)

    for (let i = 0; i < 4; i++) {
        let rv = new Fortis.Entity(new Fortis.CircleShape(3), new Fortis.ColorMaterial(new Fortis.Color("green")));
        rv.alpha = 0.5;
        testRVs.push(rv)
        layer.add(rv)
    }

    mousePos = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font(null, 30), "こんにちは"), new Fortis.ColorMaterial(new Fortis.Color("red")));
    mousePos.pos = new Fortis.Vector2(200, 200);
    layer.add(mousePos)
    //colL.distance = new Fortis.Vector2(10,10);
    //testL.shape.distance = colL.distance
    result = Fortis.CollisionManager.add(colG, colg);
}


function Update(delta) {
    mousePos.shape.text = "x:" + Fortis.Game.mouse.pos.x + ",y:" + Fortis.Game.mouse.pos.y

    colG.update();
    colg.update();

    //console.log(colL.getVertices());
    let v = colL.getVertices(colG.pos, colG.angle, colG.scale);
    let aaa = colR.getVertices(colg.pos, colg.angle, colg.scale)
    //let rv = colR.getVertices(colg.pos,colg.angle,colg.scale);
    //console.log(colg.scale)
    //console.log(v[0])

    testls.pos = v[0];
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

    //console.log(colG.pos)
    testL.pos = Fortis.Game.mouse.pos;
    //testR.angle+=0.2;
    testR.angle++;
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
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

let colg,colR;
let colG,colL;

let testL;
let testR;

let testls;
let testRVs = []
function Ready() {
    colg = new Fortis.ColliderGroup();
    colG = new Fortis.ColliderGroup();
    //colR = new Fortis.RectCollider();
    //colR = new Fortis.RegPolygonCollider(null, 6);
    colR = new Fortis.LineCollider();
    colL = new Fortis.LineCollider();
    
    colg.addList([colR]);
    colG.addList([colL]);

    layer = new Fortis.Layer();
    

    testL = new Fortis.Entity(new Fortis.LineShape(),new Fortis.ColorMaterial(null,new Fortis.Color("blue")));
    layer.add(testL);
    colG.link(testL)

    //testR = new Fortis.Entity(new Fortis.RectShape(),new Fortis.ColorMaterial(new Fortis.Color("blue")));
    //testR = new Fortis.Entity(new Fortis.RegPolygonShape(null,null,6),new Fortis.ColorMaterial(new Fortis.Color("blue")));
    testR = new Fortis.Entity(new Fortis.LineShape(),new Fortis.ColorMaterial(null,new Fortis.Color("blue")));
    layer.add(testR);
    colg.link(testR);
    testR.pos = new Fortis.Vector2(100,100);

    scene = new Fortis.Scene();
    scene.add(layer);
    Fortis.Game.setScene(scene);

    testls = new Fortis.Entity(new Fortis.CircleShape(3),new Fortis.ColorMaterial(new Fortis.Color("green")));
    testls.alpha = 0.5;
    layer.add(testls)

    for(let i = 0; i<2; i++){
        let rv = new Fortis.Entity(new Fortis.CircleShape(3),new Fortis.ColorMaterial(new Fortis.Color("green")));
        rv.alpha = 0.5;
        testRVs.push(rv)
    layer.add(rv)
    }

    mousePos = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font(null, 30), "こんにちは"), new Fortis.ColorMaterial(new Fortis.Color("red")));
    mousePos.pos = new Fortis.Vector2(200,200);
    layer.add(mousePos)
    //colL.distance = new Fortis.Vector2(10,10);
    //testL.shape.distance = colL.distance
}


function Update(delta) {
    mousePos.shape.text = "x:"+Fortis.Game.mouse.pos.x+",y:"+Fortis.Game.mouse.pos.y

    colG.update();
    colg.update();

    //console.log(colL.getVertices());
    let v = colL.getVertices(colG.pos,colG.angle,colG.scale);
    let rv = colR.getVertices(colg.pos,colg.angle,colg.scale);
    //console.log(colg.scale)
    //console.log(v[0])
    
    testls.pos = v[0];
    for(let i = 0; i<2; i++){
        testRVs[i].pos = rv[i] 
    }
    /*
    if(Fortis.util.checkPolygonsCollide(v,rv)){
        mousePos.material.fill = new Fortis.Color("blue");
    }else{
        mousePos.material.fill = new Fortis.Color("red");
    }
        */
    if(Fortis.util.checkLinesCollide(Fortis.util.getLineSegment(v[0],v[1]),Fortis.util.getLineSegment(rv[0],rv[1]))){
        mousePos.material.fill = new Fortis.Color("blue");
    }else{
        mousePos.material.fill = new Fortis.Color("red");
    }
        
    //console.log(colG.pos)
testL.pos = Fortis.Game.mouse.pos;
testR.angle++;
//testL.angle-=2;
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
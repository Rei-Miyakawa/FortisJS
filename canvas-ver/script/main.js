let scene, bg, color, color2, material, mateiral2;
let e1, e2, t1, i1, is, tf;
let container;
let layer;
let ssi, sss, ssm, sse;
let bgl;

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

let Sound, sound2;
let rects = [];
let uil;
let mousePos
let colg,col
function Ready() {
    colg = new Fortis.ColliderGroup();
    col = new Fortis.LineCollider();
    colg.addList([col]);
    scene = new Fortis.Scene();
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
    uil.camera.size = new Fortis.Vector2(400,225)
    uil.camera.pos = new Fortis.Vector2(100,100);
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
}

let tkey;
function Update(delta) {
    mousePos.shape.text = "x:"+Fortis.Game.mouse.pos.x+",y:"+Fortis.Game.mouse.pos.y
    //uil.camera.angle += 1
    t1.angle++;
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
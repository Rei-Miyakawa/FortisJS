let scene, bg, color, color2, material, mateiral2;
let e1, e2, t1,i1,is, tf;
let container;
let layer;
let ssi,sss,ssm,sse;

function Init() {
    Fortis.Game.config.debug = true;
    //Fortis.Game.config.loop = false;
    Fortis.FontLoader.addFonts({
        "test": 'https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap',
    });
    Fortis.ImageLoader.addImages({
        "sample":"./sample.jpg",
        "ss":"./spritesheet.png",
    });
    
    Fortis.SoundLoader.addSimpleSounds({
        "dededon":"./get.mp3",
    });
    
    Fortis.SoundLoader.addNormalSounds({
        "star":"./maou_14_shining_star.mp3",
    })
}

let Sound;
function Ready() {
    

    let audio = Fortis.SoundLoader.getSimpleSound("dededon");
    Sound = new Fortis.SimpleSound(audio);
    //Sound.setLoop(true);
    Sound.setVolume(0.2);
    //Sound.play();
    console.log(Sound)
    scene = new Fortis.Scene();
    color = new Fortis.Color("blue");
    color2 = new Fortis.Color("red");
    scene.bg = bg;
    Fortis.Game.scene = scene;
    material = new Fortis.ColorMaterial(null,color);
    material.setThick(10);
    mateiral2 = new Fortis.ColorMaterial(color2);
    layer = new Fortis.Layer();
    
    tf = new Fortis.Font("test");
    e2 = new Fortis.Entity(new Fortis.LineShape(50), material);
    e2.pos = new Fortis.Vector2(150, 150)
    e1 = new Fortis.Entity(new Fortis.RectShape(), mateiral2);
    e1.pos = new Fortis.Vector2(200, 200);
    
    /*
    container = new Fortis.EntityContainer();
    container.add(e1);
    container.add(e2, "source-in");
    */
    layer.add(e2);
    //layer.add(e1);
    
    ssi = Fortis.ImageLoader.getImg("ss");
    sss = new Fortis.SpriteShape(ssi,new Fortis.Vector2(8,4),32);
    
    ssm = new Fortis.ImageMaterial(ssi);
    console.log(sss)
    sse = new Fortis.Entity(sss,ssm);
    sse.pos = new Fortis.Vector2(150, 150);
    sss.setRepeat(500);
    sss.start();
    layer.add(sse);

    t1 = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("RocknRoll One", 30), "こんにちは"), material);
    t1.pos = new Fortis.Vector2(300, 300);
    t1.shape.font.setStyle("italic");
    let hoge = Fortis.ImageLoader.getImg("sample");
    console.log(hoge)
    i1 = new Fortis.ImageMaterial(hoge);
    is = new Fortis.Entity(new Fortis.ImageShape(hoge),i1);
    i1.globalAlpha = 0.5
    //is.pos = new Fortis.Vector2(300, 300);
    layer.add(t1);
    layer.add(is);
    scene.add(layer);
    let ttimer = Fortis.Timer.add(5000,false,Test);
    //console.log(ttimer)
    Fortis.Timer.start(ttimer);
    //sse.shape.backFrame();
}

function Update(delta) {
    if(Fortis.Game.mouse.fFrameatClick){
        if(Sound.status){
            //Sound.play();
        }else{
            Sound.pause();
        }
    }
    //console.log(Fortis.Game.mouse.wheel)
    //console.log(sse.scale)
    //t1.angle++;
    //e1.move(new Fortis.Vector2(1,1));
    //console.log(e1.material.fill.pos)
}

function EngineLoaded() { }

function Test(delta){
    //sse.shape.stop();
    //sse.shape.backFrame();
    //console.log("konnitiha");
}
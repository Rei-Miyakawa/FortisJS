let scene, bg, color, color2, material, mateiral2;
let e1, e2, t1,i1,is;
let container;
let layer;

function Init() {
    Fortis.Game.config.debug = true;
    //Fortis.Game.config.loop = false;
    Fortis.FontLoader.addFonts({
        "test": 'https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap',
    });
    Fortis.ImageLoader.addImages({
        "sample":"./sample.jpg",
    });
}

function Ready() {
    scene = new Fortis.Scene();
    color = new Fortis.Color("blue");
    color2 = new Fortis.Color("red");
    scene.bg = bg;
    Fortis.Game.scene = scene;
    material = new Fortis.ColorMaterial(color);
    mateiral2 = new Fortis.ColorMaterial(color2);
    layer = new Fortis.Layer();
    /*
    e2 = new Fortis.Entity(new Fortis.CircleShape(200), material);
    e2.pos = new Fortis.Vector2(150, 150)
    e1 = new Fortis.Entity(new Fortis.RectShape(300, 300), mateiral2);
    e1.pos = new Fortis.Vector2(200, 200);
    
    container = new Fortis.EntityContainer();
    container.add(e1);
    container.add(e2, "source-in");
    e1.shape.setDegree(180);
    console.log(e1)
    layer.add(container);
    */
    t1 = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("RocknRoll One", 30), "こんにちは"), material);
    t1.pos = new Fortis.Vector2(300, 300);
    t1.shape.font.setStyle("italic");
    let hoge = Fortis.ImageLoader.getImg("sample");
    console.log(hoge)
    i1 = new Fortis.ImageMaterial(hoge);
    is = new Fortis.Entity(new Fortis.ImageShape(hoge),i1);
    i1.globalAlpha = 0.5
    is.pos = new Fortis.Vector2(300, 300);
    layer.add(t1);
    layer.add(is);
    scene.add(layer);
}

function Update() {
    //t1.angle++;
    //e1.move(new Fortis.Vector2(1,1));
    //console.log(e1.material.fill.pos)
}

function EngineLoaded() { }
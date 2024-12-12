let scene, bg, color, color2, material, mateiral2;
let e1, e2;
let container;
let layer;

function Init() {
    Fortis.Game.config.debug = true;
    //Fortis.Game.config.loop = false;
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
    e2 = new Fortis.Entity(new Fortis.CircleShape(200),material);
    e2.pos = new Fortis.Vector2(150,150)
    e1 = new Fortis.Entity(new Fortis.RectShape(300, 300), mateiral2);
    e1.pos = new Fortis.Vector2(200, 200);
    container = new Fortis.EntityContainer();
    container.add(e1);
    container.add(e2,"source-in");
    //e1.shape.setDegree(180);
    //console.log(e1)
    layer.add(container);
    scene.add(layer);
}

function Update() {
    //e1.move(new Fortis.Vector2(1,1));
    //console.log(e1.material.fill.pos)
}

function EngineLoaded() { }
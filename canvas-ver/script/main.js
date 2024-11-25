let scene, bg, color, color2, material;
let e1;
let layer;

function Init() {
    Fortis.Game.config.debug = true;
    //Fortis.Game.config.loop = false;
}

function Ready() {
    scene = new Fortis.Scene();
    color = new Fortis.Color("orange");
    color2 = new Fortis.Color("red");
    scene.bg = bg;
    Fortis.Game.scene = scene;
    material = new Fortis.ColorMaterial(color, color2);
    layer = new Fortis.Layer();

    let vertices = [
        new Fortis.Vector2(50,50),
        new Fortis.Vector2(40,-50),
        new Fortis.Vector2(-40,-40)
    ]

    e1 = new Fortis.Entity(new Fortis.RegPolygonShape(), new Fortis.ColorMaterial(color2,color));
    e1.pos = new Fortis.Vector2(100,100);
    //e1.shape.setDegree(180);
    console.log(e1)
    layer.add(e1);
    scene.add(layer)
}

function Update() {
    //e1.angle ++;
}

function EngineLoaded(){}
let scene, bg, color, color2, material, grad;
let e1;
let layer;

function Init() {
    Fortis.Game.config.debug = true;
    //Fortis.Game.config.loop = false;
}

function Ready() {
    scene = new Fortis.Scene();
    color = new Fortis.Color("blue");
    color2 = new Fortis.Color("red");
    grad = new Fortis.ConicGradation(new Fortis.Vector2(0, 0), 0);
    grad.addColors([
        { "value": 0, "color": color },
        { "value": 1, "color": color2 }
    ]);
    scene.bg = bg;
    Fortis.Game.scene = scene;
    material = new Fortis.ColorMaterial(color, color2);
    layer = new Fortis.Layer();

    let vertices = [
        new Fortis.Vector2(50, 50),
        new Fortis.Vector2(40, -50),
        new Fortis.Vector2(-40, -40)
    ]

    e1 = new Fortis.Entity(new Fortis.RectShape(300, 300), new Fortis.ColorMaterial(grad));
    e1.pos = new Fortis.Vector2(200, 200);
    //e1.shape.setDegree(180);
    console.log(e1)
    layer.add(e1);
    scene.add(layer)
}

function Update() {
    //e1.move(new Fortis.Vector2(1,1));
    //console.log(e1.material.fill.pos)
}

function EngineLoaded() { }
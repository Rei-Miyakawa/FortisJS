let scene,bg,color,color2,material;

function Init() {
    Fortis.Game.config.debug = true;
}

function Ready() {
    scene = new Fortis.Scene();
    color = new Fortis.Color("orange");
    color2 = new Fortis.Color("red");
    scene.bg = bg;
    Fortis.Game.scene = scene;
    let vec1 = new Fortis.Vector2(10,10);
    let vec2 = new Fortis.Vector2(110,110);
    console.log(vec1.normalize());
    material = new Fortis.ColorMaterial(color,color2);
}

function Update() {
//console.log("aa")
}
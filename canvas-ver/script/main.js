let scene,bg,color;

function Init() {
    Fortis.Game.config.debug = true;
}

function Ready() {
    scene = new Fortis.Scene();
    color = new Fortis.Color("orange");
    bg = new Fortis.ColorBG(color);
    scene.bg = bg;
    Fortis.Game.scene = scene;
}

function Update() {
//console.log("aa")
}
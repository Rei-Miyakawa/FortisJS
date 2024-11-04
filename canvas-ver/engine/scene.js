Fortis.Scene = class{
    constructor(){
        this.type = "Scene";
        this.bg;
        this.Objects = [];
    }
    getType(){
        return this.type;
    }
    delete(){
        this.type = null;
        this.bg = null;
        this.Objects = null;
    }
    getBG(){
        return this.bg;
    }
}
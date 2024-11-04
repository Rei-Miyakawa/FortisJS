Fortis.Game.draw = function(){
    Fortis.Game.context.clearRect(0,0,Fortis.Game.size.x,Fortis.Game.size.y);//オフスクリーンキャンバスの初期化
    
    //背景
    switch(Fortis.Game.scene.bg.type){
        case "ColorBG":
            Fortis.Game.context.fillStyle = Fortis.Game.scene.bg.color.toRGBA();
            Fortis.Game.context.fillRect(0,0,Fortis.Game.size.x,Fortis.Game.size.y);
            break
    }    
    
    //実際に表示されるキャンバスの処理
    Fortis.Game.finalContext.clearRect(0,0,Fortis.Game.size.x,Fortis.Game.size.y);
    Fortis.Game.finalContext.drawImage(Fortis.Game.canvas.transferToImageBitmap(),0,0);
}
Fortis.Game.draw = function () {
    Fortis.Game.context.clearRect(0, 0, Fortis.Game.size.x, Fortis.Game.size.y);//オフスクリーンキャンバスの初期化
    if (Fortis.Game.scene != null) {//シーンが設定されているか
    }
    Fortis.Game.context.fillStyle = material.fill.toRGBA();
    Fortis.Game.context.fillRect(0,0,Fortis.Game.canvas.width,Fortis.Game.canvas.height);//キャンバスを塗りつぶし
    Fortis.Game.context.strokeStyle = material.stroke.toRGBA();
    Fortis.Game.context.lineWidth = 10;
    Fortis.Game.context.strokeRect(100,100,50,50);//正方形を描画

    //実際に表示されるキャンバスの処理
    Fortis.Game.finalContext.clearRect(0, 0, Fortis.Game.size.x, Fortis.Game.size.y);
    Fortis.Game.finalContext.drawImage(Fortis.Game.canvas.transferToImageBitmap(), 0, 0);
}
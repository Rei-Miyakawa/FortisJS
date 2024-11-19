Fortis.Game.draw = function () {
    Fortis.Game.context.clearRect(0, 0, Fortis.Game.size.x, Fortis.Game.size.y);//オフスクリーンキャンバスの初期化
    if (Fortis.Game.scene != null) {//シーンが設定されているか
        Fortis.Game.context.beginPath();
        Fortis.Game.scene.layer.forEach(layer => {
            layer.entity.forEach(entity => {
                if (!entity.invisibility) {
                    switch(entity.shape.type){
                        case "LineShape":
                            Fortis.draw.line(entity);
                            break
                    }
                }
            });
        });
        Fortis.Game.context.closePath();
    }

    //実際に表示されるキャンバスの処理
    Fortis.Game.finalContext.clearRect(0, 0, Fortis.Game.size.x, Fortis.Game.size.y);
    Fortis.Game.finalContext.drawImage(Fortis.Game.canvas.transferToImageBitmap(), 0, 0);
}

Fortis.draw.line = function(entity){
    if(entity.material.stroke != false){
        Fortis.Game.context.moveTo(entity.pos.x,entity.pos.y);
        let pos = Fortis.util.getPointOnCircle(entity.pos,entity.shape.length,entity.angle);
        Fortis.Game.context.lineTo(pos.x,pos.y);
        Fortis.Game.context.strokeStyle = entity.material.stroke.toRGBA();
        Fortis.Game.context.lineWidth = entity.shape.thick;
        Fortis.Game.context.stroke();
    }
}
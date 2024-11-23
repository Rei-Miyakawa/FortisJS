Fortis.Game.draw = function () {
    Fortis.Game.context.clearRect(0, 0, Fortis.Game.size.x, Fortis.Game.size.y);//オフスクリーンキャンバスの初期化
    if (Fortis.Game.scene != null) {//シーンが設定されているか
        Fortis.Game.scene.layer.forEach(layer => {
            layer.entity.forEach(entity => {
                if (!entity.invisibility) {
                    Fortis.Game.context.save();
                    Fortis.Game.context.translate(entity.pos.x, entity.pos.y);
                    Fortis.Game.context.rotate(Fortis.util.degreeToRadian(entity.angle));
                    switch (entity.shape.type) {
                        case "LineShape":
                            Fortis.draw.line(entity);
                            break
                        case "RectShape":
                            Fortis.draw.rect(entity);
                            break
                        case "CircleShape":
                            Fortis.draw.circle(entity);
                            break
                        case "EllipseShape":
                            Fortis.draw.ellipse(entity);
                            break
                    }
                    Fortis.Game.context.restore();
                }
            });
        });
    }

    //実際に表示されるキャンバスの処理
    Fortis.Game.finalContext.clearRect(0, 0, Fortis.Game.size.x, Fortis.Game.size.y);
    Fortis.Game.finalContext.drawImage(Fortis.Game.canvas.transferToImageBitmap(), 0, 0);
}

Fortis.draw.line = function (entity) {
    if (entity.material.stroke != false) {
        Fortis.Game.context.moveTo(0, 0);
        Fortis.Game.context.lineTo(entity.shape.length, 0);
        Fortis.Game.context.strokeStyle = entity.material.stroke.toRGBA();
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.stroke();
    }
}

Fortis.draw.rect = function (entity) {
    if (entity.material.fill != false) {
        Fortis.Game.context.fillStyle = entity.material.fill.toRGBA();
        Fortis.Game.context.fillRect(-entity.shape.size.x/2,-entity.shape.size.y/2,entity.shape.size.x,entity.shape.size.y);
    }
    if(entity.material.stroke != false){
        Fortis.Game.context.strokeStyle = entity.material.stroke.toRGBA();
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.strokeRect(-entity.shape.size.x/2,-entity.shape.size.y/2,entity.shape.size.x,entity.shape.size.y);
    }
}

Fortis.draw.circle = function(entity){
    Fortis.Game.context.beginPath();
    Fortis.Game.context.arc(0,0, entity.shape.radius, 0, Fortis.util.degreeToRadian(entity.shape.degree));
    if (entity.material.fill != false) {
        Fortis.Game.context.fillStyle = entity.material.fill.toRGBA();
        Fortis.Game.context.fill();
    }
    if(entity.material.stroke != false){
        Fortis.Game.context.strokeStyle = entity.material.stroke.toRGBA();
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.stroke();
    }
    Fortis.Game.context.closePath();
}

Fortis.draw.ellipse = function(entity){
    Fortis.Game.context.beginPath();
    Fortis.Game.context.ellipse(0,0,entity.shape.radSize.x,entity.shape.radSize.y,0,0,Fortis.util.degreeToRadian(entity.shape.degree));
    if (entity.material.fill != false) {
        Fortis.Game.context.fillStyle = entity.material.fill.toRGBA();
        Fortis.Game.context.fill();
    }
    if(entity.material.stroke != false){
        Fortis.Game.context.strokeStyle = entity.material.stroke.toRGBA();
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.stroke();
    }
    Fortis.Game.context.closePath();
}
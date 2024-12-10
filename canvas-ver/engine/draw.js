Fortis.Game.draw = function () {
    Fortis.Game.context.clearRect(0, 0, Fortis.Game.size.x, Fortis.Game.size.y);//オフスクリーンキャンバスの初期化
    if (Fortis.Game.scene != null) {//シーンが設定されているか
        Fortis.Game.scene.layer.forEach(layer => {
            repeatIdentifyingEntity(layer, false);
        });
    }

    //実際に表示されるキャンバスの処理
    Fortis.Game.finalContext.clearRect(0, 0, Fortis.Game.size.x, Fortis.Game.size.y);
    Fortis.Game.finalContext.drawImage(Fortis.Game.canvas.transferToImageBitmap(), 0, 0);

    function repeatIdentifyingEntity(array, mode) {//arrayにlayerもしくはContainer、modeにtrueかfalse(containerならtrue)
        array.entity.forEach(tmpEntity => {
            let entity = tmpEntity;
            if (mode) entity = tmpEntity["entity"];
            if (!entity.invisibility) {
                Fortis.Game.context.save();
                if (mode) Fortis.Game.context.globalCompositeOperation = entity["composite"];
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
                    case "RegPolygonShape":
                        Fortis.draw.regPolygon(entity);
                        break
                    case "PolygonShape":
                        Fortis.draw.polygon(entity);
                        break
                    case "EntityContainer":
                        repeatIdentifyingEntity(entity, true);
                }
                Fortis.Game.context.restore();
            }
        });
    }
}

Fortis.draw.line = function (entity) {
    if (entity.material.stroke != false) {
        Fortis.Game.context.moveTo(0, 0);
        Fortis.Game.context.lineTo(entity.shape.length, 0);
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.stroke();
    }
}

Fortis.draw.rect = function (entity) {
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.fillRect(-entity.shape.size.x / 2, -entity.shape.size.y / 2, entity.shape.size.x, entity.shape.size.y);
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.strokeRect(-entity.shape.size.x / 2, -entity.shape.size.y / 2, entity.shape.size.x, entity.shape.size.y);
    }
}

Fortis.draw.circle = function (entity) {
    Fortis.Game.context.beginPath();
    Fortis.Game.context.arc(0, 0, entity.shape.radius, 0, Fortis.util.degreeToRadian(entity.shape.degree));
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.stroke();
    }
    Fortis.Game.context.closePath();
}

Fortis.draw.ellipse = function (entity) {
    Fortis.Game.context.beginPath();
    Fortis.Game.context.ellipse(0, 0, entity.shape.radSize.x, entity.shape.radSize.y, 0, 0, Fortis.util.degreeToRadian(entity.shape.degree));
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.stroke();
    }
    Fortis.Game.context.closePath();
}

Fortis.draw.regPolygon = function (entity) {
    Fortis.Game.context.beginPath();

    let vertices;
    if (entity.shape.vertices == false) {
        vertices = entity.shape.getPolyVertices();
    } else {
        vertices = entity.shape.vertices;
    }
    let vertice_count = 0;
    vertices.forEach(vertice => {
        if (vertice_count == 0) {
            Fortis.Game.context.moveTo(vertice.x, vertice.y);
        } else {
            Fortis.Game.context.lineTo(vertice.x, vertice.y);
        }
        vertice_count++;
    });
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.closePath();
        Fortis.Game.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.Game.context.lineTo(vertices[0].x, vertices[0].y);
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.closePath();
        Fortis.Game.context.stroke();
    }
}

Fortis.draw.polygon = function (entity) {
    Fortis.Game.context.beginPath();

    let vertices = entity.shape.vertices
    let vertice_count = 0;
    vertices.forEach(vertice => {
        if (vertice_count == 0) {
            Fortis.Game.context.moveTo(vertice.x, vertice.y);
        } else {
            Fortis.Game.context.lineTo(vertice.x, vertice.y);
        }
        vertice_count++;
    });

    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.closePath();
        Fortis.Game.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.Game.context.lineTo(vertices[0].x, vertices[0].y);
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.closePath();
        Fortis.Game.context.stroke();
    }
}

Fortis.draw.setFillColor = function (color) {
    if (color.type.indexOf("Gradation") == -1) {
        Fortis.Game.context.fillStyle = color.toRGBA();
    } else {
        Fortis.Game.context.fillStyle = color.gradation;
    }
}

Fortis.draw.setStrokeColor = function (color) {
    if (color.type.indexOf("Gradation") == -1) {
        Fortis.Game.context.strokeStyle = color.toRGBA();
    } else {
        Fortis.Game.context.strokeStyle = color.gradation;

    }
}
Fortis.Game.draw = function (delta) {
    if (Fortis.Game.scene == null) return Fortis.error.SceneNotSet();//シーンが設定されているか
    Fortis.Game.context.clearRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);//オフスクリーンキャンバスの初期化
    Fortis.Game.scene.layer.forEach(layer => {
        //Fortis.Game.context.clearRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);//オフスクリーンキャンバスの初期化
        //Fortis.Game.canvas.width = layer.camera.displayRange.x;
        //Fortis.Game.canvas.height = layer.camera.displayRange.y;
        repeatIdentifyingEntity(layer, false);
        //layer.camera.shot();
    });

    //実際に表示されるキャンバスの処理
    Fortis.Game.finalContext.clearRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);
    Fortis.Game.finalContext.fillStyle = Fortis.Game.canvasCfg.BGColor.toHex();
    Fortis.Game.finalContext.fillRect(0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);
    //Fortis.Game.scene.layer.forEach(layer => {
        //Fortis.Game.finalContext.drawImage(layer.camera.getData(), layer.camera.pos.x, layer.camera.pos.y, layer.camera.displayRange.x*layer.camera.scale.x, layer.camera.displayRange.y*layer.camera.scale.y);
    //});

    Fortis.Game.finalContext.drawImage(Fortis.Game.canvas.transferToImageBitmap(), 0, 0, Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y);

    function repeatIdentifyingEntity(array, mode) {//arrayにlayerもしくはContainer、modeにtrueかfalse(containerならtrue)
        array.entity.forEach(tmpEntity => {
            let entity = tmpEntity;
            if (entity.alpha !== undefined && entity.alpha != 0) {
                Fortis.Game.context.save();
                if (mode) {
                    entity = tmpEntity["entity"];
                    Fortis.Game.context.globalCompositeOperation = tmpEntity["composite"];
                } else {
                    Fortis.Game.context.globalCompositeOperation = "source-over";
                }
                if (entity.type == "EntityContainer") {
                    repeatIdentifyingEntity(entity, true);
                } else {
                    Fortis.Game.context.globalAlpha = entity.alpha;
                    let degree = Fortis.util.radianToDegree(Math.atan2(entity.pos.y,entity.pos.x));
                    console.log(degree+array.camera.angle)
                    Fortis.Game.context.translate(entity.pos.x*array.camera.scale.x*Math.cos(Fortis.util.degreeToRadian(degree+array.camera.angle)) + array.camera.pos.x, entity.pos.y*array.camera.scale.y*Math.sin(Fortis.util.degreeToRadian(degree+array.camera.angle)) + array.camera.pos.y);
                    Fortis.Game.context.rotate(Fortis.util.degreeToRadian(entity.angle+array.camera.angle));
                    Fortis.Game.context.scale(array.camera.scale.x,array.camera.scale.y);
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
                        case "TextShape":
                            Fortis.draw.text(entity);
                            break
                        case "ImageShape":
                            Fortis.draw.image(entity);
                            break
                        case "SpriteShape":
                            Fortis.draw.image(entity, true);
                            break
                    }
                    Fortis.Game.context.restore();
                }
            } else {
                entity.func(delta);
            }
        });
    }
}

Fortis.draw.line = function (entity) {
    if (entity.material.stroke != false) {
        Fortis.Game.context.beginPath();
        Fortis.Game.context.moveTo(entity.shape.distance.x, entity.shape.distance.y);
        Fortis.Game.context.lineTo(entity.shape.distance.x + entity.shape.length * entity.scale.x, 0);
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick * entity.scale.x;
        Fortis.Game.context.stroke();
        Fortis.Game.context.closePath();
    }
}

Fortis.draw.rect = function (entity) {
    let size = entity.shape.size.copy();
    size.x *= entity.scale.x;
    size.y *= entity.scale.x;
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.fillRect(entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick;
        Fortis.Game.context.strokeRect(entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    }
}

Fortis.draw.circle = function (entity) {
    Fortis.Game.context.beginPath();
    Fortis.Game.context.arc(entity.shape.distance.x, entity.shape.distance.y, entity.shape.radius * entity.scale.x, 0, Fortis.util.degreeToRadian(entity.shape.degree));
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick * entity.scale.x;
        Fortis.Game.context.stroke();
    }
    Fortis.Game.context.closePath();
}

Fortis.draw.ellipse = function (entity) {
    Fortis.Game.context.beginPath();
    Fortis.Game.context.ellipse(entity.shape.distance.x, entity.shape.distance.y, entity.shape.radSize.x * entity.scale.x, entity.shape.radSize.y * entity.scale.y, 0, 0, Fortis.util.degreeToRadian(entity.shape.degree));
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick * entity.scale.x;
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
            Fortis.Game.context.moveTo(entity.shape.distance.x + vertice.x * entity.scale.x, entity.shape.distance.y + vertice.y * entity.scale.y);
        } else {
            Fortis.Game.context.lineTo(entity.shape.distance.x + vertice.x * entity.scale.x, entity.shape.distance.y + vertice.y * entity.scale.y);
        }
        vertice_count++;
    });
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.closePath();
        Fortis.Game.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.Game.context.lineTo(entity.shape.distance.x + vertices[0].x * entity.scale.x, entity.shape.distance.y + vertices[0].y * entity.scale.y);
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick * entity.scale.x;
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
            Fortis.Game.context.moveTo(entity.shape.distance.x + vertice.x * entity.scale.x, entity.shape.distance.y + vertice.y * entity.scale.y);
        } else {
            Fortis.Game.context.lineTo(entity.shape.distance.x + vertice.x * entity.scale.x, entity.shape.distance.y + vertice.y * entity.scale.y);
        }
        vertice_count++;
    });

    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.closePath();
        Fortis.Game.context.fill();
    }
    if (entity.material.stroke != false) {
        Fortis.Game.context.lineTo(entity.shape.distance.x + vertices[0].x * entity.scale.x, entity.shape.distance.y + vertices[0].y * entity.scale.y);
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.lineWidth = entity.material.thick * entity.scale.x;
        Fortis.Game.context.closePath();
        Fortis.Game.context.stroke();
    }
}

Fortis.draw.text = function (entity) {
    Fortis.Game.context.textAlign = "center";
    Fortis.Game.context.textBaseline = "middle";
    Fortis.Game.context.font = entity.shape.font.output(entity.scale.x);
    Fortis.Game.context.direction = entity.shape.direction;
    if (entity.material.fill != false) {
        Fortis.draw.setFillColor(entity.material.fill);
        Fortis.Game.context.fillText(entity.shape.text, entity.shape.distance.x, entity.shape.distance.y);
    }
    if (entity.material.stroke != false) {
        Fortis.draw.setStrokeColor(entity.material.stroke);
        Fortis.Game.context.strokeText(entity.shape.text, entity.shape.distance.x, entity.shape.distance.y);
    }
}

Fortis.draw.image = function (entity, sprite) {
    let size = entity.shape.size.copy();
    size.x *= entity.scale.x;
    size.y *= entity.scale.x;
    if (sprite) {
        Fortis.Game.context.drawImage(Fortis.ImageLoader.getImg(entity.material.key), entity.shape.clipSize.x * ((entity.shape.nowFrame - 1) % entity.shape.aspect.x), entity.shape.clipSize.y * Math.floor((entity.shape.nowFrame - 1) / entity.shape.aspect.x), entity.shape.clipSize.x, entity.shape.clipSize.y, entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    } else if (entity.shape.clipPos === undefined) {
        Fortis.Game.context.drawImage(Fortis.ImageLoader.getImg(entity.material.key), entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
    } else {
        Fortis.Game.context.drawImage(Fortis.ImageLoader.getImg(entity.material.key), entity.shape.clipPos.x, entity.shape.clipPos.y, entity.shape.clipSize.x, entity.shape.clipSize.y, entity.shape.distance.x - size.x / 2, entity.shape.distance.y - size.y / 2, size.x, size.y);
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
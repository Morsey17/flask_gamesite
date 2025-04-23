const screen = {width : 1300, height : 800}

const app = new PIXI.Application({ width: screen.width, height: screen.height });
document.body.appendChild(app.view);




// Красный квадрат
const square = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawCircle(0, 0, 20)
    .endFill();
square.x = 350;
square.y = 250;
app.stage.addChild(square);


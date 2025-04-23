// Обработка кликов
const control_area = new PIXI.Graphics()
    .beginFill('rgb(50, 0, 105)')
    .drawRect(0, 0, screen.width - 20, screen.height - 20)
    .endFill();
control_area.x = 10;
control_area.y = 10;
app.stage.addChild(control_area);
app.stage.setChildIndex(control_area, 0);

control_area.interactive = true;
control_area.on('pointerdown', () => {
    control_area.tint = 'rgb(120, 100, 150)';
});

control_area.on('pointerup', () => {
    control_area.tint = 'rgb(50, 0, 100)';
});

// Обработка клавиатуры
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);
const width = 1300
const height = 700

const app = new PIXI.Application({ width: width, height: height });
document.body.appendChild(app.view);



const fon = new PIXI.Graphics()
    .beginFill('rgb(50, 0, 105)')
    .drawRect(0, 0, width - 20, height - 20)
    .endFill();
fon.x = 10;
fon.y = 10;
app.stage.addChild(fon);


// Красный квадрат
const square = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawCircle(0, 0, 20)
    .endFill();
square.x = 350;
square.y = 250;
app.stage.addChild(square);

// Обработка кликов
square.interactive = true;
square.on('pointerdown', () => {
    square.tint = 0x00FF00;
});
square.on('pointerup', () => {
    square.tint = 0xFFFFFF;
});

// Обработка клавиатуры
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

// Настройки фиксированного шага
const FIXED_TIMESTEP = 1 / 60; // 60 FPS (0.016666 секунд)
const MAX_FRAMES = 10; // Максимальное количество кадров для обработки за раз
let accumulator = 0;
let lastTime = performance.now();

// Заменяем стандартный ticker на свой игровой цикл
app.ticker.remove(app.ticker._tick); // Отключаем стандартный ticker

// Собственный игровой цикл с фиксированным шагом
function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);

    // Вычисляем deltaTime
    let deltaTime = (currentTime - lastTime) / 1000; // в секундах
    lastTime = currentTime;

    // Защита от аномально больших значений deltaTime
    deltaTime = Math.min(deltaTime, 0.1);

    // Добавляем deltaTime в аккумулятор
    accumulator += deltaTime;

    // Обрабатываем фиксированные шаги
    let frames = 0;
    while (accumulator >= FIXED_TIMESTEP && frames < MAX_FRAMES) {
        update(FIXED_TIMESTEP); // Физика и логика игры
        accumulator -= FIXED_TIMESTEP;
        frames++;
    }

    // Рендеринг с интерполяцией для плавности
    render(accumulator / FIXED_TIMESTEP);
}

// Функция обновления игровой логики (фиксированный шаг)
function update(delta) {
    const speed = 500; // пикселей в секунду

    if (keys['KeyW'] || keys['ArrowUp']) square.y -= speed * delta;
    if (keys['KeyS'] || keys['ArrowDown']) square.y += speed * delta;
    if (keys['KeyA'] || keys['ArrowLeft']) square.x -= speed * delta;
    if (keys['KeyD'] || keys['ArrowRight']) square.x += speed * delta;

    // Границы экрана
    square.x = Math.max(0, Math.min(app.screen.width - 100, square.x));
    square.y = Math.max(0, Math.min(app.screen.height - 100, square.y));
}

// Функция рендеринга (с интерполяцией)
function render(alpha) {
    app.renderer.render(app.stage);
}

// Запускаем игровой цикл
requestAnimationFrame(gameLoop);
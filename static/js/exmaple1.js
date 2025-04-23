// Инициализация приложения PixiJS
const app = new PIXI.Application({
    width: 800,          // ширина canvas
    height: 600,         // высота canvas
    backgroundColor: 0x1099bb, // цвет фона (голубой)
    antialias: true      // сглаживание
});

// Добавляем canvas в body документа
document.body.appendChild(app.view);

// Создаём графику (красный квадрат)
const square = new PIXI.Graphics();
square.beginFill(0xFF0000);
square.drawRect(0, 0, 100, 100);
square.beginFill(0xAF1010);
square.drawRect(0, 0, 10, 10);
square.endFill();

// Позиционируем квадрат по центру экрана
square.x = app.screen.width / 2 - 50; // 50 - половина ширины квадрата
square.y = app.screen.height / 2 - 50; // 50 - половина высоты квадрата

// Добавляем квадрат на сцену
app.stage.addChild(square);


const sprite = PIXI.Sprite.from('/static/texture/ship1.png');
sprite.interactive = true; // включаем интерактивность
sprite.buttonMode = true; // курсор меняется на pointer при наведении

// Обработчики событий
sprite.on('pointerdown', (event) => {
    console.log('Клик по спрайту!', event);
    sprite.tint = 0xFF0000; // меняем цвет при клике
});

sprite.on('pointerup', () => {
    sprite.tint = 0xFFFFFF; // возвращаем цвет
});

app.stage.addChild(sprite);

let dragging = false;

sprite.interactive = true;
sprite.on('pointerdown', (event) => {
    dragging = true;
    sprite.alpha = 0.5;
    sprite.data = event.data;
});

sprite.on('pointermove', () => {
    if (dragging) {
        const newPosition = sprite.data.getLocalPosition(sprite.parent);
        sprite.x = newPosition.x - sprite.width / 2;
        sprite.y = newPosition.y - sprite.height / 2;
    }
});

sprite.on('pointerup', () => {
    dragging = false;
    sprite.alpha = 1;
});

sprite.on('pointerupoutside', () => {
    dragging = false;
    sprite.alpha = 1;
});


const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// В игровом цикле проверяем состояние клавиш
app.ticker.add(() => {
    console.log(1)
    if (keys['ArrowUp']) {
        sprite.y -= 5;
    }
    if (keys['ArrowDown']) {
        sprite.y += 5;
    }
    if (keys['ArrowLeft']) {
        sprite.x -= 5;
    }
    if (keys['ArrowRight']) {
        sprite.x += 5;
    }
});








const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

// Красный квадрат
const square = new PIXI.Graphics()
    .beginFill(0xFFFFFF)
    .drawRect(0, 0, 100, 100)
    .endFill();
square.x = 350;
square.y = 250;
app.stage.addChild(square);

// Обработка кликов
square.interactive = true;
square.on('pointerdown', () => {
    square.tint = 'rgb(0, 255, 0)'; // зелёный при клике
});

square.on('pointerup', () => {
    square.tint = 'rgb(255, 255, 255)'; // белый (исходный цвет)
});

// Обработка клавиатуры
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

// Игровой цикл
app.ticker.add(() => {
    const speed = 5;
    if (keys['KeyW'] || keys['ArrowUp']) square.y -= speed;
    if (keys['KeyS'] || keys['ArrowDown']) square.y += speed;
    if (keys['KeyA'] || keys['ArrowLeft']) square.x -= speed;
    if (keys['KeyD'] || keys['ArrowRight']) square.x += speed;

    // Границы экрана
    square.x = Math.max(0, Math.min(app.screen.width - 100, square.x));
    square.y = Math.max(0, Math.min(app.screen.height - 100, square.y));
});









const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);


const fon = new PIXI.Graphics()
    .beginFill('rgb(50, 0, 105)')
    .drawRect(0, 0, 780, 580)
    .endFill();
fon.x = 10;
fon.y = 10;
app.stage.addChild(fon);


// Красный квадрат
/*
const square = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawRect(0, 0, 100, 100)
    .endFill();*/
const square = PIXI.Sprite.from('/static/texture/ship1.png');
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
    const speed = 300; // пикселей в секунду

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
    // В этом простом примере интерполяция не нужна,
    // но в более сложных сценах можно использовать alpha
    // для плавного рендеринга между фиксированными шагами

    app.renderer.render(app.stage);
}

// Запускаем игровой цикл
requestAnimationFrame(gameLoop);
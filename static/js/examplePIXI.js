


const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x222222,
    antialias: true
});
document.body.appendChild(app.view);

const TARGET_FPS = 40;
const FRAME_TIME = 1000 / TARGET_FPS;
let lastTime = performance.now();
let accumulatedTime = 0;

class Bullet {
    constructor(x, y, rotation, speed, damage, team) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.speed = speed;
        this.damage = damage;
        this.team = team;
        this.sprite = new PIXI.Sprite(Bullet.texture);
        this.sprite.anchor.set(0.5);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.rotation = rotation;
    }

    update(delta) {
        const frameSpeed = this.speed * delta;
        this.x += Math.cos(this.rotation) * frameSpeed;
        this.y += Math.sin(this.rotation) * frameSpeed;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}

Bullet.texture = null;

const bullets = [];
const bulletContainer = new PIXI.ParticleContainer(1000, {
    position: true,
    rotation: true,
    scale: false,
    alpha: false
});
app.stage.addChild(bulletContainer);

// Полностью заменяем встроенный ticker
app.ticker.remove(app.ticker._tick);
app.ticker = null;

async function init() {
    Bullet.texture = await PIXI.Assets.load('/static/texture/bullet.png');

    for (let i = 0; i < 10; i++) {
        createBullet();
    }

    requestAnimationFrame(gameLoop);
}

function createBullet() {
    const bullet = new Bullet(
        app.screen.width / 2,
        app.screen.height / 2,
        Math.random() * Math.PI * 2,
        3,
        10,
        'player'
    );
    bullets.push(bullet);
    bulletContainer.addChild(bullet.sprite);
    return bullet;
}

function gameLoop(currentTime) {

    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    accumulatedTime += deltaTime;

    // Обновляем с фиксированным шагом времени
    while (accumulatedTime >= FRAME_TIME) {
        updateGame(FRAME_TIME / 1000); // Передаём время в секундах
        accumulatedTime -= FRAME_TIME;
    }

    requestAnimationFrame(gameLoop);
}

function updateGame(delta) {
    // Удаляем сначала все пули за границами
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        if (bullet.x < 0 || bullet.x > app.screen.width ||
            bullet.y < 0 || bullet.y > app.screen.height) {
            bulletContainer.removeChild(bullet.sprite);
            bullets.splice(i, 1);
        }
    }

    // Затем обновляем оставшиеся
    for (const bullet of bullets) {
        bullet.update(delta);
    }
}

init();
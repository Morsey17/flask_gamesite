/*
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(0,0,0)";

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;


var imageShip1 = new Image;
imageShip1.src = "/static/texture/ship1.png";
var imageAster1 = new Image;
imageAster1.src = "/static/texture/aster1.png";


var setCamera = () => {
    ctx.resetTransform();
    ctx.translate(centerX - hero.x, centerY - hero.y)
}


class Aster {
	constructor (id, x, y) {
		this.id = id;
		this.x = x;
		this.y = y;

		if (id == 0) {
			this.tex = imageAster1;
            this.w = this.h = 50
		}

		this.draw = () => {
            setCamera()
            ctx.drawImage(this.tex, this.x - this.w / 2, this.y - this.h / 2);
		}
	}
}

var aster = []
aster.push(new Aster(0, 200, 200))
aster.push(new Aster(0, 100, 500))
aster.push(new Aster(0, 500, 800))


class Ship {
	constructor (team, id, x, y, a) {
		this.team = team;
		this.id = id;
		this.x = x;
		this.y = y;
		this.a = a;
		this.f = 5;
		this.fa = 0.03;


		if (this.id == 0) {
			this.tex = imageShip1;
			this.w = 35;
			this.h = 35;
			this.f = 2.5;
		}

		this.move = () => {
			this.x = this.x + this.f * Math.cos(this.a);
			this.y = this.y + this.f * Math.sin(this.a);
		}

		this.draw = () => {
            setCamera()
			ctx.translate(this.x, this.y);
			//this.a += 0.01;
			ctx.rotate(this.a);
			ctx.drawImage(this.tex, -this.w / 2, -this.h / 2);
		}
	}

}

var ship = []
ship.push(new Ship(0, 0, 200, 200, 0))

var hero = ship[0]

function Func(x1){
	ctx.resetTransform();

	ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (key[65]) hero.a -= hero.fa; //A
    if (key[68]) hero.a += hero.fa; //D

	aster.forEach((el) => el.draw());
    aster[0].draw()

	hero.move();
	hero.draw();

	fetch('/move', {
	    method: 'POST',
	    headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({x: hero.x})
	});

};


setInterval(Func, 200, 0)

const key = {65:false, 87:false, 68:false, 83:false, 32:false }

document.addEventListener('keydown', (e) => {
	if (e.keyCode in key)
		key[e.keyCode] = true
});

document.addEventListener('keyup', (e) => {
	if (e.keyCode in key)
		key[e.keyCode] = false;
	//console.log(e.keyCode);
});

*/
'use strict'

var id = 0

var key = {65:false, 87:false, 68:false, 83:false, 32:false }

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(0,0,0)";


var image = {
    ship: new Image,
    dron: new Image,
    aster: new Image,
}

image['ship'].src = "/static/texture/ship1.png";
image['aster'].src = "/static/texture/aster1.png";

function draw(img, x, y, a) {
	ctx.resetTransform();
	ctx.translate(x, y);
	ctx.rotate(a);
    ctx.drawImage(image[img], -image[img].width / 2, -image[img].height / 2);
}

const socket = io('http://192.168.164.81:5000');

// Подключение к серверу
socket.on('connect', () => {
    console.log("Connected to server");
});


socket.on('get_id', (data) => {
    id = data
    console.log(data);
});

// Получение обновлений игры
socket.on('game_update', (data) => {
    // Отрисовка состояния игры
    console.log(data)
	ctx.resetTransform();
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    data['ship'].forEach(function(s, i, a){draw(s['img'], s['x'], s['y'], s['a'])});

    let temp = 0
    if (key[65]) temp = -1; //A
    if (key[68]) temp = 1; //D
    sendInput(temp);
});

// Отправка ввода игрока
function sendInput(state) {
    socket.emit('player_input', {
        id: id, state: state,
    });
}

document.addEventListener('keydown', (e) => {
	if (e.keyCode in key)
		key[e.keyCode] = true
});

document.addEventListener('keyup', (e) => {
	if (e.keyCode in key)
		key[e.keyCode] = false;
});

*/
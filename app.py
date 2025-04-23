from flask import Flask, render_template, request, redirect, jsonify, send_from_directory
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import threading
import time


app = Flask(__name__, static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return '<Article %r>' % self.id

socketio = SocketIO(app, cors_allowed_origins="*")

CORS(app, resources={r"/socket.io/*": {"origins": "http://192.168.164.81:5000"}})


player = {}





# Обработчик подключений


"""
@socketio.on("message")
def handle_message(msg):
    print("Принято:", msg)
    socketio.emit("update", "Сервер получил: " + msg)

@socketio.on('connect')
def handle_connect():
    id = request.sid
    player[id] = game.newPlayer()
    print(f"Клиент подключен: {id}, Номер корабля: {player[id]}")
    socketio.emit('get_id', id, room=id)

# Обработчик ввода
@socketio.on('player_input')
def handle_input(data):
    #print(data)
    num_ship = player[data["id"]]
    game.ship[num_ship].set_control(data["state"])
"""




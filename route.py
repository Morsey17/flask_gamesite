from app import *


@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('static', path)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/game')
def func_game():
    return render_template('game.html', src_script='script1.js')


@app.route('/test')
def func_test():
    return render_template('test.html')


@app.route('/users')
def func_user():
    users = User.query.order_by(User.name.desc()).all()
    return render_template('users.html', users=users)


@app.route('/registr', methods=['POST', 'GET'])
def reg():
    if request.method == 'GET':
        return render_template('registration.html')
    else:
        try:
            name = request.form['name']
            pw = request.form['pw']
            user = User(name=name, password=pw)
            try:
                db.session.add(user)
                db.session.commit()
                return redirect('/')
            except Exception as e:
                print(e)
                return "При регистрации произошла ошибка."
        except Exception as e: print(e)

        return redirect('/registr')
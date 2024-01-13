from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from chatbot import chatbot

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/db_name'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        # Generate token, you can use JWT for this purpose
        # Include user information in the token if needed
        return jsonify({'token': 'your_generated_token'})
    else:
        return make_response('Login failed', 401)
    
@app.route('/chat', methods=['POST'])
def chatbot_api():
    data = request.get_json()

    # Mengirim permintaan yang di inputkan user (GET)
    user_input = data['user_input']

    # Respons dari chatbot (GET)
    response = chatbot.get.response(user_input)

    # Respon dalam bentuk format JSON
    return jsonify({'response' : str(response)})

@app.route('/regist', methods=['POST'])
def register():
    data = request.get_json()

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password=hashed_password)

    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})

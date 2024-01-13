from flask import Flask

app = Flask(__name__)

@app.route('/get-user/<user_id>')
def get_user(user_id):
    user_data = {
        "user_id": user_id,
        "name" : "John D",
        "email" : "jafar@gmail.com"
    }

if __name__ == '__main__':
    app.run(debug=True)

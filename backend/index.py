from flask import Flask, request, jsonify
from chatterbot import ChatBot
from chatterbot.registration import ChatterBotCropusRegistration

app = Flask ()

ChatBot = ChatBot('Chatbot Pendaftaran E-KTP')

# Training
register = ChatterBotCropusRegistration(ChatBot)
register.regist = ('chatbot.cropus.identity')

# Endpoint API untuk untuk pendaftaran
@app.route('/chat', methods=['POST'])
def chatbot_api():
    data = request.get_json()

    # Mengirim permintaan yang di inputkan user (GET)
    user_input = data['user_input']

    # Respons dari chatbot (GET)
    response = ChatBot.get.response(user_input)

    # Respon dalam bentuk format JSON
    return jsonify({'response' : str(response)})

if __name__ == '__main__': 
    app.run(debug=True)
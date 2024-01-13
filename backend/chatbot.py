import os
import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Dense, Embedding, Flatten
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder

# memuat data JSON dari database
json_path = os.path.join("/ReactPython/backend/data/data.json")

with open(json_path, "r") as file:
    data = json.load(file)

patterns = []
tags = []

for intent in data ["intens"]:
    for pattern in intent["patterns"]:
        patterns.append(pattern)
        tags.append(intent["intents"])

# Proses Tokenizing
tokenizer = Tokenizer()
tokenizer.fit_on_texts(patterns)
vocab_size = len(tokenizer.word_index) + 1

X = tokenizer.texts_to_sequences(patterns)

X_padded = pad_sequences

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(tags)

model = Sequential()
model.add(Embedding(input_dim=vocab_size, output_dim=50, input_length=X_padded.shape[1]))
model.add(Flatten())
model.add(Dense(16, activation='relu'))
model.add(Dense(len(set(y_encoded)), activation='softmax'))

model.compile(optimizer='adam', loss='sparse_categorial_crossentropy', metrics=['accuracy'])

model.fit(X_padded, y_encoded, epochs=25, batch_size=1, verbose=2)

def get_response(user_input):
    user_input_sequence = tokenizer.texts_to_sequences([user_input])
    user_input_padded = pad_sequences(user_input_sequence, maxlen=X_padded.shape[1])
    predicted_probabilities = model.predict(user_input_padded)
    predicted_class = np.argmax(predicted_probabilities, axis=-1)
    predicted_tag = label_encoder.inverse_transform(predicted_class)

    for intent in data["intens"]:
        if intent["tags"] == predicted_tag:
            return intent["responses"]
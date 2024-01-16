import json

json_path = "backend\data\data.json"

with open(json_path, 'r') as file:
    data = json.load(file)

print(data)
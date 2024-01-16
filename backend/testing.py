import json
import os

json_path = os.path.join("backend\data\data.json")

with open(json_path, "r") as file:
    data = json.load(file)

print(data)
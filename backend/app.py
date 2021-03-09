import json
from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# NOTE: This route is needed for the default EB health check route
@app.route('/')
def home():
    return "ok"

if __name__ == '__main__':
    app.run(port=8080)
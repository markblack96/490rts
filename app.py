from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from random import *


app = Flask(__name__)
api = Api(app)
CORS(app)

negative_one_or_one = lambda : 1 if random() < 0.5 else -1

class RandomApi(Resource):
    def get(self):
        return negative_one_or_one()

api.add_resource(RandomApi, '/random')

if __name__ == '__main__':
        app.run(debug=True)

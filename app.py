import psycopg2
import sys
import json
from  flask import Flask,render_template
from flask import jsonify
from flask_cors import CORS
import avocadoConnect, amyapp, GuacVis, d3app
from avocadoConnect import avocado_json
from amyapp import week2019Json
from GuacVis import CompositeDict
from d3app import annualCaliData

app = Flask(__name__)
CORS(app)

@app.route('/')
def rendervis():
    return render_template("index.html", avocado_json=avocado_json, week2019Json=week2019Json, CompositeDict=CompositeDict, annualCaliData=annualCaliData)

if __name__ == '__main__':
    app.run(debug=True)
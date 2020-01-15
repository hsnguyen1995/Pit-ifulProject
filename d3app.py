import psycopg2
import sys
import json
from  flask import Flask,render_template
from flask import jsonify
from flask_cors import CORS

con = psycopg2.connect("host='localhost' dbname='avocado' user='postgres' password='postgres'")  

cur = con.cursor()

cur.execute("SELECT * FROM annualsince71")

columns = ('index', 'year', 'bearing_acres','avg_profit_per_acre', 'avg_pounds_per_acre')

annualCAData = []

# Create a List of Dictionaries from the Data

#Code Reference: https://www.peterbe.com/plog/from-postgres-to-json-strings

for row in cur.fetchall():

    annualCAData.append(dict(zip(columns, row)))
annualCaliData=json.dumps(annualCAData, indent=2)




import psycopg2
import sys
import json
from  flask import Flask,render_template
from flask import jsonify
from flask_cors import CORS

con = psycopg2.connect("host='localhost' dbname='avocado' user='postgres' password='postgres'")  

cur = con.cursor()

cur.execute("SELECT * FROM weeklyavoreport2019")

columns = ('index', 'week', 'historical4yearforecast', 'amricprojection', 'amricactualharvest')

AMRICData = []

# Create a List of Dictionaries from the Data

#Code Reference: https://www.peterbe.com/plog/from-postgres-to-json-strings

for row in cur.fetchall():

     AMRICData.append(dict(zip(columns, row)))

week2019Json=json.dumps(AMRICData, indent=2)


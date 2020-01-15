import psycopg2
import sys
import json


con = psycopg2.connect("host='localhost' dbname='avocado' user='postgres' password='postgres'")  
cur = con.cursor()
cur.execute("SELECT * FROM avocadoPrice")
columns = ('Date', 
    'AveragePrice', 
    'TotalVolume', 
    'SmallHass',
    'LargeHass',
    'XLHass',
    'Type',
    'Region')
avocadolist = []
# Create a List of Dictionaries from the Data
#Code Reference: https://www.peterbe.com/plog/from-postgres-to-json-strings
for row in cur.fetchall():
     avocadolist.append(dict(zip(columns, row)))

avocado_json = json.dumps(avocadolist)
# print (avocadolist[0]['MonthYear'])



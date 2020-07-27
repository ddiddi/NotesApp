import time 
from flask import Flask 

app = Flask(__name__)

@app.route('/time')
def current_time():
    # dict automatically gets JSONIfied by new flask
    return {'time': time.time()}


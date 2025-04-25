from flask import Flask, request
import urllib.request
from model import predict_count
import os
from flask_cors import CORS

id = 0

upload_folder = './uploads'
allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = upload_folder

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route('/api', methods=['POST'])
def api():
    global id
    file = request.data.decode('utf-8')
    id += 1
    filename = f"uploads/{id}.jpg"
    response = urllib.request.urlopen(file)
    with open(filename, 'wb') as f:
        f.write(response.file.read())
    count = predict_count(filename)
    os.remove(filename)
    return { 'count': count }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=False)

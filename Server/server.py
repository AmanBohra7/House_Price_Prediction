from flask import Flask , request , jsonify
import util
app = Flask(__name__)


@app.route('/hello')
def hello():
    response = jsonify({
        'location': 'amanbohra'
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_all_data')
def get_all_data():
    response = jsonify({
        'location': util.get_location_names(),
        'bhk' : util.get_bhk(),
        'bath' : util.get_bath(),
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])
    response = jsonify({
        'estimated_price': util.predict_price(location, total_sqft, bath, bhk)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    print('Starting Python Flask Server for Home Price Prediction....')
    util.load_saved_artifacts()
    app.run()
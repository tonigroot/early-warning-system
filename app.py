
from flask import Flask, jsonify, request # make web, change to json, get in4 from browser 
from flask_cors import CORS  # allow front-end call to this sever

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


def get_weather_data(api_key, city): #get data weather
    import requests
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    if response.status_code == 200: #success
        return response.json()
    else:
        raise Exception(f"API request failed: {response.status_code} - {response.text}")

@app.route('/get_weather')
def get_weather():
    city = request.args.get('city')
    api_key = '512dd111cd663f8b0e4fce1fece6085c'

    #call function
    try:
        weather_data = get_weather_data(api_key, city)
        return jsonify(weather_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#run server
if __name__ == '__main__':
    app.run(debug=True)
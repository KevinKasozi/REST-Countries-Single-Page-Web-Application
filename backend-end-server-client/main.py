from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/countries", methods=['GET'])
def get_countries():
    try:
        response = requests.get('https://restcountries.com/v3.1/all?fields=name,flags,languages,capital,currencies,population,region,subregion') 

        if response.status_code == 200:
            data = response.json()
            processed_data = []

            for country in data:
                country_info = {
                    'name': country['name']['common'],
                    'capital': country['capital'] if 'capital' in country else [], # Handle missing capitals
                    'flag': country['flags']['png'],  # Access flag directly
                    'currencies': list(country['currencies'].values()) if 'currencies' in country else [],
                    'population': country['population'],
                    'languages': list(country['languages'].values()) if 'languages' in country else [],
                    'region': country['region'],
                    'subregion': country['subregion']
                }
                processed_data.append(country_info)

            return jsonify(processed_data)
        else:
            return jsonify({'error': 'Failed to fetch data from the API service'}), response.status_code

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
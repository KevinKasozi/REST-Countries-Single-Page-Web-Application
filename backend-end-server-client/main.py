from flask import Flask, jsonify
import requests
from flask_cors import CORS
app = Flask(__name__)

cors=CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/countries", methods=['GET'])

def get_countries():
    # call the countries api 
    response = requests.get('https://restcountries.com/v3.1/all?fields=name,flags,languages,capital,flag,currency,population,')
    
    #check if response is successful
    if response.status_code == 200:
        data = response.json()
        processed_data = []
        #Here i will process the data so its in an easy format to ingest in the front end

        for country in data:
            country_info = {
                'name': country['name']['common'],
                'flag': country.get('flags', {}).get('png', 'No flag available'),  # Safely get flag
                'population': country['population'],
                'languages': list(country['languages'].values()) if 'languages' in country else []
            }
            processed_data.append(country_info)
        return (jsonify(processed_data))
    else:
        return jsonify({'error': 'failed to fetch data from the API service'})
                        

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)

   
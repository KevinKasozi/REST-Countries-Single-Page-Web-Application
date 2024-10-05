import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const [count, setCount] = useState(0);
  const [countires, setCounties] = useState([]); // Store data fetched countries
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // state to handle any errors 
  const [array, setArray] = useState([]);


  const fetchApi = async () => {
    console.log('Fetching API...');
    try {
      const response = await axios.get("http://192.168.1.209:8080/api/countries");
      console.log('API Response:', response);

      // per colelcting the json response and structure of data check for nested objects
      if (Array.isArray(response.data)) {
        console.log('Country Data after processing: ',response.data);
        setCounties(response.data)
      } else {
        console.log('No Country data found or unexpected response structure.');
        setError('Unexpected response structure.')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data:')
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
      <h1> Welcome To My Countries app</h1>
      {error && <p>{error}</p>}
      <ul>
        {countires.map((country, index) => (
          <li key={index}>
            <h2>{country.name}</h2>
            <img src={country.flag} alt={`${country.name} flag`} style={{ width: '50px' }} />
            <p>{country.flag}</p>            <p>Population: {country.population}</p>
            <p>Languages: {country.languages.join(', ')}</p>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default App

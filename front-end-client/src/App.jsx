import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import SearchBar from './Search-bar';

function App() {
  const [count, setCount] = useState(0);
  const [countries, setCounties] = useState([]); // Store data fetched countries
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle any errors 
  const [searchQuery, setsearchQuery] = useState('');

  const fetchApi = async () => {
    console.log('Fetching API...');
    try {
      const response = await axios.get("http://192.168.1.209:8080/api/countries");
      console.log('API Response:', response);

      // Check for nested objects
      if (Array.isArray(response.data)) {
        console.log('Country Data after processing: ', response.data);
        setCounties(response.data);
        setLoading(false);
      } else {
        console.log('No Country data found or unexpected response structure.');
        setError('Unexpected response structure.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data:');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Update searchQuery state when a user types an input into the search bar
  const updateSearchQuery = (newQuery) => {
    setsearchQuery(newQuery);
    console.log('Current search query:', newQuery); // Debugging log
  };

  // Filter countries based on partial match for name or languages
  const filteredCountries = countries.filter((country) => {
    const countryNameMatch = country.name.toLowerCase().includes(searchQuery.toLowerCase()); // Partial match for country name
    const languageMatch = country.languages.some((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase())); // Partial match for languages

    // Debugging log
    console.log('Filtering countries:', {
      country: country.name,
      countryNameMatch,
      languageMatch,
      searchQuery
    });

    return countryNameMatch || languageMatch; // Include both conditions
  });

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        <h1> Welcome To My Countries app</h1>
        <div className="wrapper">
          <h2> Search For a Country Here</h2>
          {loading && <div>Please bear with us whilst the countries load ... </div>}
          {error && <div>{`Sorry there was a problem fetching the countries - ${error}`}</div>}
          <SearchBar searchQuery={searchQuery} onChange={updateSearchQuery} />

          {/* Display filtered countries based on search */}
          <h2>Filtered Results</h2>
          <ul>
            {searchQuery ? (
              filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <li key={index}>
                    <img src={country.flag} alt={`${country.name} flag`} style={{ width: '50px' }} /> {/* Display the flag */}
                    <h3>{country.name}</h3>
                    <p>Population: {country.population}</p>
                    <p>Languages: {country.languages.join(', ')}</p>
                  </li>
                ))
              ) : (
                <li>No countries found matching your search.</li>
              )
            ) : (
              <li>Please enter a search query.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default App;

import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import SearchBar from './Search-bar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Modal from './Modal'; // Import the modal

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://192.168.1.209:8080/api/countries");
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data from API.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const updateSearchQuery = (newQuery) => setSearchQuery(newQuery);

  const filteredCountries = countries.filter((country) => {
    const countryNameMatch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const languageMatch = country.languages.some((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase()));
    return countryNameMatch || languageMatch;
  });

  const handleRowClick = (event) => {
    setSelectedCountry(event.data);
    setIsModalOpen(true);
  };

  const FavoriteButton = (props) => {
    const isFavorite = favorites.some((fav) => fav.name === props.data.name);
    return (
      <button onClick={() => toggleFavorite(props.data)}>
        {isFavorite ? '★' : '☆'}
      </button>
    );
  };

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Capital", field: "capital", sortable: true },
    {
      headerName: "Currencies",
      field: "currencies",
      valueGetter: (params) => params.data.currencies.map((curr) => curr.name).join(', '),
      sortable: true,
    },
    { headerName: "Population", field: "population", sortable: true },
    {
      headerName: "Languages",
      field: "languages",
      valueGetter: (params) => params.data.languages.join(', '),
      sortable: true,
    },
    { headerName: "Region", field: "region", sortable: true },
    { headerName: "Subregion", field: "subregion", sortable: true },

    {
      headerName: "Favorite",
      field: "favorite",
      cellRenderer: (params) => <FavoriteButton data={params.data} />, // Use cellRenderer instead of cellRendererFramework
      width: 120,
    },
  ];

  const toggleFavorite = (country) => {
    const isFavorite = favorites.some((fav) => fav.name === country.name);
    if (!isFavorite) {
      const newFavorites = [...favorites, country];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));  // Save to local storage
    } else {
      const newFavorites = favorites.filter((fav) => fav.name !== country.name);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));  // Save updated list
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  return (
    <>
      <div>
        <h1>Welcome To My Countries App</h1>

        <h2>Search For a Country Here</h2>
        <SearchBar searchQuery={searchQuery} onChange={updateSearchQuery} />

        <div className="wrapper"> {/* Wrapper starts here */}
          {loading && <div>Loading countries...</div>}
          {error && <div>{`Error: ${error}`}</div>}

          <div className="ag-theme-alpine">
            <h2>Countries List</h2>
            <AgGridReact
              rowData={filteredCountries}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
              onRowClicked={handleRowClick}
            />
          </div>

          <div className="favorites-bar">
            <h2>Your Favorite Countries</h2>
            <ul>
              {favorites.map((country) => (
                <li key={country.name}>
                  {country.name}
                  <button onClick={() => toggleFavorite(country)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div> {/* Wrapper ends here */}
      </div>

      {isModalOpen && selectedCountry && (
        <Modal
          country={selectedCountry}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;

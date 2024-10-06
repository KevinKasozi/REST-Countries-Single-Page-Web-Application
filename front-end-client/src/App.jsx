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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedCountry, setSelectedCountry] = useState(null); // Selected country state
  const [favorites, setFavorites] = useState([]); // State for favorite countries

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://192.168.1.209:8080/api/countries");
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data:');
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

  const columnDefs = [
    {
      headerName: "Flag",
      field: "flag",
      cellRendererFramework: (params) => {
        return (
          <img
            src={params.value}
            alt={`${params.data.name} flag`}
            style={{ width: '50px', height: 'auto' }}
          />
        );
      },
      width: 100,
    },
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
      cellRendererFramework: (params) => {
        const isFavorite = favorites.some((fav) => fav.name === params.data.name);
        return (
          <button 
            onClick={() => {
              if (!isFavorite) {
                setFavorites([...favorites, params.data]); // Add to favorites
              }
            }}
          >
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </button>
        );
      },
      width: 150,
    }
  ];

  return (
    <div className="app-container"> 
      <header> {/* Header as a navbar */}
        <h1> Welcome To My Countries App</h1>
      </header>

      <div className="content-wrapper"> {/* Wrapper for search, grid, and favorites */}
        <div className="left-content"> {/* Search and grid */}
          <div className="search-container">
            <h2> Search For a Country Here</h2>
            {loading && <div>Loading countries...</div>}
            {error && <div>{`Error: ${error}`}</div>}
            <SearchBar searchQuery={searchQuery} onChange={updateSearchQuery} />
          </div>

          <h2>Countries List</h2>
          <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}> 
            <AgGridReact
              rowData={filteredCountries}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
              onRowClicked={handleRowClick}
            />
          </div>
        </div>

        <aside className="favorites-sidebar"> {/* Favorites sidebar */}
          <h2>Your Favorite Countries</h2>
          <ul>
            {favorites.map((country) => (
              <li key={country.name}>
                {country.name} 
                <button onClick={() => setFavorites(favorites.filter((fav) => fav.name !== country.name))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCountry && (
        <Modal 
          country={selectedCountry} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};
export default App;

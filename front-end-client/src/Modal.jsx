import React from 'react';

const Modal = ({ country, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{country.name}</h2>
        <img src={country.flag} alt={`${country.name} flag`} style={{ width: '100px' }} />
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Population:</strong> {country.population}</p>
        <p><strong>Languages:</strong> {country.languages.join(', ')}</p>
        <p><strong>Currencies:</strong> {country.currencies.map((curr) => curr.name).join(', ')}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Subregion:</strong> {country.subregion}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

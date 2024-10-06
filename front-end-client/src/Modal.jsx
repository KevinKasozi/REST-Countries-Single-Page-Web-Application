import React from 'react';

const Modal = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{country.name} Details</h2>
        <p><strong>Capital:</strong> {country.capital.join(', ')}</p>
        <p><strong>Population:</strong> {country.population}</p>
        <p><strong>Languages:</strong> {country.languages.join(', ')}</p>
        <p><strong>Currencies:</strong> {country.currencies.map((curr) => curr.name).join(', ')}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Subregion:</strong> {country.subregion}</p>
        <img src={country.flag} alt={`${country.name} flag`} style={{ width: '100px', height: 'auto' }} />

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

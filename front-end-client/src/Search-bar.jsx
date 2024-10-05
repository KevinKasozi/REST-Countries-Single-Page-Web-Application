const SearchBar = ({searchQuery, onChange}) => {
    const BarStyle = {width: "20rem", background:"#F0F0F0", border:"none", padding:"0.5rem"};
    return (
      <input
      style={BarStyle}
      key="search-bar"
      value={searchQuery}
      placeholder={"Search Countries"}
      onChange={(e) => onChange(e.target.value)} 
      />
    );
  }
  export default SearchBar
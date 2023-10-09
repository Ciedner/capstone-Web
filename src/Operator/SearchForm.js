import React, { useState } from 'react';

const SearchForm = ({ onSearch, onSelectSlot, selectedSlot, userDetails }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleAssignSlot = () => {
    if (userDetails) {
      onSelectSlot(userDetails.carPlateNumber, selectedSlot);
    } else {
      onSelectSlot(searchInput, selectedSlot);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Car Plate Number"
        />
        <button className="searchButton" type="submit" style={{ marginTop: "10px", marginLeft: "50px" }}>
          <img
            src="search.png"
            alt="Search"
            style={{ width: '20px', marginRight: '10px' }}
          />
          Search
        </button>
      </form>
      {selectedSlot !== null && (
        <div className="buttonContainer">
          <button className="assignButton" onClick={handleAssignSlot} style={{ marginTop: "20px" }}>
            <img
              src="assign.png"
              alt="Assign"
              style={{ width: '20px', marginRight: '10px' }}
            />
            Assign Slot
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;

import React, { useState } from 'react';

const SearchForm = ({ onSearch, onSelectSlot, onExitSlot, selectedSlot, userDetails, onClose }) => {
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

  const handleExit = () => {
    onExitSlot(selectedSlot);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Car Plate Number"
          style={{borderRadius:'5px'}}
        />
        <button className="searchButton" type="submit" style={{ marginTop: "10px", marginLeft: "50px", borderRadius:'5px', backgroundColor:'blue' }}>
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
          <button className="assignButton" onClick={handleAssignSlot} style={{ marginTop: "20px", borderRadius:'5px', backgroundColor:'green' }}>
            <img
              src="assign.png"
              alt="Assign"
              style={{ width: '20px', marginRight: '10px' }}
            />
            Assign Slot
          </button>
          <button className="exitButton" onClick={handleExit} style={{ marginTop: "20px", marginLeft:"20px", borderRadius:'5px', backgroundColor:'red' }}>
            <img
              src="exit.png"
              alt="Exit"
              style={{ width: '20px', marginRight: '10px' }}
            />
            Exit Slot
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;

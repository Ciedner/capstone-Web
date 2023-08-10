import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ParkingSlot = () => {
  const maxZones = 5;
  const initialSlotSets = [{ title: 'Zone 1', slots: Array(15).fill(false) }];
  
  const initialTotalSpaces = initialSlotSets.map(zone => zone.slots.length).reduce((total, spaces) => total + spaces, 0);

  const [slotSets, setSlotSets] = useState(initialSlotSets);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [zoneAvailableSpaces, setZoneAvailableSpaces] = useState(
    initialSlotSets.map(zone => zone.slots.length)
  );

  const toggleOccupancy = (setIndex, boxIndex) => {
    const updatedSets = [...slotSets];
    const isOccupied = updatedSets[setIndex].slots[boxIndex];
    updatedSets[setIndex].slots[boxIndex] = !isOccupied;
    setSlotSets(updatedSets);
  
    const updatedAvailableSpaces = [...zoneAvailableSpaces];
    updatedAvailableSpaces[setIndex] += isOccupied ? 1 : -1;
    setZoneAvailableSpaces(updatedAvailableSpaces);
  };

  const rows = 5;
  const cols = 3;

  const handleNext = () => {
    if (currentSetIndex === slotSets.length - 1) {
      if (slotSets.length < maxZones) {
        setSlotSets(prevSets => [
          ...prevSets,
          { title: `Zone ${prevSets.length + 1}`, slots: Array(15).fill(false) },
        ]);
        setZoneAvailableSpaces(prevSpaces => [...prevSpaces, 15]); // Assuming 15 slots per zone
        setCurrentSetIndex(currentSetIndex + 1);
      }
    } else {
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Parking Lot</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `auto repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '10px',
          maxWidth: '600px',
          margin: '0 auto',
          border: '2px solid black',
          padding: '25px',
          marginTop: '50px',
        }}
      >
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          {slotSets[currentSetIndex].title}
        </div>
        {slotSets[currentSetIndex].slots.map((isOccupied, index) => (
          <div
            key={index}
            style={{
              width: '90px',
              height: '80px',
              backgroundColor: isOccupied ? 'red' : 'green',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              marginLeft: '35px',
            }}
            onClick={() => toggleOccupancy(currentSetIndex, index)}
          >
            {index + 1}
          </div>
        ))}
        <div style={{ gridColumn: '1 / -1', textAlign: 'right', fontSize: '20px', fontWeight: 'bold', marginTop: '20px', marginRight: '50px' }}>
          <Button onClick={handlePrev} style={{ marginRight: '20px', backgroundColor: 'gray' }}>Prev</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '20px' }}>
          <div style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'green', marginRight: '10px' }}></div>
          <span>Available</span>
          <div style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'red', marginLeft: '20px', marginRight: '10px' }}></div>
          <span>Occupied</span>
        </div>
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '20px' }}>
          <span> {slotSets[currentSetIndex].title} Total Parking Spaces: {initialTotalSpaces}</span>
          <br />
          <span> {slotSets[currentSetIndex].title} Available Spaces: {zoneAvailableSpaces[currentSetIndex]}</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingSlot;

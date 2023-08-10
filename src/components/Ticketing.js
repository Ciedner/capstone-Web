import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ParkingSlot = () => {
  const maxZones = 5;
  const [slotSets, setSlotSets] = useState([{ title: 'Zone 1', slots: Array(15).fill(false) }]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  const toggleOccupancy = (setIndex, boxIndex) => {
    const updatedSets = [...slotSets];
    updatedSets[setIndex].slots[boxIndex] = !updatedSets[setIndex].slots[boxIndex];
    setSlotSets(updatedSets);
  };

  const rows = 5;
  const cols = 3;

  const handleNext = () => {
    if (currentSetIndex === slotSets.length - 1) {
      if (slotSets.length < maxZones) {
        setSlotSets((prevSets) => [
          ...prevSets,
          { title: `Zone ${prevSets.length + 1}`, slots: Array(15).fill(false) },
        ]);
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
        <div style={{ gridColumn: '1 / -1', textAlign:'center', fontSize: '20px', fontWeight: 'bold', marginBottom:'20px' }}>
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
          <Button onClick={handlePrev} style={{ marginRight: '20px', backgroundColor: 'gray' }} disabled={currentSetIndex === 0}>Prev</Button>
          <Button onClick={handleNext} disabled={slotSets.length >= maxZones}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingSlot;

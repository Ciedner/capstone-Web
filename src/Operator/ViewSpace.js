import React, { useState} from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const ParkingBlock = ({ id, occupied, onClick }) => {
  const blockStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: occupied ? 'red' : 'green',
    margin: '5px',
    cursor: 'pointer',
  };

  return <div style={blockStyle} onClick={() => onClick(id)} />;
};

const styles = {
  welcomeMessage: {
    position: "absolute",
    top: "10px",
    right: "10px",
    margin: "0",
    color: "#fff",
    fontFamily: "Rockwell, sans-serif",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  icon: {
    marginRight: "5px",
  },
};

const ParkingLot = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [numSpaces, setNumSpaces] = useState(0);

  const handleBlockClick = (id) => {
    const updatedSpaces = parkingSpaces.map((space) => {
      if (space.id === id) {
        return {
          ...space,
          occupied: !space.occupied,
        };
      }
      return space;
    });

    setParkingSpaces(updatedSpaces);
  };

  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    setNumSpaces(value);

    const newParkingSpaces = [];

    for (let i = 1; i <= value; i++) {
      newParkingSpaces.push({ id: i, occupied: false });
    }

    setParkingSpaces(newParkingSpaces);
  };

  const generateParkingBlocks = () => {
    const blocksPerRow = 5;
    const rows = Math.ceil(numSpaces / blocksPerRow);
    const newParkingSpaces = [];

    for (let i = 1; i <= numSpaces; i++) {
      const occupied = i <= parkingSpaces.length ? parkingSpaces[i - 1].occupied : false;
      newParkingSpaces.push({ id: i, occupied });
    }

    const slicedBlocks = [];
    for (let i = 0; i < rows; i++) {
      slicedBlocks.push(newParkingSpaces.slice(i * blocksPerRow, (i + 1) * blocksPerRow));
    }

    return slicedBlocks.map((row, index) => (
      <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
        {row.map((space) => (
          <ParkingBlock
            key={space.id}
            id={space.id}
            occupied={space.occupied}
            onClick={handleBlockClick}
          />
        ))}
      </div>
    ));
  };

  return (
    <div style={{ backgroundColor: '#3b89ac', minHeight: "100vh"}}>
    <Container>
       < nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851" }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            SpotWise Parking Management System
          </Link>
          <p style={styles.welcomeMessage}>
            <DropdownButton 
            variant="outline-light"
                alignRight
                title={<FaUserCircle style={styles.icon} />}
                id="dropdown-menu"
              >
                <Dropdown.Item href="OperatorDashboard">Dashboard</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/">Logout</Dropdown.Item>
              </DropdownButton>
              </p>
        </div>
      </nav>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Courier New', fontSize: '20px', fontWeight: 'bold', marginTop:'75px', backgroundColor:'#bfd2d9', borderRadius:'15px'}}>
        <h2>Parking Lot</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
            <h3 style={{ marginRight: '20px', textAlign: 'center' }}>Basement</h3>
            {generateParkingBlocks().slice(0, 5)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
            <h3 style={{ marginRight: '20px', textAlign: 'center' }}>Floor 1</h3>
            {generateParkingBlocks().slice(5, 10)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
            <h3 style={{ marginRight: '20px', textAlign: 'center' }}>Floor 2</h3>
            {generateParkingBlocks().slice(10, 15)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginRight: '20px', textAlign: 'center' }}>Floor 3</h3>
            {generateParkingBlocks().slice(15, 20)}
          </div>
        </div>
        <div style={{marginTop:'20px', marginBottom:'20px'}}>
          <label>Number of parking spaces: </label>
          <input
            type="number"
            value={numSpaces}
            onChange={handleInput}
            min="0"
            max="250"
            style={{ marginTop: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
        <ParkingBlock  occupied={false} />  
        <span style={{ marginLeft: '5px' }}>Available</span>
        <ParkingBlock    occupied={true}/>
        <span style={{ marginLeft: '5px' }}>Occupied</span>
      </div>
      </div>
    </Container>
    </div>
  );
};

export default ParkingLot;
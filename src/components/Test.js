import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import {db} from "../config/firebase"
import {collection, onSnapshot} from "firebase/firestore";

const App = () => {
  const [showAccountingPage, setShowAccountingPage] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShowAccountingPage = () => {
    setShowAccountingPage(true);
    setShowCustomer(false);
    setShowSchedule(false);
  };

  const handleShowCustomer = () => {
    setShowAccountingPage(false);
    setShowCustomer(true);
    setShowSchedule(false);
  };

  const handleSchedule = () => {
    setShowAccountingPage(false);
    setShowCustomer(false);
    setShowSchedule(true);
  };

  const transactions = [
    { id: 1, date: "2023-08-13", description: "Sale", amount: 500 },
    { id: 2, date: "2023-08-14", description: "Expense", amount: -100 },
  ];

  const calculateTotalBalance = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  };
  useEffect(() => {
    const parkingLogsRef = collection(db, 'parkingLogs');

    const unsubscribe = onSnapshot(parkingLogsRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setData(newData);
      setLoading(false); 
    });

    return () => {
      unsubscribe(); 
    };
  }, []);
  useEffect(() => {
    const parkingLogsRef = collection(db, 'schedule');

    const unsubscribe = onSnapshot(parkingLogsRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setData(newData);
      setLoading(false); 
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Container className="mt-5">
        <h2 className="mb-4">Welcome to Your App</h2>
        <Row className="mb-4">
          <Col xs={6} md={3}>
            {/* First Image and Button */}
            <div>
              <img src="coins.png" alt="Image Placeholder" style={{ maxWidth: "100%", maxHeight: "150px", marginBottom:'10px' }} />
            </div>
            <Button onClick={handleShowAccountingPage}>Show Revenue</Button>
          </Col>
          <Col xs={6} md={3}>
            {/* Second Image and Button */}
            <div>
              <img src="customer.jpg" style={{ maxWidth: "100%", maxHeight: "150px", marginBottom:'10px' }} />
            </div>
            <Button onClick={handleShowCustomer}>Show Customer Details</Button>
          </Col>
          <Col xs={6} md={3}>
            {/* Second Image and Button */}
            <div>
              <img src="agent.jpg" style={{ maxWidth: "100%", maxHeight: "150px", marginBottom:'10px' }} />
            </div>
            <Button onClick={handleSchedule}>Show Agent Schedule</Button>
          </Col>
        </Row>

        {/* Display Accounting Page or Customer Details */}
        {showAccountingPage && (
          <div>
            <h2>Accounting Page</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end">
              <h4>Total Balance: {calculateTotalBalance()}</h4>
            </div>
          </div>
        )}

        {showCustomer && (
          <div>
            <h2>Customer Details</h2>
            <Table responsive style={{fontFamily:'Georgina'}}>
                    <thead>
                      <tr>
                        <th><img
                        src="num.png"
                        alt="Name"
                        style={{ width: '30px', marginRight: '10px'}}
                      />ID</th>
                        <th><img
                        src="opname.jpg"
                        alt="Name"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Customer Name</th>
                        <th><img
                        src="cars.jpg"
                        alt="cars"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Vehicle </th>
                       <th><img
                        src="plate.png"
                        alt="Plate number"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Vehicle Plate Number </th>
                        <th><img
                        src="timein.png"
                        alt="Time in"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Time in</th>
                        <th><img
                        src="timout.png"
                        alt="Time in"
                        style={{ width: '30px', marginRight: '10px', marginLeft:'20px'}}
                      />Time out</th>
                      </tr>
                    </thead>
                    <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.vehicle}</td>
                  <td>{row.plateNo}</td>
                  <td>{row.timeIn}</td>
                  <td>{row.timeOut}</td>
                </tr>
              ))}
            </tbody>
                  </Table>
          </div>
        )}
        {showSchedule && (
            <Table responsive style={{fontFamily:'Georgina'}}>
            <thead>
              <tr>
                <th><img
                src="agent.jpg"
                alt="Agent Name"
                style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
              /></th>
                <th><img
                src="timein.png"
                alt="Time in"
                style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
              /></th>
                <th><img
                src="timout.png"
                alt="Time out"
                style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
              /></th>
                <th><img
                src="dutyH.jpg"
                alt="Duty Hours"
                style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
              /></th>
                <th><img
                src="ope.jpg"
                alt="Email"
                style={{ width: '30px', marginRight: '20px', marginLeft:'60px'}}
              /></th>
                <th><img
                src="opcontact.png"
                alt="Contact Number"
                style={{ width: '30px', marginLeft:'20px'}}
              /></th>
              </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.email}</td>
                  <td>{row.name}</td>
                  <td>{row.timeIn}</td>
                  <td>{row.timeOut}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default App;

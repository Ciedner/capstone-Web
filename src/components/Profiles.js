import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from 'mdb-react-ui-kit';

export default function EditButton() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Marky Parking Management"); // Default value
  const [location, setLocation] = useState("Talamban, Cebu"); // Default value
  const [description, setDescription] = useState("A parking space that will allocate drivers a spacious parking space"); // Default value

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
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

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851" }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            SpotWise Parking Management System
          </Link>
          <p style={styles.welcomeMessage}>
            <DropdownButton
              alignRight
              variant="outline-light"
              title={<FaUserCircle style={styles.icon} />}
              id="dropdown-menu"
            >
              <Dropdown.Item href="Dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/Login">Logout</Dropdown.Item>
            </DropdownButton>
          </p>
        </div>
      </nav>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '120px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  {isEditing ? (
                    <>
                      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </>
                  ) : (
                    <>
                      <MDBTypography tag="h5">{name}</MDBTypography>
                      <MDBCardText>{location}</MDBCardText>
                    </>
                  )}
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={isEditing ? handleSaveProfile : toggleEditing}>
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </MDBBtn>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  {isEditing ? (
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <input type="text" placeholder="Company" />
                      <input type="text" placeholder="Location" />
                      <input type="text" placeholder="Description" />
                    </div>
                  ) : (
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{name}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">{location}</MDBCardText>
                      <MDBCardText className="font-italic mb-0">{description}</MDBCardText>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">More</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x2x380x244/7e83cd57260dee.jpg"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/54e6e09d3e6e1a.jpg"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://parada.ph/storage/images/spot-image/329/Screenshot_20190826_135314.jpg"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_pn4I4ZoKpjQEPxu-qmz_Db7y-jZrbNLFdAWdsG3-GUcCw-XW9SESLsm-VkkNBLy7KFI&usqp=CAU"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
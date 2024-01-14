import React, { useState, useEffect, useContext} from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
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
import UserContext from '../UserContext';
import {auth, db} from "../config/firebase"
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { storage } from "../config/firebase";
import {ref, uploadBytes, getDownloadURL, listAll, list  } from "firebase/storage"
import {v4} from "uuid"; 
import './OperatorProfile_UI.css'
import './OperatorProfileCard_UI.css'
import './editProfileButton.css'

export default function EditButton() {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.firstName || ""); 
  const [lastName, setLastName] = useState(user.lastName || ""); 
  const fullName = `${name} ${lastName}`;
  const [address, setAddress] = useState(user.address || ""); 
  const [email, setEmail] = useState(user.email || ""); 
  const [contactNumber, setContactNumber] = useState(user.phoneNumber || ""); 
  const [companyName, setCompanyName] = useState(user.managementName || ""); 
  const [companyAddress, setCompanyAddress] = useState(user.companyAddress || ""); 
  const [companyContact, setCompanyContact] = useState(user.companyContact || ""); 
  const [companyEmail, setCompanyEmail] = useState(user.companyEmail || ""); 
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const userDocRef = auth.currentUser ? doc(db, 'agents', auth.currentUser.uid) : null;

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const saveProfileImageUrl = async (url) => {
    if (userDocRef) {
      await updateDoc(userDocRef, {
        profileImageUrl: url,
      });
    }
  };


  useEffect(() => {
    if (userDocRef) {
      const fetchImageUrl = async () => {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfileImageUrl(userData.profileImageUrl);
        } else {
          console.log('No such document!');
        }
      };

      fetchImageUrl().catch(console.error);
    }
  }, [userDocRef]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload && auth.currentUser) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setProfileImageUrl(url); 
          saveProfileImageUrl(url); 
        });
      });
    }
  };
  
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        if (auth.currentUser) {
          const userId = auth.currentUser.uid;

          const doc = await db.collection("agents").doc(userId).get();

          if (doc.exists) {
            const userData = doc.data();
            
            setName(userData.name || "");
            setAddress(userData.address || "");
            setEmail(userData.email || "");
            setContactNumber(userData.contactNumber || "");
            setCompanyName(userData.managementName || "");
            setCompanyAddress(userData.companyAddress || "");
            setCompanyContact(userData.companyContact || "");
            setCompanyEmail(userData.companyEmail || "");
          } else {
            console.log("No user data found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []); 

  const updateUserData = async () => {
    try {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'agents', userId); 

        const updatedData = {
          firstName:name,
          address: address,
          email: email,
          phoneNumber:contactNumber,
        };

        await updateDoc(userDocRef, updatedData);

        console.log("User data updated/created successfully!");
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
};

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    console.log(auth.currentUser);
    setIsEditing(false);
    updateUserData();
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
 
    
    <div className='wrapper' style={{position: 'relative'}}>
      <div className='box'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
        {/* Moving Car Scene */}
        <div className="moving-car-scene">
        <div className="road">
            <div className="car">🚗</div> {/* Car Emoji */}
            <div className="car2">🚕</div> {/* Car Emoji */}
            <div className="car3">🏍️</div> {/* Car Emoji */}
            <div className="car4">🚙</div> {/* Car Emoji */}
            <div className="car5">🚐</div> {/* Car Emoji */}
        </div>
        <div className="tree tree1"></div>
        <div className="tree tree2"></div>
    </div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851" }}>
        <div className="container">
          <Link className="navbar-brand" to="/ViewSpace">
            SpotWise Parking Management System
          </Link>
          <p style={styles.welcomeMessage}>
            <DropdownButton
              alignRight
              variant="outline-light"
              title={<FaUserCircle style={styles.icon} />}
              id="dropdown-menu"
            >
               <Dropdown.Item href="ViewSpace"><img
                        src="slot1.jpeg"
                        alt="Operator Parking Slot Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Dashboard</Dropdown.Item>
              <Dropdown.Item href="OperatorDashboard"><img
                        src="dashboard.jpg"
                        alt="Operator Dashboard Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Records</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/"><img
                        src="logout.png"
                        alt="Operator Logout Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Logout</Dropdown.Item>
            </DropdownButton>
          </p>
        </div>
      </nav>
      <MDBContainer className="py-5 h-500" >
    <MDBRow className="justify-content-center align-items-center h-100" >
      <MDBCol lg="9" xl="7" >
        <MDBCard  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="profile-header" >
            <div >
                  {
                    
                  }
                 <MDBCardImage 
              src={profileImageUrl || "default_placeholder.jpg"}
              alt="Profile"
              className="profile-image"
              fluid style={{ width: '200px', zIndex: '1' }}
            />
        {isEditing && (
          <>
             <input style={{marginBottom: '30px'}}type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
                  <button className="upload-image-btn" onClick={uploadFile}>Upload Image</button>
          </>
        )}
                </div>
                <div className="user-info-section">
                  {isEditing ? (
                    < >
                      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="edit-input" />
                      <input type="text" placeholder="Location" value={address} onChange={(e) => setAddress(e.target.value)} className="edit-input" />
                      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="edit-input" />
                      <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="edit-input" />
                </>
                  ) : (
                    <>
                      <MDBTypography tag="h5" >{fullName}</MDBTypography>
                      <MDBCardText>{address}</MDBCardText>
                      <MDBCardText>{email}</MDBCardText>
                      <MDBCardText>{contactNumber}</MDBCardText>
                    </>
                  )}
                </div>
              </div>
              <div style ={{padding: '20px'}}>
              <MDBBtn style = {{width: '200px', backgroundColor: '#6ac5fe'}} className="upload-image-btn" class ="glowonhover" onClick={isEditing ? handleSaveProfile : toggleEditing}>
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
              </MDBBtn>
              </div>
              <MDBCardBody className="text-white p-4" >
              <div style ={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                {isEditing ? (
                  <div className="company-info-section">
                    <h4 className="company-info-heading">Company's Information</h4>
                    <input type="text" readOnly value={companyName} className="read-only-input" />
                    <input type="text" readOnly value={companyAddress} className="read-only-input" />
                    <input type="text" readOnly value={companyContact} className="read-only-input" />
                  </div>
                ) : (
                  <div className="agent-info-section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '50px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '600px' }}>
                    <MDBCardText className="info-text font-weight-bold" style={{color: 'black'}}>AGENT'S INFORMATION</MDBCardText>
                    <MDBCardText className="font-italic mb-2" style={{color: 'black'}}>
                      <img src="opname.jpg" alt="Operator User Logo" className="icon-image" /> {name}
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-2" style={{color: 'black'}}>
                      <img src="opa.png" alt="Operator Address Logo" className="icon-image"  /> {address}
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-2" style={{color: 'black'}}>
                      <img src="ope.jpg" alt="Operator Email Logo" className="icon-image" /> {email}
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-0" style={{color: 'black'}}>
                      <img src="opcontact.png" alt="Operator Contact Logo" className="icon-image" /> {contactNumber}
                    </MDBCardText>
                  </div>
                )}
              </div>
              <div className="company-info-display">
              <MDBCardText className="info-text" style={{ marginTop: '30px', fontSize: '18px', fontWeight: 'bold', color: 'White' }}>
                CURRENTLY WORKS AT
              </MDBCardText>
              <MDBCardText className="font-italic mb-2" style={{ display: 'flex', alignItems: 'center' , color: 'white'}}>
                <img src="esLogo.png" alt="Company Logo" className="icon-image" style={{ marginRight: '10px'}} />
                <span style={{ flex: 1 }}>{companyName}</span>
              </MDBCardText>
              <MDBCardText className="font-italic mb-2" style={{ display: 'flex', alignItems: 'center', color: 'white'}}>
                <img src="esA.png" alt="Address Logo" className="icon-image" style={{ width: '20px', marginRight: '10px' }} />
                <span>{companyAddress}</span>
              </MDBCardText>
                    
                      <MDBCardText className="font-italic mb-0" style={{color: 'white'}}> <img
                        src="opcontact.png"
                        alt="Operator Contact Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />{companyContact}</MDBCardText>
                    </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
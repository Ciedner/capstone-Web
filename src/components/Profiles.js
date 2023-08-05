import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

export default function EditButton() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  {isEditing ? (
                    <>
                      <input type="text" placeholder="Name" />
                      <input type="text" placeholder="Location" />
                    </>
                  ) : (
                    <>
                      <MDBTypography tag="h5">Andy Horwitz</MDBTypography>
                      <MDBCardText>New York</MDBCardText>
                    </>
                  )}
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={toggleEditing}>
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </MDBBtn>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
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
                      <MDBCardText className="font-italic mb-1">Marky Parking Management</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Talamban Cebu</MDBCardText>
                      <MDBCardText className="font-italic mb-0">A parking space that will allocate drivers a spacious parking space</MDBCardText>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Images</MDBCardText>
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
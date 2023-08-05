import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";

const Profiles = () => {
  return (
    <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg"
              alt="Profile Image"
              position="top"
            />
            <MDBCardBody>
              <MDBCardTitle className="text-center">John Doe</MDBCardTitle>
              <MDBCardText className="text-center">Web Developer</MDBCardText>
              <MDBCardText className="text-center">Location: New York, USA</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Profiles;

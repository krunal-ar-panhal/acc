import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import { ImagePath } from "@/Constants";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Container, FormGroup, Row } from "reactstrap";
import ProfileStatus from "./ProfileStatus";
import TabProfile from "./TabProflle";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { getProfileRequest } from "@/Redux/main/actions/profileActions";
import { updateProfileImage } from "@/Redux/main/actions/profileActions";


interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  dob: string;
  location: string;
}


const Profile = () => {
  const router = useRouter();
  const { uProfile } = useAppSelector((store) => store.rootReducer);
  // const { profile, error, loading } = uProfile;
  const [profileData, setProfileData] = useState<any[]>([]);
  const { profile, profileImage, error, loading } = useAppSelector((store) => store.rootReducer.uProfile);



  
  const dispatch = useAppDispatch();
  const [profileImagePreview, setProfileImagePreview] = useState(profileImage || `${ImagePath}/dashboard/designer.jpg`);
  
  // const dispatch = useAppDispatch();
  // const [profileImage, setProfileImage] = useState(`${ImagePath}/dashboard/designer.jpg`);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(getProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (profile != null && 'responseCode' in profile && (profile as { responseCode: number }).responseCode === 200) {
      const dataT = 'responseData' in profile ? (profile as { responseData: any[] }).responseData : [];
      setProfileData(dataT);
    }
  }, [profile]);

  // Image change handler
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result as string); // Set new image preview
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };.

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImagePreview(imageUrl); // Set local preview
        dispatch(updateProfileImage(imageUrl)); // Update image in Redux
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <CommonBreadcrumb title="Profile" parent="Settings" />
      <Container fluid>
        <Row>
          <Col xl="4">
            <Card>
              <CardBody>
                <div className="profile-details text-center">
                  <img
                    src={profileImagePreview}
                    alt=""
                    className="img-fluid img-90 rounded-circle blur-up lazyloaded"
                    onClick={handleImageClick}
                    style={{ cursor: "pointer" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <h5 className="f-w-600 f-16 mb-0">John deo</h5>
                  <span>johndeo@gmail.com</span>
                  <div className="social">
                    <FormGroup className="btn-showcase">
                      <a target="_blank" href="https://www.facebook.com/#" className="btn social-btn btn-fb d-inline-flex">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a target="_blank" href="https://www.google.com/" className="btn social-btn btn-twitter d-inline-flex">
                        <i className="fa fa-google"></i>
                      </a>
                      <a target="_blank" href="https://twitter.com/?lang=en" className="btn social-btn btn-google d-inline-flex me-0">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </FormGroup>
                  </div>
                </div>
                <hr />
                <ProfileStatus />
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="profile-card">
              <CardBody>
                <TabProfile />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;

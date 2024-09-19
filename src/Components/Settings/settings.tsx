import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import { useGlobalState } from "@/Context/GlobalStateContext";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { getSettingRequest, updateSettingRequest } from "@/Redux/main/actions/settingActions";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button, Form, CardHeader, FormFeedback } from "reactstrap";
interface ApiResponse {
  responseCode: number;
  responseData: Array<any>;
}

const Settings = () => {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((store) => store.rootReducer);
  const { settings:settingsContext, setSettings } = useGlobalState();

  const { setting, error, loading,success } = settings;
  const [formData, setFormData] = useState({
    id: null,
    websiteLogo: null as File | null,
    contactNumber: '',
    businessEmail: '',
    fbLink: '',
    twitterLink: '',
    instaLink: '',
    razorpayApiKey: '',
    razorpayApiSecret: '',
    sms99ApiKey: '',
    courierServiceApi: '',
  });

  const [errors, setErrors] = useState({
    websiteLogo: '',
    contactNumber: '',
    businessEmail: '',
    fbLink: '',
    twitterLink: '',
    instaLink: '',
    razorpayApiKey: '',
    razorpayApiSecret: '',
  });
  useEffect(() => {
    if (error && typeof error === 'object' && !Array.isArray(error)) {
       if ('responseCode' in error && (error as ApiResponse).responseCode === 400) {
            toast.error((error as { responseMessage: string }).responseMessage);
        } else {
            toast.error((error as { responseMessage: string }).responseMessage);
        }
    }else{
      error&&toast.error('Something wrong.');

    }
}, [error]);

useEffect(() => {
    if (success && 'responseCode' in success && (success as ApiResponse).responseCode === 200) {
        toast.success((success as { responseMessage: string }).responseMessage);
    }
}, [success]);

  useEffect(() => {
    dispatch(getSettingRequest());
  }, [dispatch]);

  useEffect(() => {
    if (setting != null && 'responseCode' in setting && (setting as { responseCode: number }).responseCode === 200) {
      setFormData(setting.responseData ?? []);
      setSettings(setting.responseData ?? []);

    }
  }, [setting]);

  const handleChange = (e: { target: { name: string; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when user starts typing
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, websiteLogo: "Invalid file type. Please upload a JPEG or PNG file." }));
        return;
      }

      if (file.size > maxSizeInBytes) {
        setErrors((prev) => ({ ...prev, websiteLogo: "File size exceeds 2MB. Please upload a smaller file." }));
        return;
      }

      setFormData((prev) => ({ ...prev, websiteLogo: file }));
      setErrors((prev) => ({ ...prev, websiteLogo: '' })); // Clear error on valid input
    }
  };

  const handleValidation = () => {
    const validationErrors = { ...errors };

    if (!formData.contactNumber || !/^\+?\d{10,15}$/.test(formData.contactNumber)) {
      validationErrors.contactNumber = "Please enter a valid contact number.";
    }

    if (!formData.businessEmail || !/^\S+@\S+\.\S+$/.test(formData.businessEmail)) {
      validationErrors.businessEmail = "Please enter a valid email address.";
    }

    if (formData.fbLink && !/^https?:\/\/(www\.)?facebook\.com\/.+/.test(formData.fbLink)) {
      validationErrors.fbLink = "Please enter a valid Facebook URL.";
    }

    if (formData.twitterLink && !/^https?:\/\/(www\.)?twitter\.com\/.+/.test(formData.twitterLink)) {
      validationErrors.twitterLink = "Please enter a valid Twitter URL.";
    }

    if (formData.instaLink && !/^https?:\/\/(www\.)?instagram\.com\/.+/.test(formData.instaLink)) {
      validationErrors.instaLink = "Please enter a valid Instagram URL.";
    }

    if (!formData.razorpayApiKey) {
      validationErrors.razorpayApiKey = "Razorpay API Key is required.";
    }

    if (!formData.razorpayApiSecret) {
      validationErrors.razorpayApiSecret = "Razorpay API Secret is required.";
    }

    setErrors(validationErrors);

    return Object.values(validationErrors).every(error => error === '');
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    if (!handleValidation()) {
      return;
    }
  
    const formDataToSubmit = new FormData();
  
    // Only append fields that are not null
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (value !== null) {
        if (key === 'websiteLogo' && value instanceof File) {
          formDataToSubmit.append(key, value, value.name); // Append file with its filename
        }else  if (key === 'websiteLogo' && typeof value === "string") {
          formDataToSubmit.append(key, ''); // Append string values
         } else {
          formDataToSubmit.append(key, value as string); // Append string values
        }
      }
    });
  
    dispatch(updateSettingRequest(formDataToSubmit));
    // dispatch(getSettingRequest());
  };
  

  return (
    <Fragment>
      <CommonBreadcrumb title="General Setting" parent="Settings" />
      <Container fluid>
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <h5>Update</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                 <Row>
                  <Col sm="6">
                  <FormGroup>
                    <Label for="websiteLogo">Website Logo</Label>
                    <Input
                      type="file"
                      id="websiteLogo"
                      name="websiteLogo"
                      onChange={handleFileChange}
                      accept="image/jpeg, image/png"
                      invalid={!!errors.websiteLogo}
                    />
                    {errors.websiteLogo && <FormFeedback>{errors.websiteLogo}</FormFeedback>}

                  </FormGroup>
                  </Col>
                  <Col sm="6">
  {formData.websiteLogo && (
    typeof formData.websiteLogo === "string" ? (
      // Display image from URL (e.g., existing image returned from the API)
      <img src={formData.websiteLogo} alt="Website Logo" height={100} />
    ) : formData.websiteLogo instanceof File ? (
      // Display image from file upload (newly uploaded image)
      <img src={URL.createObjectURL(formData.websiteLogo)} alt="Website Logo Preview" height={100} />
    ) : null
  )}
</Col>

                 </Row>
                  <FormGroup>
                    <Label for="contactNumber">Contact Number</Label>
                    <Input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      invalid={!!errors.contactNumber}
                      required
                    />
                    {errors.contactNumber && <FormFeedback>{errors.contactNumber}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="businessEmail">Business Email</Label>
                    <Input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      invalid={!!errors.businessEmail}
                      required
                    />
                    {errors.businessEmail && <FormFeedback>{errors.businessEmail}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="fbLink">Facebook Link</Label>
                    <Input
                      type="url"
                      id="fbLink"
                      name="fbLink"
                      value={formData.fbLink}
                      onChange={handleChange}
                      invalid={!!errors.fbLink}
                    />
                    {errors.fbLink && <FormFeedback>{errors.fbLink}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="twitterLink">Twitter Link</Label>
                    <Input
                      type="text"
                      id="twitterLink"
                      name="twitterLink"
                      value={formData.twitterLink}
                      onChange={handleChange}
                      invalid={!!errors.twitterLink}
                    />
                    {errors.twitterLink && <FormFeedback>{errors.twitterLink}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="instaLink">Instagram Link</Label>
                    <Input
                      type="text"
                      id="instaLink"
                      name="instaLink"
                      value={formData.instaLink}
                      onChange={handleChange}
                      invalid={!!errors.instaLink}
                    />
                    {errors.instaLink && <FormFeedback>{errors.instaLink}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="razorpayApiKey">Razorpay API Key</Label>
                    <Input
                      type="text"
                      id="razorpayApiKey"
                      name="razorpayApiKey"
                      value={formData.razorpayApiKey}
                      onChange={handleChange}
                      invalid={!!errors.razorpayApiKey}
                      required
                    />
                    {errors.razorpayApiKey && <FormFeedback>{errors.razorpayApiKey}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="razorpayApiSecret">Razorpay API Secret</Label>
                    <Input
                      type="text"
                      id="razorpayApiSecret"
                      name="razorpayApiSecret"
                      value={formData.razorpayApiSecret}
                      onChange={handleChange}
                      invalid={!!errors.razorpayApiSecret}
                      required
                    />
                    {errors.razorpayApiSecret && <FormFeedback>{errors.razorpayApiSecret}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="sms99ApiKey">SMS99 API Key</Label>
                    <Input
                      type="text"
                      id="sms99ApiKey"
                      name="sms99ApiKey"
                      value={formData.sms99ApiKey}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="courierServiceApi">Courier Service API</Label>
                    <Input
                      type="text"
                      id="courierServiceApi"
                      name="courierServiceApi"
                      value={formData.courierServiceApi}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button type="submit" color="primary" disabled={loading}>
                    {formData.id ? 'Update Settings' : 'Add Settings'}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Settings;

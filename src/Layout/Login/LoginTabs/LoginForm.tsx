import { useAppSelector } from "@/Redux/Hooks";
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import SocialMediaIcons from "./SocialMediaIcons";
import { fetchDataRequest } from "../../../Redux/main/actions/loginConfig";
 import {  useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/Redux/Store";
import { setSessionData } from "@/Helper";
import { sessionName, tokenName } from "@/Constants";

const LoginForm = () => {
  const dispatch = useDispatch();
  // const loginData = useSelector(({ rootReducer }: RootState) => rootReducer.loginData);

  const { i18LangStatus } = useAppSelector((store) => store.LangReducer);

  const { auth } = useAppSelector((store) => store.rootReducer);
  const {isAuthenticated,data,error,loading}  = auth;
  const [showPassWord, setShowPassWord] = useState(false);
  // const [isLoading, setIsLoading] = useState(loading??false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const handleUserValue = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name)
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  useEffect(()=>{
// console.log(loginData)

if(data&&data.responseCode==200&&isAuthenticated){
  // const successData=data;
  // Cookies.set("token", successData.responseData.token??'');
  const token = data.responseData.token;
  console.log("Token:", token);
  setSessionData(tokenName,data.responseData.token);
  setSessionData(sessionName, JSON.stringify(data.responseData));

  toast.success(data.responseMessage??'');
    router.push(`${process.env.PUBLIC_URL}/${i18LangStatus}/dashboard`);
    // formValues.email='';
    // formValues.password='';
}else if(error!=null){
    toast.error(error.responseMessage??'Please Enter Valid Email Or Password');

}
console.log(data);


  },[data,error,loading,isAuthenticated]);
  const formSubmitHandle = (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = formValues;

    if(email==''||password==''){
      toast.error("Please Enter Valid Email Or Password");
      return false;
    }
if(loading==false){
  dispatch(fetchDataRequest({email:email,password:password}));
  // console.log(error.responseMessage);
  // console.log({email:email,password:password});  
}
  };
  return (
    <Form className="form-horizontal auth-form" onSubmit={formSubmitHandle} method="post">
      <FormGroup>
        <Input required onChange={handleUserValue} type="email" name="email" value={formValues.email} placeholder="Username" id="exampleInputEmail1" />
      </FormGroup>
      <FormGroup>
        <InputGroup >
          <Input required onChange={handleUserValue}  name="password" type={showPassWord ? "text" : "password"} value={formValues.password} placeholder="Password" />
          <InputGroupText onClick={() => setShowPassWord(!showPassWord)}>{showPassWord ? <Eye /> : <EyeOff />}</InputGroupText>
        </InputGroup>
        {/* <Input required onChange={handleUserValue} type="password" value={formValues.password} placeholder="Password" /> */}
      </FormGroup>
      <div className="form-terms">
        <div className="custom-control custom-checkbox me-sm-2">
          <Label className="d-block">
            <Input className="checkbox_animated" id="chk-ani2" type="checkbox" />
            Reminder Me
            {/* <span className="pull-right">
              <Button color="transparent" className="forgot-pass p-0">
                lost your password
              </Button>
            </span> */}
          </Label>
        </div>
      </div>
      <div className="form-button">
        <Button color="primary" type="submit" disabled={loading}>
          Login
        </Button>
      </div>
      {/* <div className="form-footer">
        <span>Or Login up with social platforms</span>
        <SocialMediaIcons />
      </div> */}
    </Form>
  );
};

export default LoginForm;

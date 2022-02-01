
import React, {useState} from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";
import { login,loginwithFacebook } from "../../network/ApiAxios";
import { useDispatch } from "react-redux";
import { sessionActions } from "store"
import FacebookLogin from 'react-facebook-login';

const Login = props => {
    const dispatch=useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const tryLogin = async () => {
        const response = await login(email, password);
        const {data} = response;
        if (data.success) {
            setError("");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch(sessionActions.updateSession({success:true}))
            dispatch(sessionActions.updateUserRole(data.user.role))
            props.history.push("/admin/dashboard");
        } else {
            setPassword("");
            setError(data.msg);
        }
    }
    const Facebooklogin=async (res)=>{
     const {email}=res;
     const response = await loginwithFacebook(email)
     const {data}=response
     if(data.success){
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(sessionActions.updateSession({success:true}))
        dispatch(sessionActions.updateUserRole(data.user.role))
        props.history.push("/admin/dashboard");
     }
     else{
        setPassword("");
        setError(data.msg);
     }
    }

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-4">
                            <small>Sign in with</small>
                        </div>
                        <div className="text-center" style={{paddingLeft:15}}>
                            <Button
                                className="btn-neutral btn-icon mr-4"
                                color="default"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                    <span className="btn-inner--icon">
                        <img
                            alt="..."
                            src={require("assets/img/icons/common/facebook.png").default}
                        />
                    </span>
                                <span className="btn-inner--text">Facebook</span>
                             <FacebookLogin
                               fields="email"
                               textButton="face"
                               cssClass="mybutton"
                               size="small"
                               appId="362042259093994"
                               autoLoad={false}
                               callback={Facebooklogin}
                                  />
                            </Button>
                            
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Email" type="email" autoComplete="email" value={email}
                                           onChange={e => setEmail(e.target.value)}/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Password" type="password" autoComplete="password" value={password}
                                           onChange={e => setPassword(e.target.value)}/>
                                </InputGroup>
                            </FormGroup>
                            {/*<div className="custom-control custom-control-alternative custom-checkbox">*/}
                            {/*    <input*/}
                            {/*        className="custom-control-input"*/}
                            {/*        id=" customCheckLogin"*/}
                            {/*        type="checkbox"*/}
                            {/*    />*/}
                            {/*    <label*/}
                            {/*        className="custom-control-label"*/}
                            {/*        htmlFor=" customCheckLogin"*/}
                            {/*    >*/}
                            {/*        <span className="text-muted">Remember me</span>*/}
                            {/*    </label>*/}
                            {/*</div>*/}
                            {error ?
                                <div className="text-muted font-italic">
                                    <small>
                                        error:{" "}
                                        <span className="text-red font-weight-700">{error}</span>
                                    </small>
                                </div> : null }
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button" onClick={tryLogin}>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="text-light"
                            onClick={() => props.history.push('/auth/reset-password')}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <a
                            className="text-light"
                            onClick={() => props.history.push('/auth/register')}
                        >
                            <small>Create new account</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default Login;

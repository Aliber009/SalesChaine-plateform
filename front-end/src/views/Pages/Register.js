
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
import Toast from 'react-bootstrap/Toast'
import {register} from "../../network/ApiAxios";
import config from "../../config";
import Snack from "views/Dialog/FeedSnack";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [snackinfo,setsnackInfo]=useState({open:false})
    const [toastMessage, setToastMessage] = useState("Email sent! Check it to Comfirm ^ ^.");
    const [userID, setUserID] = useState(null);

    const registerUser = async () => {
        if (!(name && email && password && confirmPassword && checkbox)) {
            setError("Make sure to fill all the inputs and agree to the privacy policy");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const response = await register(name, email, password);
        const {data} = response;
        if (!data.success) {
            setError(data.msg);
            return;
        }
        if (config.DEMO) {
            setToastMessage("This is a demo, so we will not send you an email. Instead, click on this link to verify your account:")
            setUserID(data.userID);
        }
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCheckbox(false);
        //setShowToast(true);
        setsnackInfo({open:true,severity:"success",message:"email sent to your email"})
    };

    return (
        <>
            <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                    position: 'fixed',
                    minHeight: '100px',
                    width: "35%",
                    right: 10,
                    bottom: 80,
                    zIndex: 50
                }}
            >
                <Snack opensnack={snackinfo.open} setopensnack={setsnackInfo} severity={snackinfo.severity} message={snackinfo.message} />
            </div>
            <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-4">
                            <small>Sign up with</small>
                        </div>
                        <div className="text-center">
                            <Button
                                className="btn-neutral btn-icon mr-4"
                                color="default"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                    <span className="btn-inner--icon">
                        <img
                            alt="..."
                            src={require("assets/img/icons/common/github.svg").default}
                        />
                    </span>
                                <span className="btn-inner--text">Github</span>
                            </Button>
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                  <span className="btn-inner--icon">
                    <img
                        alt="..."
                        src={require("assets/img/icons/common/google.svg").default}
                    />
                  </span>
                                <span className="btn-inner--text">Google</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Or sign up with credentials</small>
                        </div>
                        <Form role="form">
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Name" type="text" value={name}
                                           onChange={e => setName(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Email" type="email" autoComplete="new-email" value={email}
                                           onChange={e => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Password" type="password" autoComplete="new-password" value={password}
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Confirm Password" type="password" autoComplete="new-password" value={confirmPassword}
                                           onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            {error ?
                            <div className="text-muted font-italic">
                                <small>
                                    error:{" "}
                                    <span className="text-red font-weight-700">{error}</span>
                                </small>
                            </div> : null }
                            <Row className="my-4">
                                <Col xs="12">
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                            className="custom-control-input"
                                            id="customCheckRegister"
                                            type="checkbox"
                                            checked={checkbox}
                                            onChange={() => setCheckbox(!checkbox)}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheckRegister"
                                        >
                        <span className="text-muted">
                          I agree with the{" "}
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <Button onClick={registerUser} className="mt-4" color="primary" type="button">
                                    Create account
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Register;

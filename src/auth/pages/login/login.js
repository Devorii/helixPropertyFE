import Logo from "../../../artifacts/logo.png";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

const LoginPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [popUpErrorState, setPopUpErrorState] = useState(false)
    const [errorDetails, setErrorDetails] = useState("")
    const navigateTo = useNavigate();


    const signup = () => {
        navigateTo("/sign-up");
    };

    const signIn = async (values) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HELIX_API}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(values),
            });


            if (!response.ok) {
                const errorDetail = await response.json();
                setErrorDetails(errorDetail.detail)
                setPopUpErrorState(true)
                throw new Error('Failed to sign in'); // Throw an error to handle in the catch block
            }

            
            // If response is okay (status code 200), proceed with parsing response
            setPopUpErrorState(false)
            const data = await response.json();
            localStorage.setItem('token', data['token'])
            localStorage.setItem('pid', data['property_id'])
            localStorage.setItem('fullname', data['name'])
            localStorage.setItem('userInit', data['user_initials'])
            navigateTo('/home')

        } catch (error) {
            console.error('Error signing in:', error.message);
            // Add error handling as needed
        }
    }





    // Function to handle sign in as owner
    const signInAsOwner = (values) => {
        localStorage.setItem('userStatus', 'OW1')
        values["account"] = process.env.REACT_APP_OWNER_ACC
        signIn(values)

    };

    // Function to handle sign in as tenant
    const signInAsTenant = (values) => {
        localStorage.setItem('userStatus', 'TE1')
        values["account"] = process.env.REACT_APP_TENANT_ACC
        signIn(values)

    };






    return (
        <div className="gcw">
            <div id="info-container">
                <div id="logo-wrapper">
                    <img className="logo" src={Logo} alt="logo" />
                </div>
                {showLogin ? (
                    <>
                        <p>Welcome! Let's get you signed in.</p>
                        <div className="form-wrapper">
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = "Email is required";
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                        errors.email = "Invalid email address";
                                    }
                                    if (!values.password) {
                                        errors.password = "Password is required";
                                    }
                                    return errors;
                                }}

                            >
                                {({ values }) => (
                                    <Form>
                                        <div className="field-wrapper">
                                            <label htmlFor="email">Email</label>
                                            <Field type="email" name="email" />
                                            <ErrorMessage className='inputError' name="email" component="div" />
                                        </div>
                                        <div className="field-wrapper">
                                            <label htmlFor="password">Password</label>
                                            <Field type="password" name="password" />
                                            <ErrorMessage  className='inputError' name="password" component="div" />
                                        </div>
                                        <div className="form-buttons">
                                            <button type="button" onClick={() => signInAsOwner(values)}>
                                                Sign in as Owner
                                            </button>
                                            <button type="button" onClick={() => signInAsTenant(values)}>
                                                Sign in as Tenant
                                            </button>
                                        </div>
                                        <div className="form-links">
                                            <a href="#">Terms & Conditions</a>
                                            <a onClick={signup}>Create an Account</a>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        {
                            popUpErrorState && (
                                <div id="alertWrapper" className="alertModalWrapper show"> {/* Add show class directly */}
                                    <Alert severity="error" id="alertModal">
                                        <AlertTitle>Error</AlertTitle>
                                        {errorDetails}
                                    </Alert>
                                </div>
                            )
                        }



                    </>
                ) : (
                    <p style={{ marginTop: "40px" }}>Please verify your account.</p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;

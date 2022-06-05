import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import logo from '../../images/ZOOr LOG FINAL.png'
import ReCAPTCHA from "react-google-recaptcha"

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    function onCaptchaChange(value) {
        console.log("Captcha value", value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <div className="top-section-signup">

            </div>
            <div className="signup-page-container">
                <div className="content-container">

                    <img className="signup-logo" src={ logo }></img>
                    <p className="sign-up-header">Sign up for ZOOr</p>
                    <ReCAPTCHA sitekey="6Lc350QgAAAAAHOQ6-O2tDuezdnqv0cC_x-qzrNQ"
                        onChange={ onCaptchaChange } />


                    <form onSubmit={ handleSubmit }>
                        <ul>
                            { errors.map((error, idx) => <li key={ idx }>{ error }</li>) }
                        </ul>
                        <label>
                            Email
                            <input
                                type="text"
                                value={ email }
                                onChange={ (e) => setEmail(e.target.value) }
                                required
                            />
                        </label>
                        <label>
                            Username
                            <input
                                type="text"
                                value={ username }
                                onChange={ (e) => setUsername(e.target.value) }
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                value={ password }
                                onChange={ (e) => setPassword(e.target.value) }
                                required
                            />
                        </label>
                        <label>
                            Confirm Password
                            <input
                                type="password"
                                value={ confirmPassword }
                                onChange={ (e) => setConfirmPassword(e.target.value) }
                                required
                            />
                        </label>
                        <button type="submit">Sign Up</button>
                    </form>
                    <p className="footer-text">By signing up, you agree with ZOOr's Terms of Services and Privacy Policy.</p>
                    <div className="log-in-redirect-text">
                        <p> Already a ZOOr member? <a className="in-text-link">Log in here</a> </p>

                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupFormPage;

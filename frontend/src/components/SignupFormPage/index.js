import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import logo from '../../images/ZOOr.png'


function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;



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

                    <p className="sign-up-header"></p>
                    <img className="signup-logo" src={ logo }></img>





                    <form onSubmit={ handleSubmit }>
                        <ul>
                            { errors.map((error, idx) => <li className="errors" key={ idx }>{ error }</li>) }
                        </ul>
                        <div className="signup-input-container">


                            <label>

                                <input className="signup-inputFields"
                                    type="text"
                                    placeholder="Email"
                                    value={ email }
                                    onChange={ (e) => setEmail(e.target.value) }
                                    required
                                />
                            </label>
                            <label>

                                <input className="signup-inputFields"
                                    type="text"
                                    placeholder="Username"
                                    value={ username }
                                    onChange={ (e) => setUsername(e.target.value) }
                                    required
                                />
                            </label>
                            <label>

                                <input className="signup-inputFields"
                                    type="password"
                                    placeholder="Password"
                                    value={ password }
                                    onChange={ (e) => setPassword(e.target.value) }
                                    required
                                />
                            </label>
                            <label>

                                <input className="signup-inputFields"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={ confirmPassword }
                                    onChange={ (e) => setConfirmPassword(e.target.value) }
                                    required
                                />
                            </label>
                            <button className="signup-submit-btn" type="submit">Sign Up</button>
                        </div>
                    </form>
                    <div className="footer-signup-container">
                        <p className="footer-text">By signing up, you agree with ZOOr's Terms of Services and Privacy Policy.</p>
                        <div className="log-in-redirect-text">



                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupFormPage;

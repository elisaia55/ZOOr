import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import logo from '../../images/SIGNUPBACKGROUND.jpg'
import { useHistory, Redirect } from 'react-router-dom';


function LoginForm() {
    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    if (sessionUser) return <Redirect to="/" />;

    const handleDemoSubmit = (e) => {

        const credential = 'Demo-lition'
        const password = 'password'

        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/'))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <form onSubmit={ handleSubmit } id="modal-form">
            <ul>
                { errors.map((error, idx) => (
                    <li className="errors" key={ idx }>{ error }</li>
                )) }
            </ul>
            <div id="login-container">

                <label>

                    <input className="login-input-fields"
                        type="text"
                        placeholder="Email Address"
                        value={ credential }
                        onChange={ (e) => setCredential(e.target.value) }
                        required
                    />
                </label>
                <label>

                    <input className="login-input-fields3"
                        type="password"
                        placeholder="Password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                    />
                </label>
                <div className="login-btns-container">

                    <button type='submit' className="login-form-btns" id="login-form-btns">Log In</button>
                    <button type='submit' className="login-form-btns" onClick={ (e) => handleDemoSubmit(e) } id="demo-btn">Demo User</button>
                </div>
                <div className="login-footer-text">

                    <p>Not a ZOOr member? <a className="signup-redirect" href="/signup">Sign up here</a></p>

                </div>
            </div>
        </form>


    );
}

export default LoginForm;

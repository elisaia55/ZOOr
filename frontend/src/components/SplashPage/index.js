import React, { useEffect, useState } from "react";
import SignupFormPage from "../SignupFormPage";
import './SplashPage.css'
import * as sessionActions from "../../store/session";

import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";

const SplashPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [signUp, setSignUp] = useState(false);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();


    if (sessionUser) return <Redirect to='/photos' />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/listings'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);

            })
    }
    const handleDemoButton = (e) => {
        const credential = 'Demo-lition'
        const password = 'password'

        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/listings'))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }
    return (
        <div className="top-div">
            <div className="top-section">
                <div className="content-container">
                    <h1 className="splash-title">Find your inspiration.
                    </h1>
                    <h2 className="splash-body-content"> Join the ZOOr community, home to tens of billions of photos and 2 million groups.</h2>
                    <button className="splash-signup-btn">
                        <Link className="btn-txt" to='/signup'>Start for free</Link>
                    </button>

                </div>
            </div>
        </div>
    )


}




export default SplashPage

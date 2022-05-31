import React, { useEffect, useState } from "react";
import SignupFormPage from "../SignupFormPage";
import './SplashPage.css'
import * as sessionActions from "../../store/session";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import BackgroundSlider from "react-background-slider";
import img1 from '../../images/babygorilla2.jpg'
import img2 from '../../images/gorilla1.jpg'
import img3 from '../../images/GorillaFix.jpg'



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
        <div className="image-container">

            <div className="slider">
                <figure>
                    <div className="slide">
                        <p className="text-name">Image One</p>
                        <img className="slider-img" src={ img1 } alt="image"></img>
                    </div>
                    <div className="slide">
                        <p className="text-name">Image One</p>
                        <img className="slider-img" src={ img2 } alt="image"></img>
                    </div>
                    <div className="slide">
                        <p className="text-name">Image One</p>
                        <img className="slider-img" src={ img3 } alt="image"></img>
                    </div>
                </figure>

                <div className="top-div">
                    <div className="top-section">
                        <div className="content-container">
                            <h1 className="splash-title">Find your inspiration.
                            </h1>
                            <h2 className="splash-body-content"> Joiin the ZOOr community, home to tens of billions of photos and 2 million groups.</h2>
                            <button className="splash-signup-btn">
                                <Link className="btn-txt" to='/signup'>Start for free</Link>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}




export default SplashPage

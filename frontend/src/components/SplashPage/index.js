import React, { useEffect, useState } from "react";
import SignupFormPage from "../SignupFormPage";
import './SplashPage.css'
import * as sessionActions from "../../store/session";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import BackgroundSlider from "react-background-slider";
import img1 from '../../images/Gorilla1.jpg'
import img2 from '../../images/Eagle.jpg'
import img3 from '../../images/Lion.jpg'
import img4 from '../../images/Panda.jpg'
import img5 from '../../images/Pigs.jpg'
import img6 from '../../images/Tiger.jpg'
import img7 from '../../images/Turtle.jpg'

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
                        <img className="slider-img" src={ img1 } alt="image1"></img>
                    </div>
                    <div className="slide">
                        <p className="text-name">Image Two</p>
                        <img className="slider-img" src={ img2 } alt="image2"></img>
                    </div>
                    <div className="slide">
                        <p className="text-name">Image Three</p>
                        <img className="slider-img" src={ img3 } alt="image3"></img>
                    </div>
                    <div className="slide">
                        <p className="text-name">Image Four</p>
                        <img className="slider-img" src={ img4 } alt="image4"></img>
                    </div>
                    <div className="slide">
                        <p className="text-name">Image Five</p>
                        <img className="slider-img" src={ img5 } alt="image5"></img>
                    </div>
                    <div className="slide">
                        <p className="text-name">Image Six</p>
                        <img className="slider-img" src={ img6 } alt="image6"></img>
                    </div>
                    <div className="slide">
                        <p className="text-name">Image Seven</p>
                        <img className="slider-img" src={ img7 } alt="image7"></img>
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

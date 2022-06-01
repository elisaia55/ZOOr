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
import video from '../../images/Wildlife Animals 4K 60FPS (ULTRA HD).mp4'
import logo from '../../images/Zooer.jpg'

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
        <div className="splash-nav-container">
            <div>
                <div className="video-container">
                    <video autoPlay loop muted id="video-bg">
                        <source
                            src={ video }
                            type="video/mp4">

                        </source>
                    </video>
                    <div id="splash-text-container">
                        <h2 id="splash-title">Find your inspiration.</h2>
                        <p className="splash-p-tag">Join the ZOOr community, home to tens of billions of photos and 2 million groups.</p>
                        { (!sessionUser) ? <a href="/signup">
                            <button className="splash-mainBtn"> Start for Free</button>
                        </a> : <a href="/photos">
                            <button>Explore</button>

                        </a>
                        }
                    </div>
                </div>

            </div>

        </div>
    )


}




export default SplashPage

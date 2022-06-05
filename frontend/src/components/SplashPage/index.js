import React, { useEffect, useState } from "react";
import './SplashPage.css'
import * as sessionActions from "../../store/session";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import video from '../../images/TRIMMED BACKGROUND FINAL.mp4'


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
                    <video className="video" autoPlay loop muted id="video-bg">
                        <source
                            src={ video }
                            type="video/mp4">

                        </source>
                    </video>
                    <div id="splash-text-container">
                        <div className="splash-text">

                            <h2 id="splash-title">Find your inspiration.</h2>
                            <div className="text-description-container">
                                <p className="splash-p-tag">Join the ZOOr community, home to tens of billions of photos and 2 million groups.</p>

                            </div>
                            { (!sessionUser) ? <a href="/signup">
                                <button className="splash-mainBtn"> Start for Free </button>
                            </a> : <a href="/photos">


                            </a>
                            }
                        </div>
                    </div>

                </div>
            </div>

            <a href="https://www.youtube.com/watch?v=Pe0Ci3z5xTw&t=6s" className="owner">Wildlife Animals by 8k InfoNature</a>
        </div>
    )


}




export default SplashPage

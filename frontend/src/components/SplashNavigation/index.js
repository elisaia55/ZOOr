import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import logo from '../../images/Zooer-removebg.png'
import { Modal } from '../../context/Modal'
import LoginForm from '../LoginFormModal/LoginForm';

function SplashNavigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    let sessionLinks;
    if (sessionUser) {

    } else {
        sessionLinks = (
            <div>
                <LoginFormModal />
                <NavLink to="/signup" id='signup-btn' className="navBtn">
                    <button className='signup-button'>Sign Up</button>
                </NavLink>
            </div>
        );
    }

    return (
        <div className='entire-container'>

            <div id="nav-header">
                <ul className='nav-container'>
                    <li id='auth-btns'>
                        <NavLink id='nav-home-button' exact to="/">
                            <button id='home-btn'><img id='home-image-btn' src={ logo } alt="logo"></img></button>
                        </NavLink>
                        { isLoaded && sessionLinks }
                        <NavLink to='/signup' id='splash-nav-signup-btn'>
                            Sign Up
                        </NavLink>
                        <div className='splash-nav-modal' >
                            <button id="splash-nav-login-btn" className='btn' onClick={ () => setShowModal(true) }>Log In</button>
                            { showModal && (
                                <Modal onClose={ () => setShowModal(false) }>
                                    <LoginForm />
                                </Modal>
                            ) }
                        </div>
                    </li>

                </ul >


            </div>
        </div>
    );
}

export default SplashNavigation;

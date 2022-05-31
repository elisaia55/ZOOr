import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from '../../images/Zooer-removebg.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={ sessionUser } />
        );
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
                        <NavLink to='/photos' id='photo-btn'>
                            Photos
                        </NavLink>
                        <NavLink to='/photo/new' id='newPhoto-btn'>
                            upload btn
                        </NavLink>
                    </li>

                </ul >


            </div>
        </div>
    );
}

export default Navigation;

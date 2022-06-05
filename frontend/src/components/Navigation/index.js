import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from '../../images/ZOOr LOG FINAL.png'
import Search from '../SearchBar/SearchBar';
import { getPhotos } from '../../store/photos'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const photos = useSelector(state => {
        return Object.values(state.photos)
    })

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])




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
                <div className='nav-container'>
                    <div id='auth-btns-nav'>
                        <NavLink id='nav-home-button' exact to="/">

                            <button id='home-btn'><img id='home-image-btn' src={ logo } alt="logo"></img></button>
                        </NavLink>
                        <NavLink to='/photos' id='photo-btn'>
                            Explore
                        </NavLink>
                        <Search />
                        <NavLink to='/photo/new' id='newPhoto-btn'>
                            <i class="fa-solid fa-cloud-arrow-up"></i>
                        </NavLink>
                        { isLoaded && sessionLinks }
                    </div>

                </div >


            </div>
        </div>
    );
}

export default Navigation;

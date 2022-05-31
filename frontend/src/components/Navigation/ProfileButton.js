import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const changeMenu = () => {
        setShowMenu(!showMenu)
    }


    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        <Redirect to='/' />


    };

    return (
        <>
            <button onClick={ changeMenu }>
                <i className="fas fa-user-circle" />
            </button>
            { showMenu && (
                <ul className="profile-dropdown">
                    <li>{ user.username }</li>
                    <li>{ user.email }</li>
                    <ul>
                        <button>PROFILE BUTTON</button>
                    </ul>
                    <ul>
                        <button onClick={ logout }>Log Out</button>
                    </ul>
                </ul>
            ) }
        </>
    );
}

export default ProfileButton;

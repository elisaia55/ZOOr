import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()

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
        history.push('/')


    };

    return (
        <>
            <button className="profile-btns" onClick={ logout }>
                Sign Out
            </button>
            { showMenu && (

                <button onClick={ logout }>Log Out</button>

            ) }
        </>
    );
}

export default ProfileButton;

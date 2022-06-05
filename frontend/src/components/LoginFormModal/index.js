import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'
import logo from '../../images/ZOOr.png'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <a id='login-splash-btn' className='btn' onClick={ () => setShowModal(true) }>Log In</a>
            { showModal && (
                <Modal onClose={ () => setShowModal(false) }>
                    <img className='header-login-logo' src={ logo }></img>
                    <LoginForm />
                </Modal>
            ) }
        </>
    );
}

export default LoginFormModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='login-btn' className='btn' onClick={ () => setShowModal(true) }>Log In</button>
            { showModal && (
                <Modal onClose={ () => setShowModal(false) }>
                    <LoginForm />
                </Modal>
            ) }
        </>
    );
}

export default LoginFormModal;

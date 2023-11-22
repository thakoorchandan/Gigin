import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        setLogin({
            ...login,
            email: e.target.value,
        });
    };

    const handlePassword = (e) => {
        setLogin({
            ...login,
            password: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (login.email === '' || login.password === '') {
            setError(true);
            return;
        }

        setError(false);

        try {
            const ans = await fetch('https://dev123.gigin.ai/abc/index.php/Api_controller/login_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: login.email,
                    password: login.password,
                }),
            });

            if (!ans.ok) {
                throw new Error(`HTTP error! Status: ${ans.status}`);
            }

            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            setError(true);
        }
    };

    return (
        <div className='loginForm'>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleEmail} placeholder='Enter Your Email' value={login.email} />
                <input type='password' onChange={handlePassword} placeholder='Enter Your Password' value={login.password} />
                {error ? <div>Please fill in all fields correctly</div> : null}
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;

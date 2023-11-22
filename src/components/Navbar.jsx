import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bcrypt from "bcryptjs"

export default function () {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const logoutHandler = () => {
        navigate('/')
    }
    if (bcrypt.compareSync(import.meta.env.VITE_AUTH_TRUE, token)) {
        return (
            <nav>
                <div className="items">
                    <ul>
                        <li>About</li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li>My Profile</li>
                        <li>Blogs</li>
                    </ul>
                </div>
                <div className="logo">
                    <Link to="/"><img src="./logo.png" alt="Logo" /></Link>
                </div>
                <button onClick={logoutHandler}>Log Out</button>
            </nav>
        )
    }
    else {
        return (
            <nav>
                <div className="items">
                    <ul>
                        <li><Link to="/m">About</Link></li>
                        <li><Link to="/m">Pricing</Link></li>
                        <li><Link to="/m">My Profile</Link></li>
                        <li><Link to="/m">Blogs</Link></li>
                    </ul>
                </div>
                <div className="logo">
                    <Link to="/"><img src="./logo.png" alt="Logo" /></Link>
                </div>
                <div className="buttons">
                    <button id="login" onClick={() => navigate('/login')}>login</button>
                    <button id="signup" onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            </nav>
        )
    }
}

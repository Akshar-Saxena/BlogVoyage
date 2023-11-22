import React from 'react'
import { useNavigate} from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { useEffect } from 'react'

export default function MiddleWare() {
    const navigate = useNavigate()
    const auth = localStorage.getItem("token")
    useEffect(() => {
        if (bcrypt.compareSync(import.meta.env.VITE_AUTH_TRUE, auth)){
            return navigate("/profile");
        }
        else{
            return navigate("/login");
        }
     },[]);
    return (
        <div className="spinner">
            <img src="https://i.pinimg.com/originals/49/8f/77/498f7727ecf2a588d6c3eebac92a7c4b.gif" alt="" />
        </div>
    )
}

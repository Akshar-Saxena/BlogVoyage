import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import bcrypt from "bcryptjs";

export default function ProfilePage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (bcrypt.compareSync(import.meta.env.VITE_AUTH_TRUE, token)) {
        return (
            <>
                <Navbar />
                <div className="profile-card">
                    <img src="./profilePhoto.png" alt="" />
                    <div>
                        <h1>Username : {localStorage.getItem("username")}</h1>
                        <h1>Bio : {localStorage.getItem("bio")} </h1>
                        <h2>Followers</h2>
                        <h2>Following</h2>
                    </div>
                    <div className="form">
                        <h1>recent blogs</h1>
                        <h1>Blog Name:How to make paneer</h1>
                        <h1>Blog Template:Cooking</h1>
                        <h1>
                            <input type="datetime-local" />
                        </h1>
                    </div>
                </div>
            </>
        );
    } else {
        useEffect(() => {
            navigate("/login");
        });
    }
}

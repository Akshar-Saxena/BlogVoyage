import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

export default function NewBlogPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState("");

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_KEY,
        authDomain: "blog-voyage-d3729.firebaseapp.com",
        projectId: "blog-voyage-d3729",
        storageBucket: "blog-voyage-d3729.appspot.com",
        messagingSenderId: "156508304269",
        appId: import.meta.env.VITE_APP_ID,
        measurementId: "G-FNJXKBCRXX",
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    console.log(location.state.id);

    const handleSubmit = async () => {
        const date = new Date();
        await addDoc(collection(db, "blogs"), {
            id: location.state.id,
            content: content,
            datetime: date.toLocaleString(),
        });
        navigate("/profile");
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return (
        <div>
            {/* <Navbar /> */}
            <div className="content-form">
                <label htmlFor="content">Write a Blog</label>
                <textarea
                    type="text"
                    id="content"
                    className="content-input"
                    value={content}
                    onChange={handleContentChange}
                />

                <button onClick={handleSubmit}>Create Blog</button>
            </div>
        </div>
    );
}

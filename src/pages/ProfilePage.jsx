import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import BlogCard from "../components/BlogCard";

export default function ProfilePage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    var userID = "";
    const [userBlogs, setUserBlogs] = useState([]);

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_KEY,
        authDomain: "blog-voyage-d3729.firebaseapp.com",
        projectId: "blog-voyage-d3729",
        storageBucket: "blog-voyage-d3729.appspot.com",
        messagingSenderId: "156508304269",
        appId: import.meta.env.VITE_APP_ID,
        measurementId: "G-FNJXKBCRXX",
    };

    const getBlogs = async () => {
        const blogs = await getDocs(collection(db, "blogs"));
        const users = await getDocs(collection(db, "Users"));
        users.forEach((element) => {
            // console.log(element.data()["username"]);
            if (
                element.data()["username"] == localStorage.getItem("username")
            ) {
                userID = element.id;
            }
        });
        blogs.forEach((element) => {
            if (element.data()["id"] == userID) {
                setUserBlogs((prev) => [...prev, element.data()]);
            }
        });
        console.log(userID);
        // console.log(userBlogs);
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    if (bcrypt.compareSync(import.meta.env.VITE_AUTH_TRUE, token)) {
        return (
            <>
                <Navbar />
                <div className="profile-card">
                    <img src="./profilePhoto.png" alt="" />
                    <div className="profile-card-right">
                        <h1>Username : {localStorage.getItem("username")}</h1>
                        <h1>Bio : {localStorage.getItem("bio")} </h1>
                        <h2>Followers</h2>
                        <h2>Following</h2>
                    </div>
                </div>
                <div className="blogs-holder">
                    {userBlogs.map((element, id) => (
                        <BlogCard
                            key={id}
                            content={element.content}
                            datetime={element.datetime}
                        />
                    ))}
                    <button
                        onClick={() =>
                            navigate("/new-blog", { state: { id: userID } })
                        }
                    >
                        New Blog
                    </button>
                </div>
            </>
        );
    } else {
        useEffect(() => {
            navigate("/login");
        });
    }
}

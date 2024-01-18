import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function AllBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);

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
        const allBlogs = await getDocs(collection(db, "blogs"));
        allBlogs.forEach((doc) => {
            setBlogs((prev) => [...prev, doc.data()]);
        });
        const allUsers = await getDocs(collection(db, "Users"));
        allUsers.forEach((doc) => {
            setUsers((prev) => [...prev, doc.data()]);
        });
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return (
        <>
            <Navbar />
            {blogs.map((element, id) => (
                <BlogCard
                    key={id}
                    author={users.forEach((ele) => {
                        if (ele.id == element.id) {
                            return ele.username;
                        }
                    })}
                    content={element.content}
                    datetime={element.datetime}
                />
            ))}
            {/* {blogs.map((element, id) => (
                <h1 key={id}>{element}</h1>
            ))} */}
        </>
    );
}

import React from "react";
import Navbar from "../components/Navbar";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function SignupPage() {
    let data = [];
    let flag = true;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState("none");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const [bio, setBio] = useState("");

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_KEY,
        authDomain: "blog-voyage-d3729.firebaseapp.com",
        projectId: "blog-voyage-d3729",
        storageBucket: "blog-voyage-d3729.appspot.com",
        messagingSenderId: "156508304269",
        appId: import.meta.env.VITE_APP_ID,
        measurementId: "G-FNJXKBCRXX",
    };

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    };
    const emailHandler = (e) => {
        setEmail(e.target.value);
    };
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };
    const cpasswordHandler = (e) => {
        setcPassword(e.target.value);
    };
    const bioHandler = (e) => {
        setBio(e.target.value);
    };

    const getData = async () => {
        var flagEmail = true;
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
            if (flag) {
                data.push(doc.data());
            }
        });
        flag = false;
        // console.log(data)

        if (
            username == "" ||
            password == "" ||
            cpassword == "" ||
            email == "" ||
            bio == ""
        ) {
            setLoading(false);
            alert("Fill each Fields");
            return null;
        }
        data.forEach((element) => {
            if (email == element.email) {
                setLoading(false);
                alert("Email Already Used! Try using another email");
                flagEmail = false;
                return null;
            }
            if (username == element.username) {
                setLoading(false);
                alert("Username Already Taken");
                flagEmail = false;
                return null;
            }
        });
        if (!flagEmail) {
            return null;
        }
        if (password == cpassword) {
            await addDoc(collection(db, "Users"), {
                username: username,
                password: bcrypt.hashSync(password, 11),
                email: email,
                bio: bio,
            });
            setLoading(false);
            alert("Account Created");
            localStorage.removeItem("token");
            localStorage.setItem(
                "token",
                bcrypt.hashSync(`${import.meta.env.VITE_AUTH_TRUE}`, 10)
            );
            localStorage.setItem("username", username);
            localStorage.setItem("bio", bio);
            navigate("/m");
        }
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return (
        <div>
            <Navbar />
            <div className="sign">
                {loading && (
                    <div className="spinner">
                        <HashLoader
                            size={70}
                            className="spinnerElement"
                            color="blue"
                        />
                    </div>
                )}
                <h1>Create Account</h1>
                <input
                    id="user"
                    type="text"
                    onChange={usernameHandler}
                    value={username}
                    placeholder="Create Username"
                />
                <br />
                <input
                    id="mail"
                    type="text"
                    onChange={emailHandler}
                    value={email}
                    placeholder="Enter your email"
                />
                <br />
                <input
                    id="pass"
                    type="password"
                    onChange={passwordHandler}
                    value={password}
                    placeholder="Create Password"
                />
                <br />
                <input
                    id="cpass"
                    type="password"
                    onChange={cpasswordHandler}
                    value={cpassword}
                    placeholder="Confircm Password"
                />
                <br />
                <input
                    id="bio"
                    type="text"
                    onChange={bioHandler}
                    value={bio}
                    placeholder="Enter Bio for Profile"
                />
                <div className="sbutton">
                    <button onClick={getData} id="sign">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

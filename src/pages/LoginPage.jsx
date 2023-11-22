import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function LoginPage() {
    let data = [];
    let flag = true;
    let loggedIn = false;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const generateCaptcha = () => {
        const capLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const smallLetter = capLetter.toLowerCase();
        var captcha = "";
        const captchaDiv = document.querySelector(".captcha");

        for (let i = 0; i < 6; i++) {
            let tempIndex = Math.floor(26 * Math.random());
            if (i < 2) {
                captcha += capLetter[tempIndex];
            } else if (i >= 2 && i < 4) {
                captcha += smallLetter[tempIndex];
            } else {
                captcha += Math.floor(9 * Math.random());
            }
        }
        setCaptcha(captcha);
    };

    useEffect(generateCaptcha, []);

    const [display, setDisplay] = useState("none");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidati0n] = useState("");
    const [captcha, setCaptcha] = useState("");

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    };
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };
    const validationHandler = (e) => {
        setValidati0n(e.target.value);
    };

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_KEY,
        authDomain: "blog-voyage-d3729.firebaseapp.com",
        projectId: "blog-voyage-d3729",
        storageBucket: "blog-voyage-d3729.appspot.com",
        messagingSenderId: "156508304269",
        appId: import.meta.env.VITE_APP_ID,
        measurementId: "G-FNJXKBCRXX",
    };

    const loginHandler = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
            if (flag) {
                data.push(doc.data());
            }
        });
        flag = false;
        if (username == "" || password == "" || validation == "") {
            alert("Fill each fields");
            return null;
        }
        if (validation == captcha) {
            data.forEach((element) => {
                if (
                    element.username == username &&
                    bcrypt.compareSync(password, element.password)
                ) {
                    setLoading(false);
                    localStorage.removeItem("token");
                    localStorage.setItem(
                        "token",
                        bcrypt.hashSync(`${import.meta.env.VITE_AUTH_TRUE}`, 10)
                    );
                    localStorage.setItem("username", element.username);
                    localStorage.setItem("bio", element.bio);
                    navigate("/m");
                    loggedIn = true;
                }
            });
            if (!loggedIn) {
                // setDisplay("none");
                setLoading(false);
                alert("Invalid username or password");
            }
        } else {
            setLoading(false);
            alert("Invalid Captcha");
        }
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return (
        <>
            <Navbar />
            <div className="login">
                {loading && (
                    <div className="spinner">
                        <HashLoader
                            size={70}
                            className="spinnerElement"
                            color="blue"
                        />
                    </div>
                )}
                <h1>Login</h1>
                <input
                    id="loginUsername"
                    type="text"
                    value={username}
                    onChange={usernameHandler}
                    placeholder="Enter your name"
                />
                <br />
                <input
                    id="loginPassword"
                    type="password"
                    value={password}
                    onChange={passwordHandler}
                    placeholder="Enter Password"
                />
                <br />
                <input
                    id="loginCaptcha"
                    type="text"
                    value={validation}
                    onChange={validationHandler}
                    placeholder="Enter Captcha"
                />
                <br />
                <div className="captcha" onLoad={generateCaptcha}>
                    {captcha}
                </div>
                <div className="sbutton">
                    <button id="#login" onClick={loginHandler}>
                        Log In
                    </button>
                </div>
            </div>
        </>
    );
}

import React from 'react'

export default function Footer() {
    return (
        <div className="footer">
            <div className="leftFooter">
                <a href="">&copy; https://www.blogvoyage.onrender.com</a>
                <h3><span id="headingLeftFooter">Street</span>: 104, A, Vallabh Vihar, M G Road, Opp State Bank Of India, Madiwala (east)</h3>
                <h3><span id="headingLeftFooter">City</span>: Mumbai</h3>
                <h3><span id="headingLeftFooter">Phone number</span>: 22251XXXX</h3>
                <h3><span id="headingLeftFooter">Zip Code</span>: 400077</h3>
            </div>
            <div className="middleFooter">
                <h2>Blog Voyage</h2>
                <a href="index.html">Home</a>
                <a href="">About</a>
                <a href="">Pricing</a>
                <a href="">My Profile</a>
                <a href="">Blogs</a>
            </div>
            <div className="rightFooter">
                <h2>Team Members</h2>
                <h3>Akshar Saxena</h3>
                <h3>Akanksha Verma</h3>
                <h3>Akhil Mehra</h3>
                <h3>Akash Tyagi</h3>
            </div>
        </div>
    )
}

import React from "react";

export default function AllBlogsCard(props) {
    return (
        <div className="blog-card">
            <h1>{props.author}</h1>
            <p>{props.content}</p>
            <h3>{props.datetime}</h3>
        </div>
    );
}

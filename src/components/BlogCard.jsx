import React from "react";

export default function BlogCard(props) {
    return (
        <div className="blog-card">
            <p>{props.content}</p>
            <h3>{props.datetime}</h3>
        </div>
    );
}

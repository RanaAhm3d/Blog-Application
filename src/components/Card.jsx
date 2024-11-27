import React from "react";
import { Link } from "react-router-dom";

export default function Card({
    id,
    body,
    title,
}) {
    return (

        <div className="card my-1 mx-auto" style={{ width: "18rem" }}>
            <img src="https://th.bing.com/th/id/R.1caa1e3a11fd07989cc7b5418904870d?rik=UhBmwPoSaGhS9Q&pid=ImgRaw&r=0"
                className="card-img-top"
                alt="" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {body}
                </p>
                <Link
                    className="p-2 bg-primary mt-2 text-white rounded-pill text-decoration-none"
                    to={`${id}`}
                >
                    Open The Post
                </Link>
            </div>
        </div>
    );
}
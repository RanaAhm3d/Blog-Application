import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Blogyy
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          <Link className="nav-link" aria-current="page" to="#">
              Featured
            </Link>
            <Link className="nav-link" aria-current="page" to="#">
              Latest
            </Link>
            <Link className="nav-link" aria-current="page" to="#">
              Trending
            </Link>
          </ul>
        </div>
        <Button>
          <Link className="text-white nav-link" to={"add"}>Add Post</Link>
        </Button>
      </div>

    </nav>


  );
}

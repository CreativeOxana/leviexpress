import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const Header = () => (
  <header>
    <div className="container">
      <h1 className="site-title">
        <a href="/">LeviExpress</a>
      </h1>
      <nav>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/reservation">Reservation</Link>
      </nav>
    </div>
  </header>
);

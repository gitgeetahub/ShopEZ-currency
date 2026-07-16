import React from 'react'
import CurrencySwitcher from './CurrencySwitcher'

export default function Navbar({ user, cartCount, onCartClick, onProductsClick, onAuthClick, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand fw-bold" onClick={onProductsClick} style={{ cursor: 'pointer' }}>
          ShopEZ
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={onProductsClick} style={{ cursor: 'pointer' }}>
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link position-relative" onClick={onCartClick} style={{ cursor: 'pointer' }}>
                Cart
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </a>
            </li>
            <li className="nav-item">
              <CurrencySwitcher />
            </li>
            <li className="nav-item">
              {user ? (
                <>
                  <span className="nav-link">Hi, {user.name}</span>
                  <a className="nav-link" onClick={onLogout} style={{ cursor: 'pointer' }}>
                    Logout
                  </a>
                </>
              ) : (
                <a className="nav-link" onClick={onAuthClick} style={{ cursor: 'pointer' }}>
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

import React from 'react'
import './header.css'


function Header({ children }) {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header-grid">
          <div>
            <h1>Facturas Ufinet</h1>
            <p className="header-total">Ufinet</p>
          </div>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from "../assets/react.svg"

function Navbar({ searchValue, onSearchChange }) {
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleSearch = (e) => {
    if(onSearchChange) {
      onSearchChange(e)
    }
  }

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" /> 
          <span className="font-bold text-xl text-gray-800">Task Manage</span>
        </a>
        
        {/* Show search only on Home page */}
        {location.pathname === '/' && (
          <div className="flex-1 max-w-xs search-field group">
            <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
            <input
              type="text"
              placeholder="Search Task"
              className="search-input"
              id="searchTask"
              value={searchValue || ''}
              onChange={handleSearch}
            />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const savedUser = localStorage.getItem('loggedInUser')

    if (isLoggedIn && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        setUser(null)
      }
    } else {
      setUser(null)
    }

    setMenuOpen(false)
  }, [location])

  function handleLogout() {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('isLoggedIn')

    setUser(null)
    setMenuOpen(false)

    navigate('/login')
  }

  return (
    <nav className="navbar">


      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/home#about">About</Link>
        <Link to="/home#services">Services</Link>
        <Link to="/home#portfolio">Portfolio</Link>
        <Link to="/home#contact">Contact</Link>
        <Link to="/services"> All Services</Link>
        <Link to="/cart">Cart ({cart.length})</Link>

        {user ? (
          <div className="navbar-user">
            <button
              type="button"
              className={`navbar-user-button ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Open user menu"
            >
              <span className="navbar-user-name">
                {user.fullName}
              </span>

              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt=""
                  className="navbar-user-avatar"
                />
              ) : (
                <span className="navbar-user-avatar navbar-avatar-fallback">
                  {user.fullName?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}

              <span className="navbar-dropdown-arrow">
                {menuOpen ? '▲' : '▼'}
              </span>
            </button>

            {menuOpen && (
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-info">
                  <strong>{user.fullName}</strong>
                  <span>{user.email}</span>
                </div>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  <span>↪</span> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="navbar-register-link"
            >
              Create Account
            </Link>


          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar

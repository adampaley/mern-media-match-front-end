// imports
import './NavBar.css'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { SettingsContext } from '../../contexts/SettingsContext'

// component
const NavBar = () => {
  // hooks
  const { user, setUser } = useContext(UserContext)
  const { setIsDrawerOpen } = useContext(SettingsContext)
  const navigate = useNavigate()

  // handler functions
  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSettingButtonClick = () => {
    setIsDrawerOpen(true)
    navigate('/settings')
  }
  
  // return
  return (
    <nav className='navbar'>
      {user ? (
        <ul>
          <li><Link to={'/'}>Dashboard</Link></li>
          <li><Link to={'/cart'}>Cart</Link></li>
          <li><Link to={'/library'}>Library</Link></li>
          <li><button onClick={()=>handleSettingButtonClick()} className="navbar-settings-btn">Settings</button></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
        </ul>
      )}
    </nav>
  )
}

// export
export default NavBar
import './Navbar.css'
import { useState ,useEffect} from 'react'
import { Link} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const {Token,setToken,User}=useContext(StoreContext)
    const [showLogout, setshowLogout] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token")
        setToken("")
        setshowLogout(false)
    }

    useEffect(() => {
        let timer
        if (showLogout) {
            timer = setTimeout(() => {
                setshowLogout(false)
            }, 5000)
        }
        return () => clearTimeout(timer)
    }, [showLogout])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='Navbar'>
            <div className='nav-part1'>
                <p className='nav-part1-heading'>The Fortune Heights</p>
            </div>
            <div className={`nav-part2 ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <p><Link to={'/'} onClick={isMobileMenuOpen ? toggleMobileMenu : null}>Home</Link></p>
                <p><Link to={'/About'} onClick={isMobileMenuOpen ? toggleMobileMenu : null}>About</Link></p>
                <p><Link to={'/Contact'} onClick={isMobileMenuOpen ? toggleMobileMenu : null}>Contact</Link></p>
            </div>
            {Token ? (
                <div className='nav-part3'>
                    <div className='profile-container' onClick={() => setshowLogout(!showLogout)}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className='alpha'>{User.name}</span>
                        {showLogout && (
                            <div className='dropdown-menu'>
                                <button onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='nav-part3'>
                    <Link to='/SignIn'>Sign-In</Link>
                </div>
            )}

            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            </div>
        </div>
    )
}

export default Navbar

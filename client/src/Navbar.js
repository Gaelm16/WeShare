import React, {useContext}  from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import { AuthContext } from './Usercontext'

const Navbar = () => {
    const {loggedIn, logOut} = useContext(AuthContext)

    return (
        <nav className='nav'>
            <div className="nav-center">
                {loggedIn === false && (
                    <>
                    <div className="nav-header">
                        <Link to='/' className='links-btn'>
                            <h1>WeShare</h1>
                        </Link>
                    </div>
                    <ul className='nav-links'>
                        <li>
                            <button className='links-btn'>
                                <Link to='/login' className='links-btn' >Login</Link>
                            </button>
                        </li>
                        <li>
                            <button className='links-btn'>
                                <Link to='/register' className='links-btn' >Sign Up</Link>
                            </button>
                        </li>
                    </ul>
                    </>
                )}
                {loggedIn === true && (
                     <> 
                    <div className="nav-header">
                        <Link to='/posts' className='links-btn'>
                            <h1>WeShare</h1>
                        </Link>
                    </div>
                   <ul className='nav-links'>
                        <li>
                            <button className='links-btn'>
                                <Link to='/profile' className='links-btn' >Profile</Link>
                            </button>
                        </li>
                        <li>
                            <button className='links-btn' onClick={() => logOut()}>Log Out</button>
                        </li>
    
                    </ul>
                    </>
                 )}
            </div>
        </nav>
    )
}

export default Navbar

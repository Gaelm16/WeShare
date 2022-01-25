import React, {useState, useContext} from 'react'
import Navbar from './Navbar'
import { Link, Redirect} from 'react-router-dom'
import { AuthContext } from './Usercontext'

import axios from 'axios'

const Login = () => {
    const [userName, setuserName] =useState('')
    const [passWord, setpassWord] =useState('')

    const {loggedIn, getloggedIn} = useContext(AuthContext)

    const login = async(e) => {
        e.preventDefault()
        try{
            const data = {userName, passWord}
            await axios.post('http://localhost:4000/login', data)
            getloggedIn()
        } catch(err) {
            console.log('there is an error' + err)
        }
        setuserName('')
        setpassWord('')
    }

     if(loggedIn){
        return (<Redirect to='/posts'/> )
    }

    return (
        <div>
            <Navbar/>
             <div className='login-sign'>
                <form >
                <div className='header'>
                    <h3>Login</h3>
                </div>
                <div className='forms'>
                    <div className='margin'>
                        <div className='labeldiv'>
                            <label className='label'>Username</label>
                        </div>
                        <input 
                        type='text'
                        className='form-input'
                        value={userName}
                        placeholder='Enter username'
                        onChange={((e) => setuserName(e.target.value))}
                        />
                    </div>
                    <div className='margin'>
                        <div className='labeldiv'>
                            <label className='label'>Password</label>
                        </div>
                        <input 
                        type='text'
                        className='form-input'
                        value={passWord}
                        placeholder='Enter password'
                        onChange={((e) => setpassWord(e.target.value))}
                        />
                    </div>
                </div>
                <div className='enter-form'>
                    <button className='enter-btn' onClick={login}>Login</button>
                </div>
                </form>
                <div className='enterform'>
                    <p>Don't have an account sign up? 
                        <span>
                            <Link to='/register' className='links-btn'>Here</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login

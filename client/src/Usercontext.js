import axios from "axios"
import React, {createContext, useState, useEffect} from "react"
import { useHistory} from "react-router-dom"

export const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const [loggedIn, setloggedIn] = useState(false)
    const [comments, setComments] = useState([])
    const [post, setPost] = useState([])
    // const [user, setUser]  = useState({})
    const history = useHistory()

    const getloggedIn = async() => {
        const loggedInRes = await axios.get('http://localhost:4000/loggedIn')
        setloggedIn(loggedInRes.data)
    }


    const logOut = async () => {
        await axios.get('http://localhost:4000/logout')
        await getloggedIn()
        history.push('/')
    }

    useEffect(() => {
        getloggedIn()  
    },[])

    return(
        <AuthContext.Provider value={{loggedIn, getloggedIn, logOut, comments, setComments, post, setPost}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
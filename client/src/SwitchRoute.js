import React from 'react'
import {Route, Switch } from 'react-router-dom'
import Hero from './Hero'
import Login from './Login'
import Signup from './Signup'
import Commentpage from './Commentpage'
import PostsPage from './Postpage'
import Profilepage from './Profilepage'

const SwitchRoute = () => {
    // const {loggedIn} = useContext(AuthContext)
    return(
    <Switch>
        <Route exact path='/'> <Hero/> </Route>
        <Route path='/login'> <Login/> </Route>
        <Route path='/register'> <Signup/> </Route>
        <Route exact path='/posts'> <PostsPage/> </Route>
        <Route path='/comments/:id' component={Commentpage}/>
        <Route path='/profile' component={Profilepage} />
    </Switch>
    )
}

export default SwitchRoute

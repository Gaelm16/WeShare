import React from 'react';
import './App.css';
import SwitchRoute from './SwitchRoute';
import AuthProvider from './Usercontext';
import axios from 'axios';

axios.defaults.withCredentials = true

function App() {
  return (  
    <AuthProvider>
      <SwitchRoute/> 
    </AuthProvider>
  )
}

export default App;

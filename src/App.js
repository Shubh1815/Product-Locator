import React, { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import AuthRoutes from './routes/AuthRoutes'

import { BrowserRouter as Router , Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

import { useCookies } from 'react-cookie'

import AuthContext from './context/authContext'

import axios from 'axios'

const setHeaders = (token) => {
  axios.defaults.headers.common['Authorization'] = token
} 

function App() {

  const [ cookies, , removeCookie ] = useCookies()
  const [ isAuth, setIsAuth ] = useState(cookies.key ? true: false)
  const [ user, setUser ] = useState({
    'pk': '',
    'username': null,
    'email': '',
  })
  const [ isAdmin, setIsAdmin ] = useState(null)

  useEffect(() => {
      if(cookies.key){
        setIsAuth(true)
        setHeaders(`Token ${cookies.key}`)
      } else {
        setHeaders('')
        setIsAuth(false)
        setIsAdmin(null)
        
      }
  }, [ cookies.key ])

  useEffect(() => {
    if(isAuth && isAdmin == null){
      axios.get('http://127.0.0.1:8000/auth/user/')
      .then((response) => {
        console.log(response.data)
        setIsAdmin(response.data.is_superuser)
        setUser(response.data)
      })
      .catch((err) => {
        console.log(err.response)
        removeCookie('key')
        setIsAuth(false)
        setIsAdmin(null)
      })
    }
  }, [ isAuth, isAdmin, removeCookie ])

  return (
    <AuthContext.Provider value={{
      'isAuth': isAuth,
      'token': cookies.key,
      'setIsAuth': setIsAuth,
      'isAdmin': isAdmin,
      'user': user,
      'setUser': setUser,
    }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          { isAuth  && <AuthRoutes isAdmin={isAdmin} /> }
          <Redirect to="/"/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App

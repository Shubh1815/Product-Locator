import React, { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import AuthRoutes from './routes/AuthRoutes'

import { BrowserRouter as Router , Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

import { useCookies } from 'react-cookie'

import AuthContext from './context/authContext'

import axios from 'axios'

const setHeaders = (token) => {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`
} 

function App() {

  const [ cookies ] = useCookies()
  const [ isAuth, setIsAuth ] = useState(cookies.key ? true: false)
  const [ username, setUsername ] = useState('')
  const [ isAdmin, setIsAdmin ] = useState(null)

  useEffect(() => {
      if(cookies.key){
        setIsAuth(true)
        setHeaders(cookies.key)
      } else {
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
        setUsername(response.data.pk)
      })
      .catch((err) => {
        console.log(err.response)
        setIsAuth(false)
        setIsAdmin(null)
      })
    }
  }, [ isAuth, isAdmin, cookies.key ])

  return (
    <AuthContext.Provider value={{
      'isAuth': isAuth,
      'token': cookies.key,
      'setIsAuth': setIsAuth,
      'isAdmin': isAdmin,
      'username': username
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

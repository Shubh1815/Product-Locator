import React, { useState, useContext, useEffect } from 'react'
import { Container, Paper, Grid, Typography } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

import AuthContext from '../../context/authContext'

const useStyle = makeStyles({
    root: {
        'margin-top': '45px',
    },
    wrapper: {
        'padding': '20px 10px',
    },
    button: {
        'color': 'white',
        'background-color': '#28a745',
        '&:hover': {
            'background-color': '#1d9238',
        }
    }
})

const Profile = () => {

    const classes = useStyle()

    const { user } = useContext(AuthContext)

    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState('')
    const [ state, setState ] = useState({
        'username': user.username ? user.username : '',
        'email': user.email,
    })
    const [ error, setError ] = useState({
        'username': '',
        'email': '',
    })

    useEffect(() => {
        setState({
            'username': user.username ? user.username : '',
            'email': user.email,
        })
    }, [ user ])

    const handleChange = (event) => {
        setSuccess('')
        const label = event.target.name
        const value = event.target.value

        setState((prevState) => {
            let newState = { ...prevState }
            newState[label] = value
            return newState
        })
    }

    const handleSubmit = () => {
        setLoading(true)
        axios.put('http://127.0.0.1:8000/auth/user/', state)
        .then((response) => {
            setSuccess('User Profile Updated')
            console.log(response.data)
            setState({
                'username': response.data.username,
                'email': response.data.email,
            })
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err.response)
            setError({
                'username': err.response.data.username,
                'email': err.response.data.email && err.response.data.email.join(" ")
            })
        })
        
    }

    return (
        <Container maxWidth="sm"  className={classes.root}>
            <Grid container spacing={2} component={Paper} className={classes.wrapper}>
                <Grid item xs={12}>
                    <Typography component="div" variant="h4" align="center">User Profile</Typography>
                    { success && <Alert severity="success" >{success}</Alert> }
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Username" 
                        value={state.username}
                        name="username"
                        error={Boolean(error.username)}
                        helperText={error.username}
                        variant="outlined"
                        onChange={handleChange} 
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={state.email}
                        label="Email" 
                        name="email"
                        variant="outlined" 
                        error={Boolean(error.email)}
                        helperText={error.email}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" className={classes.button} onClick={handleSubmit}>Update</Button>
                    { loading && <LinearProgress /> }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Profile
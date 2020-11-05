import React, { useState } from 'react'
import { Container, Paper, Grid, Typography } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'


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

const Password = () => {

    const classes = useStyle()

    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState('')
    const [ state, setState ] = useState({
        'old_password': '',
        'new_password1': '',
        'new_password2': '',
    })
    const [ error, setError ] = useState({
        'old_password': '',
        'new_password1': '',
        'new_password2': '',
    })

    const handleChange = (event) => {
        setSuccess('')
        setError({
            'old_password': '',
            'new_password1': '',
            'new_password2': '',
        })
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
        axios.post('http://127.0.0.1:8000/auth/password/change/', state)
        .then((response) => {
            setSuccess('Password changed successfully')
            console.log(response.data)
            setState({
                'old_password': '',
                'new_password1': '',
                'new_password2': '',
            })
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err.response)
            setError({
                'old_password': err.response.data.old_password,
                'new_password1': err.response.data.new_password1,
                'new_password2': err.response.data.new_password2,
            })
        })
        
    }

    return (
        <Container maxWidth="sm"  className={classes.root}>
            <Grid container spacing={2} component={Paper} className={classes.wrapper}>
                <Grid item xs={12}>
                    <Typography component="div" variant="h4" align="center">Change Password</Typography>
                    { success && <Alert severity="success" >{success}</Alert> }
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Old Password" 
                        value={state.old_password}
                        name="old_password"
                        error={Boolean(error.old_password)}
                        helperText={error.old_password}
                        variant="outlined"
                        onChange={handleChange} 
                        type="password"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={state.new_password1}
                        label="New Password" 
                        name="new_password1"
                        variant="outlined" 
                        error={Boolean(error.new_password1)}
                        helperText={error.new_password1}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        value={state.new_password2}
                        label="Confirm Password" 
                        name="new_password2"
                        variant="outlined" 
                        error={Boolean(error.new_password2)}
                        helperText={error.new_password2}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" className={classes.button} onClick={handleSubmit}>Change</Button>
                    { loading && <LinearProgress /> }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Password
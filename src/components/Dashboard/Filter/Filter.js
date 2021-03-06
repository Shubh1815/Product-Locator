import React, { useState } from 'react'
import { Container, Box, Paper, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

const useStyle = makeStyles((theme) => ({
    wrapper: {
        'margin-top': '20px',
        [theme.breakpoints.down('xs')]: {
            'display': 'none',
        }
    },
    root: {
        'padding': '15px',
        '& > div': {
            'margin': '0 5px'
        }
    },
}))

const Filter = ({ setTransaction, setLoading }) => {

    const [ state, setState ] = useState({
        'product_id': '',
        'location_id': '',
        'user_id': '',
        'date': '',
    })

    const classes = useStyle()

    const handleChange = (event) => {
        event.persist()
        setState((prevState) => {
            const nxtState = {...prevState}
            nxtState[event.target.name] = event.target.value
            return nxtState
        })
    }

    const handleFilter = () => {
        setTransaction([])
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/transaction/', {
            params: state,
        })
        .then((response) => {
            console.log(response.data)
            setLoading(false)
            setTransaction(response.data)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <Container maxWidth="lg" className={classes.wrapper}>
            <Box className={classes.root} component={Paper} display="flex" justifyContent="space-around" alignItems="center">
                <TextField 
                    label="Product ID"
                    name="product_id"
                    value={state.product_id}
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                />
                <TextField 
                    label="Location ID"
                    name="location_id"
                    value={state.location_id}
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                />
                <TextField 
                    label="User ID"
                    name="user_id"
                    value={state.user_id}
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                />
                <TextField 
                    variant="outlined"
                    name="date"
                    value={state.date}
                    type="date"
                    size="small"
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={handleFilter}>Filter</Button>
            </Box>
        </Container>

    )
}

export default Filter
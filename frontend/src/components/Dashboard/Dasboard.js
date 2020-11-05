import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import Statistics from './Statistics/Statistics'
import Transactions from '../Transactions/Transaction'

import AuthContext from '../../context/authContext'

import './dashboard.css'

const Dashboard = () => {
    
    const [ state, setState ] = useState({
        'count': {
            'user': '',
            'transaction': '',
            'arena': ''
        },
        'loading': true
    })
    const [ transaction, setTransaction ] = useState([])
    
    const { token } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const transactionResponse = await axios.get('http://localhost:8000/api/transaction')
                const transactionCount = transactionResponse.data.length
                const userCount = await axios.get('http://localhost:8000/api/user/count')
                const arenaCount = await axios.get('http://localhost:8000/api/arena/count')

                if((transactionResponse.status === 200) && userCount.status === 200 && arenaCount.status === 200){
                    setTransaction(transactionResponse.data)
                    setState({
                        'count': {
                            'user': userCount.data.user,
                            'transaction': transactionCount,
                            'arena': arenaCount.data.arena
                        },
                        'loading': false
                    })
                }
            } catch(err){
                console.log(err)
            }
        }
        if(token){
            fetchData()
        }
    }, [ token ])

    return (
        <Container maxWidth="xl">
            <Statistics count={state.count}/>

            <Typography component="h4" variant="h4">Transaction Status</Typography>
            <Divider />

            <Transactions rows={transaction} setTransaction={setTransaction} loading={state.loading}/>

        </Container>
    )
}

export default Dashboard
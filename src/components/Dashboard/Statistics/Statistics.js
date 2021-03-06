import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat'
import GridOnIcon from '@material-ui/icons/GridOn'

import Stat from './Stat/Stat'

const useStyle = makeStyles({
    gridContainer: {
        'margin': '24px 0',
    }
})

const Statistics = ({ count }) => {

    const classes = useStyle()
    
    return (
        <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={4}>
                <Stat label="Users" count={count['user']} bg="linear-gradient(90deg, rgb(250 115 115) 15%, rgb(219, 48, 11) 90%)" >
                    <PersonIcon fontSize="large"/>
                </Stat>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stat label="Transactions" count={count.transaction} bg="linear-gradient(90deg, rgba(232,225,123,1) 1%, rgb(232 173 8) 100%)">
                    <DirectionsBoatIcon fontSize="large"/>
                </Stat>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stat label="Arenas" count={count.arena} bg="linear-gradient(90deg, rgb(179 243 223) 1%, rgb(3 208 181) 100%)" >
                    <GridOnIcon fontSize="large"/>
                </Stat>
            </Grid>
        </Grid>
    )
}

export default Statistics
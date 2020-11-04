import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
    root: {
        'color': 'white',
        'margin': theme.spacing(1),
        'text-align': 'center'
    },
    header: {
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
    },
    typographyH5: {
        'padding': '16px'
    },
    typographyH4:{
        'padding': '20px',
        'minHeight': '45px' 
    }
}))

const Stat = (props) => {

    const classes = useStyle()

    return (
        <Paper elevation={4} className={classes.root} style={{background: props.bg}}>
            <div className={classes.header}>
                {props.children}
                <Typography component="div" variant="h5" className={classes.typographyH5}>{props.label}</Typography>
            </div>
            
            <Divider />
            
            <Typography component="div" variant="h4" className={classes.typographyH4}>{props.count}</Typography>
            
        </Paper>
    )
}

export default Stat
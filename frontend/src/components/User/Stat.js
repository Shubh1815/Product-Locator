import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
    root: {
        'color': 'white',
        'margin': theme.spacing(1),
        '& > .header': {
            'display': 'flex',
            'justifyContent': 'center',
            'alignItems': 'center',
            '& > div': {
                'padding': '16px',
            }
        },
        '& > .body': {
            'padding': '20px',
            'minHeight': '50px' 
        }
    },

}))

const Stat = (props) => {

    const classes = useStyle()

    return (
        <Paper elevation={4} className={classes.root} style={{background: props.bg}}>
           
            {props.children}
            
        </Paper>
    )
}

export default Stat
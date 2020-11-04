import React, { useState, useEffect, useRef } from 'react'
import { Container, Paper } from '@material-ui/core'
import { HorizontalBar } from 'react-chartjs-2'

import axios from 'axios'

const Chart = () => {

    const [ data, setData ] = useState([])
    let arenaChart = useRef()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/arena/')
        .then((response) => {
            setData(response.data)
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        let arenaChartInstance = arenaChart.current.chartInstance
        arenaChartInstance.config.data.labels =  data.map((arena) => `Arena ${arena.location_id}`)
        arenaChartInstance.config.data.datasets = [{
                label: 'Percentage',
                backgroundColor: '#4bc0c090',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                data: data.map((arena) => (arena.products.length * 100 / (arena.rows * arena.cols)).toFixed(2))
            }
        ]
        arenaChartInstance.update()
    }, [ data ])

    return (
        <Container maxWidth="lg" style={{marginTop: '45px'}} component={Paper}>
            <HorizontalBar
            ref={arenaChart}
            data={{
                labels: data.map((arena) => `Arena ${arena.location_id}`),
                datasets: [{
                    label: 'Percentage',
                    backgroundColor: '#4bc0c090',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 2,
                    data: data.map((arena) => (arena.products.length * 100 / (arena.rows * arena.cols)).toFixed(2))
                }]
            }}
            options={{
                animation:{
                    duration: 750
                },
                title:{
                    display:true,
                    text:'Arenas',
                    fontSize:30
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 100,
                        }
                    }],
                }
            }}
            />
            
        </Container>
    )
}

export default Chart
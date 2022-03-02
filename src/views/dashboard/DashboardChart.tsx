import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'

import { gridSpacing } from 'assets/constants'
import MainCard from 'ui-components/cards/MainCard'
import PlotlyChart from 'react-plotlyjs-ts';

interface Props {
    chartData: any
    isLoading: boolean
    simTime: number
    setChartData: (data: any) => void
}

const DashboardChart = ({chartData, isLoading, simTime, setChartData}: Props) => {
    // const [updatedData, setUpdatedData] = useState(chartData);
    
    const createChartObject = (name: string, data: []) => {
        return {
            name: name,
            type: 'line',
            x: Array.from(Array(simTime + 1).keys()),
            y: data
        }
    }
    let test: any = []

    useEffect(() => {
        // const newChartData = {
        //     ...chartData.options
        // }
        //@ts-ignore
        window.Echo.channel('channel').listen(
            'DataBroadcaster',
            (e: any) => {
                
                if (e.hello) {
                    let newArray : any = []
                    e.hello.map((item: any) => {
                        let parsedData = item.data.map((itemData: string) => parseFloat(itemData))
                        newArray = [
                            ...newArray, 
                            createChartObject(item.name, parsedData)
                        ]
                    })
                    if (newArray[0].y.length - chartData[0].y.length >= 10) {
                        test = e.hello
                        setChartData(newArray)
                    }
                } 
            }
        )        
    }, [test]);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <PlotlyChart data={chartData}/>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default DashboardChart

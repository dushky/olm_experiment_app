import React, { useContext, useEffect, useState, useReducer } from 'react'

import { Grid } from '@mui/material'

import { gridSpacing } from 'assets/constants'
import MainCard from 'ui-components/cards/MainCard'
import PlotlyChart from 'react-plotlyjs-ts'
import moment from 'moment'
// import { SimulationTimeContext } from 'App'

interface Props {
    chartData: any
    isLoading: boolean
    setChartData: (data: any) => void
    simTime: number
}

let lastUpdate = moment()
let test : any= []
const DashboardChart = ({chartData, isLoading, setChartData, simTime}: Props) => {
    // const { simTime, setSimTime } = useContext(SimulationTimeContext)
    const createChartObject = (name: string, data: any) => {
        if (name !== "Chip temp") {
            return {
                name: name,
                type: 'line',
                x: Array.from(Array(simTime + 1).keys()),
                y: data,
                visible: 'legendonly'
            }
        } else {
            return {
                name: name,
                type: 'line',
                x: Array.from(Array(simTime + 1).keys()),
                y: data
            }
        }
    }

    useEffect(() => {
        //@ts-ignore
        window.Echo.channel('channel').listen(
            'DataBroadcaster',
            (e: any) => {
                if (e.hello) {
                    console.log("SIMULATION TIME: ", simTime)
                    const currentTime = moment()
                    const diff = currentTime.diff(lastUpdate)
                    if (diff >= 250) {
                        lastUpdate = currentTime
                        let newArray : any = []
                        e.hello.map((item: any) => {
                            let parsedData = item.data.map((itemData: string) => parseFloat(itemData))
                            const lastData = parsedData[parsedData.length - 1]
                            const foundChartItem = test.find((chartItem: any) => chartItem.name === item.name)
                            let finalData : any = []
                            if (foundChartItem)
                                finalData = [...foundChartItem.y, lastData]
                            else 
                                finalData = [lastData]
                            newArray = [
                                ...newArray, 
                                createChartObject(item.name, finalData)
                            ]
                        })
                        test = newArray
                        setChartData(newArray)
                    }
                } 
            }
        )        
    }, []);

    useEffect(() => {
        console.log("CHANGE", simTime)

    }, [simTime])

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

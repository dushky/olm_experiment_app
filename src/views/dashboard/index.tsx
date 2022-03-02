import React, { useState, useEffect } from 'react'

// MUI
import { Grid } from '@mui/material'


// constants
import { gridSpacing } from 'assets/constants'
import DashboardChart from './DashboardChart'
import { useRunScriptMutation, useGetDevicesQuery, DeviceConfig, useStopScriptMutation, useChangeScriptMutation } from "generated/graphql"
import ExperimentForm from './ExperimentForm'
import Page404 from "views/pages/Page404"
import ExperimentFormWrapper from './ExperimentFormWrapper'
import MainCard from 'ui-components/cards/MainCard'

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const { data: devicesData, loading: devicesLoading, error: devicesError } = useGetDevicesQuery()
    const [simTime, setsimTime] = useState(4)

    const [mutation, { data, loading, error }] = useRunScriptMutation()
    const [stopMutation, { data: stopData, loading: stopLoading, error: stopError }] = useStopScriptMutation()
    const [changeMutation, {data: changeData, loading: changeLoading, error: changeError}] = useChangeScriptMutation()

    const series: {
        name: string,
        data: []
    } = {
        name: "Test",
        data: []
    }

    useEffect(() => {
        setLoading(false);        
    }, []);

    const handleSubmit = async (values: any, selectedDevice: DeviceConfig, selectedCommand: string) => {
        setButtonLoading(true)
        if (selectedCommand === "start")
            await mutation({
                variables: {
                    input: {
                        inputParameter: values,
                        scriptName: selectedCommand,
                        device: selectedDevice
                    }
                }
            })
        else if(selectedCommand === 'change') {
            await changeMutation({
                variables: {
                    input: {
                        inputParameter: values,
                        scriptName: selectedCommand,
                        device: selectedDevice
                    }
                }
            })
        }
        else
            await stopMutation({
                variables: {
                    input: {
                        inputParameter: values,
                        scriptName: selectedCommand,
                        device: selectedDevice
                    }
                }
            })
        setButtonLoading(false)
    }
    console.log(Array.from(Array(simTime + 1).keys()))
    const [chartData, setChartData] = useState([
        {
            marker: {
                color: 'rgb(16, 32, 77)'
            },
            type: 'scatter',
            x: Array.from(Array(simTime + 1).keys()),
            y: [6, 2, 3, 2]
        },
        {
            name: 'bar chart example',
            type: 'line',
            x: Array.from(Array(simTime + 1).keys()),
            y: [6, 2, 3, 1],
        }
    ])

    if (!devicesData)
        return <Page404/>

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6} md={6}>
                        <DashboardChart chartData={chartData} isLoading={isLoading} simTime={simTime} setChartData={setChartData}/>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <MainCard>
                            <ExperimentFormWrapper handleFormSubmit={handleSubmit} loading={buttonLoading} devices={devicesData!.devices!.data} setsimTime={setsimTime}/>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard

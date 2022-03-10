import React, { useState, useEffect, useContext } from 'react'

// MUI
import { Grid } from '@mui/material'


// constants
import { gridSpacing } from 'assets/constants'
import DashboardChart from './DashboardChart'
import { useRunScriptMutation, useGetDevicesQuery, DeviceConfig, useStopScriptMutation, useChangeScriptMutation } from "generated/graphql"
import Page404 from "views/pages/Page404"
import ExperimentFormWrapper from './ExperimentFormWrapper'
import MainCard from 'ui-components/cards/MainCard'
import { GraphContext, SimulationTimeContext } from 'App'

const Dashboard = () => {
    const { simTime, setSimTime } = useContext(SimulationTimeContext)
    const { chartData, setChartData } = useContext(GraphContext) 
    const [isLoading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const { data: devicesData, loading: devicesLoading, error: devicesError } = useGetDevicesQuery()

    const [mutation, { data, loading, error }] = useRunScriptMutation()
    const [stopMutation, { data: stopData, loading: stopLoading, error: stopError }] = useStopScriptMutation()
    const [changeMutation, {data: changeData, loading: changeLoading, error: changeError}] = useChangeScriptMutation()

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

    if (!devicesData)
        return <Page404/>

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6} md={6}>
                        <DashboardChart chartData={chartData} isLoading={isLoading} setChartData={setChartData} simTime={simTime}/>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <MainCard>
                            <ExperimentFormWrapper handleFormSubmit={handleSubmit} loading={buttonLoading} devices={devicesData!.devices!.data} setSimTime={setSimTime} simTime={simTime}/>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard

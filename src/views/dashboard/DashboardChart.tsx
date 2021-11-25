import React, { useEffect, useState } from 'react'

import { Grid, TextField, Typography, MenuItem } from '@mui/material'

import { gridSpacing } from '../../assets/constants'
import MainCard from '../../ui-components/cards/MainCard'
import Chart from 'react-apexcharts';


interface Props {
    chartData: any,
    isLoading: boolean
}

const DashboardChart = ({chartData, isLoading}: Props) => {
    const [updatedData, setUpdatedData] = useState(chartData);
    useEffect(() => {
        const newChartData = {
            ...chartData.options
        };
        
        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`line-chart`, 'updateOptions', newChartData);  
        }

        //@ts-ignore
        window.Echo.channel('channel').listen(
            'DataBroadcaster',
            (e: any) => {
                console.log(e);
                if (e.hello) {
                    chartData.series[0].data = [...chartData.series[0].data, e.hello] as any
                    ApexCharts.exec(`line-chart`, 'updateSeries', [...chartData.series], true);
                } else {
                    setUpdatedData(chartData)
                }
            }
        )        
    }, [isLoading, chartData]);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="subtitle2">Total Growth</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h3">$2,324.00</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <Grid item>
                            <TextField
                                id="standard-select-currency"
                                select
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            >
                                {status.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Chart {...updatedData} />
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default DashboardChart

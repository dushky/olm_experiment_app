import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'

import { gridSpacing } from 'assets/constants'
import MainCard from 'ui-components/cards/MainCard'
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
                    <Chart {...updatedData} />
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default DashboardChart

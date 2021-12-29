import React, { useState, useEffect } from 'react'

// MUI
import { Grid } from '@mui/material'


// constants
import { gridSpacing } from 'assets/constants'
import DashboardChart from './DashboardChart'
import { useRunScriptMutation, useGetDevicesQuery } from "generated/graphql"
import ExperimentForm from './ExperimentForm'
import Page404 from "views/pages/Page404"
import ExperimentFormWrapper from './ExperimentFormWrapper'
import MainCard from 'ui-components/cards/MainCard'

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const { data: devicesData, loading: devicesLoading, error: devicesError } = useGetDevicesQuery()

    const [mutation, { data, loading, error }] = useRunScriptMutation({
        variables: {
            'input': "test"
        }
    });
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

    const handleSubmit = async () => {
        setButtonLoading(true)
        //await mutation()
        setButtonLoading(false)
    }

    const chartData = {
        height: 480,
        type: 'line',
        options: {
            chart: {
                id: 'line-chart',
                stacked: true,
                toolbar: {
                    show: true
                }
            },
            responsive: [
                {
                    breakpoint: 767,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            xaxis: {
                type: 'category',
                categories: [...Array.from({ length: 31 }, (v, i) => i.toString())]
            },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        },
        series: [
            series
        ]
    };

    if (!devicesData)
        return <Page404/>

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6} md={6}>
                        <DashboardChart chartData={chartData} isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <MainCard>
                            <ExperimentFormWrapper handleFormSubmit={handleSubmit} loading={buttonLoading} devices={devicesData!.devices!.data}/>
                        </MainCard>
                        {/* TODO: Component which render form */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard

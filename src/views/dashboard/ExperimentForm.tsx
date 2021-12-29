import React, { useState } from 'react'
import { useFormik } from 'formik'


// mui
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import { LoadingButton } from '@mui/lab'
import { ConfigInput, ConfigMapTuple, DeviceDataFragment, useGetDeviceConfigQuery } from 'generated/graphql'
import { Grid, Typography } from '@mui/material'
import { gridSpacing, Update } from 'assets/constants'
import CellDropdown from 'views/device/CellDropdown'

import { buildForm } from "./ExperimentFormBuilder"


interface Props {
    handleFormSubmit: () => void
    loading: boolean
    devices: DeviceDataFragment[]
    selected: ConfigInput
    setSelected: ({}: ConfigInput) => any
    data: any
}

const ExperimentForm = (props: Props) => {
    const { 
        handleFormSubmit: handleSubmit, 
        loading: buttonLoading, 
        devices, 
        selected, 
        setSelected,
        data 
    } = props

    const formik = useFormik({
        initialValues: {
          reg_request: '',
          input_fan: '',
          input_lamp: '',
          input_led: '',
          t_sim: '',
          s_rate: '',
          uploaded_file: '',
          user_function: ''
        },
        onSubmit: (values, {resetForm}) => {
            console.log("ON SUBMIT: ", values);
            
            //handleSubmit(values)
            resetForm()
        }
      });

    const [selectedCommand, setSelectedCommand] = useState(0)

    
    
    const filterDevices = (): Update[] => {
        return devices.map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        })
    }

    const filterCommands = (): Update[]=> {
        return data.map((item: any, index: number) => {
            return {
                id: index,
                name: item.scriptName
            }
        })
    }

    const onDeviceChanged = (e: any) => {
        let dev = devices.filter((item) => item.id == e.target.value)[0]
        setSelected({
            deviceName: dev.deviceType.name as any,
            software: dev.software[0].name as any
        })
    }

    const onCommandChanged = (e: any) => {
        setSelectedCommand(e.target.value)
    }

    const buildFormik = () => {
        return data[selectedCommand].items.map((item: any) => {
            return buildForm(item, formik)
        })
    }

    return (
        <div>
            <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                Start experiment
            </Typography>
            <form onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={4} md={4}>
                        <CellDropdown
                            options={filterDevices()}
                            multiple={false}
                            label='Pick device'
                            change={onDeviceChanged}
                            selectedValue={{id: "", name: ""}}
                            selectName='device'
                        />
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <CellDropdown
                            options={filterCommands()}
                            multiple={false}
                            label='Pick command'
                            change={onCommandChanged}
                            selectedValue={{id: "", name: ""}}
                            selectName='command'
                        />
                    </Grid>
                    {buildFormik()}
                    <Grid item xs={4} md={4} margin="auto">
                        <LoadingButton
                            loading={buttonLoading}
                            loadingPosition="start"
                            startIcon={<PlayCircleFilledOutlinedIcon />}
                            variant="contained"
                            type='submit'
                            //onClick={handleSubmit}
                        > 
                            Run experiment
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default ExperimentForm

import React from 'react'
import { useFormik } from 'formik'
import { deviceTypeSchema } from 'assets/validation-schemas/index'

// mui
import { TextField, Button, Grid, Typography } from '@mui/material'
import { DeviceDataFragment, DeviceTypeDataFragment, SoftwareDataFragment } from 'generated/graphql'
import CellDropdown from './CellDropdown'
import { Update, gridSpacing } from "assets/constants"

import MainCard from "ui-components/cards/MainCard"

interface Props {
    handleSubmit: () => void,
    device: DeviceDataFragment,
    software: SoftwareDataFragment[],
    deviceTypes: DeviceTypeDataFragment[]
}

const DeviceDetail = ({device, handleSubmit, software, deviceTypes}: Props) => {
    const formik = useFormik({
        initialValues: {
          name: device.name,
          port: device.port,
          deviceType: device.deviceType.id,
          software: device.software.map((item) => item.id)
        },
        validationSchema: deviceTypeSchema,
        onSubmit: (values, {resetForm}) => {
            console.log(values);
            
            // handleSubmit(values.name)
            resetForm()
        }
    });

    const filterDeviceTypes = (): Update[] => {
        return deviceTypes.map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        })
    }

    const filterSoftware = (): Update[] => {
        return software.map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        })
    }

    const getSelectedDeviceType = (): Update => {
        return {
            id: device.deviceType.id,
            name: device.deviceType.name
        }
    }

    const getSelectedSoftware = (): Update[] => {
        return device.software.map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        })
    }

    return (
        <MainCard>
            <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                Edit Device
            </Typography>
            <form onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6} md={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Device type name"
                            placeholder="Device type name"
                            margin="dense"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                            fullWidth
                            id="port"
                            name="port"
                            label="Device port"
                            placeholder="Device port"
                            margin="dense"
                            value={formik.values.port}
                            onChange={formik.handleChange}
                            error={formik.touched.port && Boolean(formik.errors.port)}
                            helperText={formik.touched.port && formik.errors.port}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <CellDropdown 
                            options={filterDeviceTypes()} 
                            selectedValue={getSelectedDeviceType()} 
                            multiple={false} 
                            label="Device type"
                            selectName="deviceType"
                            change={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <CellDropdown 
                            options={filterSoftware()} 
                            selectedValue={getSelectedSoftware()} 
                            multiple={true} 
                            label="Software"
                            selectName="software"
                            change={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={4} md={2} margin="auto">
                        <Button color="primary"  variant="contained" fullWidth type="submit">
                            Edit device
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    )
}

export default DeviceDetail

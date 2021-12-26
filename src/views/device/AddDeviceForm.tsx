import React from 'react'
import { useFormik } from 'formik'
import { deviceTypeSchema } from 'assets/validation-schemas/index'

// mui
import { TextField, Button, Grid, Select, InputLabel, MenuItem, Typography } from '@mui/material'

// graphql
import { DeviceTypeDataFragment, SoftwareDataFragment } from "generated/graphql"



interface Props {
    handleSubmit: (value: any) => Promise<void>,
    software: SoftwareDataFragment[],
    deviceTypes: DeviceTypeDataFragment[]
}

const AddDeviceForm = ({handleSubmit, deviceTypes, software}: Props) => {
    const formik = useFormik({
        initialValues: {
          name: '',
          port: '',
          device_type_id: '',
          software: []
        },
        validationSchema: deviceTypeSchema,
        onSubmit: (values, {resetForm}) => {
            handleSubmit(values)
            resetForm()
        }
      });


    return (
        <div>
            <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                Add Device
            </Typography>
            <form onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
                <Grid container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={6} md={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Device name"
                            placeholder="Device name"
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
                    <Grid item xs={12} md={12}>
                        <InputLabel id="deviceTypeLabel">Device Type</InputLabel>
                        <Select
                            labelId="deviceTypeLabel"
                            id="deviceType"
                            label="deviceType"
                            value={formik.values.device_type_id}
                            placeholder='DeviceType'
                            name='device_type_id'
                            onChange={formik.handleChange}
                            error={formik.touched.device_type_id && Boolean(formik.errors.device_type_id)}
                            fullWidth
                        >
                            {deviceTypes.map((type: DeviceTypeDataFragment) => {
                                return (<MenuItem value={type.id}>
                                        {type.name}
                                    </MenuItem>)
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <InputLabel id="software-label">Software</InputLabel>
                        <Select
                            labelId="software-label"
                            id="software"
                            multiple
                            label="software"
                            value={formik.values.software}
                            name='software'
                            onChange={formik.handleChange}
                            error={formik.touched.software && Boolean(formik.errors.software)}
                            fullWidth
                        >
                            {software.map((type: SoftwareDataFragment) => {
                                return (<MenuItem value={type.id}>
                                        {type.name}
                                    </MenuItem>)
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={6} md={6} margin="auto">
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Add device
                        </Button>
                    </Grid>
                </Grid>
                
                
            </form>
        </div>
    )
}

export default AddDeviceForm

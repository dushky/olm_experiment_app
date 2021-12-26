import React from 'react'
import { useFormik } from 'formik'
import { deviceTypeSchema } from 'assets/validation-schemas/index'

// mui
import { TextField, Button, Typography } from '@mui/material'

interface Props {
    handleSubmit: (value: string) => Promise<void>
}

const AddDeviceTypeForm = ({handleSubmit}: Props) => {
    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema: deviceTypeSchema,
        onSubmit: (values, {resetForm}) => {
            handleSubmit(values.name)
            resetForm()
        }
      });


    return (
        <div>
            <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                Add device type
            </Typography>
            <form onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
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
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Add device type
                </Button>
            </form>
        </div>
    )
}

export default AddDeviceTypeForm

import React from 'react'
import { useFormik } from 'formik'
import { softwareSchema } from 'assets/validation-schemas/index'

// mui
import { TextField, Button, Typography } from '@mui/material'

// graphql
interface Props {
    handleSubmit: (value: string) => Promise<void>
}

const AddSoftwareForm = ({handleSubmit}: Props) => {
    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema: softwareSchema,
        onSubmit: (values, {resetForm}) => {
            handleSubmit(values.name)
            resetForm()
        }
      });


    return (
        <div>
            <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
                Add software
            </Typography>
            <form onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Software name"
                    placeholder="Software name"
                    margin="dense"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Add software
                </Button>
            </form>
        </div>
    )
}

export default AddSoftwareForm

import { Grid, TextField, Button, InputLabel } from '@mui/material'
import { FormikHandlers } from 'formik'
import { ConfigItem } from 'generated/graphql'

const buildTextField = (params: ConfigItem, formik: any, index:number) => {
    return (
        <Grid item xs={4} md={4} key={index}>
            <TextField
                fullWidth
                id={params.name!}
                name={params.name!}
                label={params.title}
                placeholder={params.placeholder!}
                margin='dense'
                value={formik.values[params.name!] ?? ""}
                onChange={formik.handleChange}
                helperText={params.title}
            />
        </Grid>
    )
}

const buildSelectField = () => {
    return <div></div>
}

const buildCheckboxField = () => {
    return <div></div>
}

const buildFileField = (params: any, formik: any) => {
    return (<Grid item xs={4} md={4}>
        <InputLabel htmlFor="import-button">{params.title}</InputLabel>
        <Button
            variant="contained"
            component="label"
        >
        Upload File
        <input
            id={params.name!}
            name={params.name!}
            type="file"
            accept='.slx'
            value={formik.values[params.name!]}
            onChange={formik.handleChange}
            hidden
        />
        </Button>
    </Grid>)
}


export const buildForm = (param: ConfigItem, formik: any, index: number) => {
    switch(param.type) {
        case("text"):
            return buildTextField(param, formik, index)
        case("file"):
            return buildFileField(param, formik)
        case("select"):
            return buildSelectField()
        case("checkbox"):
            return buildCheckboxField()
        default: 
            return ""
    }
}

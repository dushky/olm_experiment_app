import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
   link: string
}

const LoginNoAccount = (props: Props) => {
    return (
        <Grid item xs={12}>
            <Grid item container direction="column" alignItems="center" xs={12}>
                <Typography
                    component={Link}
                    to={props.link}
                    variant="subtitle1"
                    sx={{ textDecoration: 'none' }}
                >
                    Don&apos;t have an account?
                </Typography>
            </Grid>
        </Grid>
    )
}

export default LoginNoAccount

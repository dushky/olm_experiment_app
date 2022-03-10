import React, { FormEvent, useState } from 'react'
//material-ui
import {
    Box,
    Divider,
    Grid
} from '@mui/material';

// graphql
import { LoginInput, useLoginMutation } from 'generated/graphql'
import { FetchResult } from '@apollo/client';

// components
import AuthWrapper1 from 'ui-components/wrappers/AuthWrapper'
import AuthCardWrapper from 'ui-components/wrappers/AuthCardWrapper'
// import LoginNoAccount from './LoginNoAccount'
import LoginForm from './LoginForm'
// import axios from 'axios';
import { useNavigate } from 'react-router';


const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)    
    const [user, setUser] = useState<LoginInput>({
        username: '',
        password: ''
    })

    const navigator = useNavigate()
    
    const [loginMutation, { data, loading, error }] = useLoginMutation()

    const handleSubmitForm = async (values: LoginInput) => {
        setIsSubmitting(true)
        setUser(values)
        loginMutation({
            variables: {
                login: values
            }
        }).then((value: FetchResult) => {
            localStorage.setItem('token', value?.data?.login?.access_token)
            navigator("/app/dashboard")
        }).catch((e: any) => {
            setIsSubmitting(false)
            console.log(e);
        })
    }

    return (
        <div>
            <AuthWrapper1>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container direction="column" justifyContent="center" spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                            >
                                                <LoginForm user={user} handleSubmitForm={handleSubmitForm} isSubmitting={isSubmitting} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </div>
    )
}

export default Login

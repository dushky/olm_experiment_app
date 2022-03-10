import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    username: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
})

export const softwareSchema = Yup.object().shape({
    name: Yup.string().max(255).required("Software name is required")
})

export const deviceTypeSchema = Yup.object().shape({
    name: Yup.string().max(255).required("DeviceType name is required")
})


import React from 'react'
import { useGetDevicesQuery, useGetDeviceTypesQuery, useGetSoftwareQuery } from 'generated/graphql'
import Page404 from 'views/pages/Page404'
import Device from '.'

interface Props {
    
}

const DeviceTypeWrapper = (props: Props) => {
    const { data, loading, error } = useGetDevicesQuery()
    const { data: softwareData, loading: softwareLoading, error: softwareError } = useGetSoftwareQuery()
    const { data: deviceTypeData, loading: deviceTypeLoading, error: deviceTypeError } = useGetDeviceTypesQuery()


    if (error || loading || !data || !softwareData || !deviceTypeData)
        return <Page404/>

    return (
        <Device device={data.devices!.data} software={softwareData!.software!.data} deviceTypes={deviceTypeData!.device_types!.data}/>
    )
}

export default DeviceTypeWrapper

import React from 'react'
import { useGetDevicesQuery, useGetDeviceTypesQuery, useGetSoftwareQuery } from 'generated/graphql'
import Page404 from 'views/pages/Page404'
import Device from '.'


const DeviceTypeWrapper = () => {
    const { data, loading, error } = useGetDevicesQuery({fetchPolicy: "no-cache"})
    const { data: softwareData, loading: softwareLoading, error: softwareError } = useGetSoftwareQuery({fetchPolicy: "no-cache"})
    const { data: deviceTypeData, loading: deviceTypeLoading, error: deviceTypeError } = useGetDeviceTypesQuery({fetchPolicy: "no-cache"})


    if (error || loading || !data || !softwareData || !deviceTypeData || softwareLoading || deviceTypeLoading)
        return <Page404/>

    return (
        <Device device={data.devices!.data} software={softwareData!.software!.data} deviceTypes={deviceTypeData!.device_types!.data} loading={loading}/>
    )
}

export default DeviceTypeWrapper

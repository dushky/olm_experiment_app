import React from 'react'
import { useGetDeviceTypesQuery } from 'generated/graphql'
import Page404 from 'views/pages/Page404'
import DeviceType from '.'

interface Props {
    
}

const DeviceTypeWrapper = (props: Props) => {
    const { data, loading, error } = useGetDeviceTypesQuery({fetchPolicy: "no-cache"})

    if (error || loading || !data)
        return <Page404/>

    return (
        <DeviceType deviceType={data.device_types!.data} />
    )
}

export default DeviceTypeWrapper

import React, { useState } from 'react'

import ExperimentForm from './ExperimentForm'

import { DeviceConfig, DeviceDataFragment, useGetDeviceConfigQuery } from 'generated/graphql'
import Page404 from 'views/pages/Page404'

interface Props {
    handleFormSubmit: (values: any, selectedDevice: DeviceConfig, selectedCommand: string) => Promise<void>
    devices: DeviceDataFragment[]
}

const ExperimentFormWrapper = ({handleFormSubmit, devices}: Props) => {
    const [selected, setSelected] = useState<DeviceConfig>({
        deviceName: "" as any,
        software: "" as any,
        deviceID: ''
    })

    const { data, loading: queryLoading, error } = useGetDeviceConfigQuery({
        variables: {
            configInput: {
                deviceName: selected.deviceName,
                software: selected.software
            }
        }
    })

    // if (loading) {
    //     return <Page404/>
    // }

    return (
        <ExperimentForm handleFormSubmit={handleFormSubmit} devices={devices} selected={selected} setSelected={setSelected} data={data?.GetConfigByDeviceType!.items} />
    )
}

export default ExperimentFormWrapper

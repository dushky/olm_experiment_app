import React, { useState } from 'react'


import { Update } from 'assets/constants'
import ExperimentForm from './ExperimentForm'

import { DeviceConfig, DeviceDataFragment, useGetDeviceConfigQuery } from 'generated/graphql'
import Page404 from 'views/pages/Page404'

interface Props {
    handleFormSubmit: (values: any, selectedDevice: DeviceConfig, selectedCommand: string) => Promise<void>
    loading: boolean
    devices: DeviceDataFragment[]
    setSimTime: (time: number) => void
    simTime: number
}

const ExperimentFormWrapper = ({handleFormSubmit, loading, devices, setSimTime, simTime}: Props) => {
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

    return (
        <ExperimentForm handleFormSubmit={handleFormSubmit} loading={loading} devices={devices} selected={selected} setSelected={setSelected} data={data?.GetConfigByDeviceType!.items} setSimTime={setSimTime} simTime={simTime}/>
    )
}

export default ExperimentFormWrapper

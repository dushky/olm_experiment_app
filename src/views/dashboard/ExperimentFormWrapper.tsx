import React, { useState } from 'react'


import { Update } from 'assets/constants'
import ExperimentForm from './ExperimentForm'

import { ConfigInput, DeviceDataFragment, useGetDeviceConfigQuery } from 'generated/graphql'
import Page404 from 'views/pages/Page404'

interface Props {
    handleFormSubmit: () => void
    loading: boolean
    devices: DeviceDataFragment[]
}

const ExperimentFormWrapper = ({handleFormSubmit, loading, devices}: Props) => {
    const [selected, setSelected] = useState<ConfigInput>({
        deviceName: "tos1a" as any,
        software: "matlab" as any
    })

    const { data, loading: queryLoading, error } = useGetDeviceConfigQuery({
        variables: {
            configInput: selected
        }
    })

    if (loading || !data) {
        return <Page404/>
    }

    return (
        <ExperimentForm handleFormSubmit={handleFormSubmit} loading={loading} devices={devices} selected={selected} setSelected={setSelected} data={data!.GetConfigByDeviceType!.items}/>
    )
}

export default ExperimentFormWrapper

import React from 'react'

import Software from '.'
import { useGetSoftwareQuery } from 'generated/graphql'
import Page404 from 'views/pages/Page404'


const SoftwareWrapper = () => {
    const { data, loading, error } = useGetSoftwareQuery();

    if (error || loading || !data)
        return <Page404/>

    return (
        <Software software={data!.software!.data!}/>
    )
}

export default SoftwareWrapper

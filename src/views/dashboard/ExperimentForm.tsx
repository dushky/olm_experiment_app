import React from 'react'

// mui
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import { LoadingButton } from '@mui/lab'


interface Props {
    handleFormSubmit: () => void
    loading: boolean
}

const ExperimentForm = (props: Props) => {
    const { handleFormSubmit: handleSubmit, loading: buttonLoading } = props
    return (
        <div>
            <LoadingButton
                loading={buttonLoading}
                loadingPosition="start"
                startIcon={<PlayCircleFilledOutlinedIcon />}
                variant="contained"
                onClick={handleSubmit}
            > 
                Run experiment
            </LoadingButton>
        </div>
    )
}

export default ExperimentForm

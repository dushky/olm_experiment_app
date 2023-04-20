import React, {memo, useRef, useState} from "react";
import { toast } from "react-toastify";
import {LoadingButton} from "@mui/lab";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import {
    useGetVideoStreamStatusQuery,
    useStartVideoStreamMutation, useStopVideoStreamMutation
} from "../../generated/graphql";
import StopCircleFilledOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import {LiveTv} from "@mui/icons-material";
type Props = {
    selectedDeviceId: string
    selectedDeviceName: string
}

const DashboardVideo: React.FC<Props> = ({selectedDeviceId, selectedDeviceName}: Props) => {

    const [loading, setLoading] = useState(false);
    const streamUrl = useRef((new URL(process.env.REACT_APP_API_ENDPOINT || "https://127.0.0.1")).origin + ":9000/stream");
    const { error,loading: videoStreamStatusLoading, data: videoStreamStatusData, refetch: videoStreamStatusRefetch } = useGetVideoStreamStatusQuery({
        variables: {
            deviceId: selectedDeviceId
        },
        fetchPolicy: "no-cache"
    });

    const [startVideoStreamMutation] = useStartVideoStreamMutation();
    const [stopVideoStreamMutation] = useStopVideoStreamMutation();

    const handleStartVideoStream = async () => {
        setLoading(true);
        await startVideoStreamMutation(
            {
                variables: {
                    deviceId: selectedDeviceId
                }
            }
        ).then(
            (values) => {
                if(!values.data?.startVideoStream.isRunning) {
                    toast.error(values.data?.startVideoStream.status);
                }
            }
        ).catch((error: Error) => {
            toast.error(error.message);
        }).finally(() => {
            videoStreamStatusRefetch().finally(() => {
                setLoading(false);
            })
        })
    }

    const handleStopVideoStream = async () => {
        setLoading(true);
        await stopVideoStreamMutation(
            {
                variables: {
                    deviceId: selectedDeviceId
                }
            }).then(
            (values) => {
                if (!values.data?.stopVideoStream.isStopped){
                    toast.error(values.data?.stopVideoStream.status);
                }
            }
            ).catch((error: Error) => {
                toast.error(error.message);
            }).finally(() => {
                videoStreamStatusRefetch().finally(() => {
                    setLoading(false);
                })
            })
    }

    return (
        <>
            {
                (videoStreamStatusData?.videoStreamStatus.isRunning) && (
                    <div>
                        <img src={streamUrl.current} width="100%" alt="experiment-stream"></img>
                        <LoadingButton
                            loading={loading || videoStreamStatusLoading}
                            fullWidth={true}
                            color={"error"}
                            onClick={handleStopVideoStream}
                            loadingPosition="start"
                            startIcon={<StopCircleFilledOutlinedIcon />}
                            variant="contained"
                        >
                            Stop video stream
                        </LoadingButton>
                    </div>
                ) || (
                    <div>
                        <div style={{width: "100%", aspectRatio: "4 / 3", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <LiveTv style={ { fontSize: 100} } />
                        </div>
                        <LoadingButton
                            loading={loading || videoStreamStatusLoading}
                            fullWidth={true}
                            onClick={handleStartVideoStream}
                            loadingPosition="start"
                            startIcon={<PlayCircleFilledOutlinedIcon />}
                            variant="contained"
                        >
                            Start video stream
                        </LoadingButton>
                    </div>
                )
            }

        </>
    );
};

export default memo(DashboardVideo);
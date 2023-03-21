import React, {memo, useRef, useState} from "react";
import ReactPlayer from "react-player";
import MainCard from "../../ui-components/cards/MainCard";
import {LoadingButton} from "@mui/lab";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import {
    useGetVideoStreamStatusQuery,
    useStartVideoStreamMutation, useStopVideoStreamMutation
} from "../../generated/graphql";
import axios from "axios";
import StopCircleFilledOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import {LiveTv} from "@mui/icons-material";
type Props = {

}

const DashboardVideo: React.FC<Props> = ({}: Props) => {
    const playerRef = useRef<ReactPlayer>(null);
    const [loading, setLoading] = useState(false);
    const [activeStream, setActiveStream] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const streamUrl = useRef((new URL(process.env.REACT_APP_API_ENDPOINT || "http://127.0.0.1")).origin + ":8080/hls/experiment.m3u8");
    const { error, data: videoStreamStatusData, refetch } = useGetVideoStreamStatusQuery()


    const [startVideoStreamMutation] = useStartVideoStreamMutation();
    const [stopVideoStreamMutation] = useStopVideoStreamMutation();

    const handleStartVideoStream = async () => {
        await startVideoStreamMutation().then(
            (values) => {
                setLoading(true);
                intervalRef.current = setInterval(() => {
                    axios.head(streamUrl.current).then((res) => {
                        refetch();
                        clearInterval(intervalRef.current as unknown as number)
                        setLoading(false);
                        setActiveStream(true);
                    }).catch((err) => {
                        console.log(err)
                    });
                }, 1000)
            }
        )
    }

    const handleStopVideoStream = async () => {
        setLoading(true);
        await stopVideoStreamMutation().then(
            (values) => {
                setLoading(false);
                if (values.data?.stopVideoStream.isStopped){
                    refetch();
                    setActiveStream(false)
                }
            }
        )
    }

    return (
        <MainCard>
            {
                (activeStream || videoStreamStatusData?.videoStreamStatus.isRunning) && (
                    <div>
                        <ReactPlayer
                            url={streamUrl.current}
                            ref={playerRef}
                            muted={true}
                            width="100%"
                            playing={true}
                            controls={true}
                            height="auto"
                            config={
                                {
                                    file: {
                                        forceHLS: true,
                                        forceSafariHLS: true,
                                        hlsOptions: {
                                            maxLoadingDelay: 4,
                                            minAutoBitrate: 0,
                                            lowLatencyMode: true,
                                            enableWorker: true
                                        }

                                    }
                                }
                            }
                        />
                        <LoadingButton
                            loading={loading}
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
                        <div style={{width: "100%", aspectRatio: "16 / 9", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <LiveTv style={ { fontSize: 100} } />
                        </div>
                        <LoadingButton
                            loading={loading}
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

        </MainCard>
    );
};

export default memo(DashboardVideo);
import React, {useState} from "react";

// MUI
import {Grid, CircularProgress, Collapse, Alert, AlertTitle} from "@mui/material";

// constants
import { gridSpacing } from "assets/constants";
import DashboardChart from "./DashboardChart";
import {
  useRunScriptMutation,
  useGetDevicesQuery,
  DeviceConfig,
  useStopScriptMutation,
  useChangeScriptMutation,
  useGetDeviceReservationStatusQuery,
  useGetCameraStatusQuery,
} from "generated/graphql";
import ExperimentFormWrapper from "./ExperimentFormWrapper";
import MainCard from "ui-components/cards/MainCard";
import { toast } from "react-toastify";
import DashboardVideo from "./DashboardVideo";

const DEVICE_RESERVATION_CHECK = 5000;

const Dashboard = () => {
  const [, setButtonLoading] = useState(false);
  const { data: devicesData } = useGetDevicesQuery({
    fetchPolicy: "cache-and-network",
  });

  const [experimentId, setExperimentId] = useState<string | undefined>(undefined);
  const [selectedDeviceName, setSelectedDeviceName] = useState<string | undefined>(undefined);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined);
  const [selectedSoftwareName, setSelectedSoftwareName] = useState<string | undefined>(undefined);

  const { data: cameraStatusData} = useGetCameraStatusQuery({
    variables: {
      deviceId: selectedDeviceId as string
    },
    fetchPolicy: "no-cache"
  });

  const { loading, error, data } = useGetDeviceReservationStatusQuery({
    variables: {
      deviceId: selectedDeviceId as string
    },
    pollInterval: DEVICE_RESERVATION_CHECK,
  })

  const [mutation] = useRunScriptMutation();
  const [stopMutation] = useStopScriptMutation();
  const [changeMutation] = useChangeScriptMutation();

  const handleSubmit = async (
    values: any,
    selectedDevice: DeviceConfig,
    selectedCommand: string
  ) => {
    if (!selectedCommand) {
      toast("Select command to run");
      return;
    }
    setButtonLoading(true);
    if (selectedCommand === "start" || selectedCommand === "startLocal")
      await mutation({
        variables: {
          input: {
            inputParameter: values,
            scriptName: selectedCommand,
            fileName: "",
            device: selectedDevice,
          },
        },
      }).then((values) => {
        setExperimentId(values?.data?.RunScript?.experimentID)
      });
    else if (selectedCommand === "change") {
      await changeMutation({
        variables: {
          input: {
            inputParameter: values,
            scriptName: selectedCommand,
            device: selectedDevice,
            experimentID: experimentId,
          },
        },
      });
    } else
      await stopMutation({
        variables: {
          input: {
            inputParameter: values,
            scriptName: selectedCommand,
            device: selectedDevice,
            experimentID: experimentId,
          },
        },
      });
    setButtonLoading(false);
  };

  if (!devicesData) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Collapse in={data?.getDevice.is_reserved}>
          <Alert severity="error">
            <AlertTitle><strong>WARNING: Selected device is currently reserved by user on central server</strong></AlertTitle>
            When the experiment is running, it is possible to view its progress by selecting the parameters in the graph or selecting the software that selects the default parameters
          </Alert>
        </Collapse>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={6} md={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <DashboardChart
                    selectedSoftwareName={selectedSoftwareName}
                    selectedDeviceName={selectedDeviceName}
                />
              </Grid>
              {selectedDeviceId !== undefined
                  && selectedDeviceName !== undefined
                  && cameraStatusData?.cameraStatus.isConnected && (
                  <Grid item xs={12}>
                      <DashboardVideo selectedDeviceId={selectedDeviceId} selectedDeviceName={selectedDeviceName}/>
                  </Grid>
              )
              }
            </Grid>

          </Grid>
          <Grid item xs={6} md={6}>
            <MainCard>
              <ExperimentFormWrapper
                handleFormSubmit={handleSubmit}
                devices={devicesData!.devices!.data}
                setSelectedSoftwareName={setSelectedSoftwareName}
                setSelectedDeviceName={setSelectedDeviceName}
                setSelectedDeviceId={setSelectedDeviceId}
              />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

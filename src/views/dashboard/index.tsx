import React, { useState } from "react";

// MUI
import { Grid } from "@mui/material";

// constants
import { gridSpacing } from "assets/constants";
import DashboardChart from "./DashboardChart";
import {
  useRunScriptMutation,
  useGetDevicesQuery,
  DeviceConfig,
  useStopScriptMutation,
  useChangeScriptMutation,
} from "generated/graphql";
import Page404 from "views/pages/Page404";
import ExperimentFormWrapper from "./ExperimentFormWrapper";
import MainCard from "ui-components/cards/MainCard";

export interface MyWindow extends Window {
  experimentId: string | undefined;
  selectedDeviceName: string | undefined;
}

declare var window: MyWindow;

const Dashboard = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { data: devicesData } = useGetDevicesQuery({
    fetchPolicy: "cache-and-network",
  });

  const [mutation] = useRunScriptMutation();
  const [stopMutation] = useStopScriptMutation();
  const [changeMutation] = useChangeScriptMutation();

  const handleSubmit = async (
    values: any,
    selectedDevice: DeviceConfig,
    selectedCommand: string
  ) => {
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
        window.experimentId = values?.data?.RunScript?.experimentID;
      });
    else if (selectedCommand === "change") {
      await changeMutation({
        variables: {
          input: {
            inputParameter: values,
            scriptName: selectedCommand,
            device: selectedDevice,
            experimentID: window.experimentId,
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
            experimentID: window.experimentId,
          },
        },
      });
    setButtonLoading(false);
  };

  if (!devicesData) {
    return <Page404 />;
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={6} md={6}>
            <DashboardChart />
          </Grid>
          <Grid item xs={6} md={6}>
            <MainCard>
              <ExperimentFormWrapper
                handleFormSubmit={handleSubmit}
                devices={devicesData!.devices!.data}
              />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

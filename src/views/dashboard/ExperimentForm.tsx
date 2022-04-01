import React, { useState } from "react";
import { useFormik } from "formik";

// mui
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import { LoadingButton } from "@mui/lab";
import {
  DeviceConfig,
  DeviceDataFragment,
  SoftwareDataFragment,
  useGetDeviceByIdQuery,
} from "generated/graphql";
import { Grid, Typography } from "@mui/material";
import { gridSpacing, Update } from "assets/constants";
import CellDropdown from "views/device/CellDropdown";

import { buildForm } from "./ExperimentFormBuilder";
import { MyWindow } from ".";

interface Props {
  handleFormSubmit: (
    values: any,
    configInput: DeviceConfig,
    selectedCommand: string
  ) => Promise<void>;
  devices: DeviceDataFragment[];
  selected: DeviceConfig;
  setSelected: (selected: any) => any;
  data: any;
}

declare var window: MyWindow;

const ExperimentForm = (props: Props) => {
  const {
    handleFormSubmit: handleSubmit,
    devices,
    selected,
    setSelected,
    data,
  } = props;
  const formik = useFormik({
    initialValues: {
      reg_request: "",
      input_fan: "",
      input_lamp: "",
      input_led: "",
      t_sim: "",
      s_rate: "",
      uploaded_file: "",
      user_function: "",
    },
    onSubmit: async (values) => {
      let vals = "";
      Object.entries(values).map(([key, value], index) => {
        if (value) {
          if (vals === "") {
            vals = vals + key + ":" + value;
          } else {
            vals = vals + "," + key + ":" + value;
          }
        }
      });

      let command = data.filter(
        (item: any, index: number) => index === selectedCommand
      )[0];

      await handleSubmit(vals, selected, command.scriptName);
    },
  });

  const [selectedCommand, setSelectedCommand] = useState(0);

  const { data: deviceData } = useGetDeviceByIdQuery({
    variables: {
      input: selected.deviceID,
    },
  });

  const filterDevices = (): Update[] => {
    return devices.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
  };

  const filterCommands = (): Update[] => {
    if (data) {
      return data.map((item: any, index: number) => {
        return {
          id: index,
          name: item.scriptName,
        };
      });
    }
    return [];
  };

  const filterSoftware = (software: SoftwareDataFragment[]): Update[] => {
    return software.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
  };

  const onDeviceChanged = (e: any) => {
    let dev = devices.filter((item) => item.id === e.target.value)[0];
    //@ts-ignore
    window.Echo.connector.channels = {};
    window.selectedDeviceName = dev.name as string;
    setSelected({
      deviceName: dev.deviceType.name as any,
      software: "",
      deviceID: dev.id,
    });
  };

  const onSoftwareChanged = (e: any) => {
    let software = deviceData?.getDevice.software.filter(
      (item) => item.id === e.target.value
    )[0];
    setSelected({
      ...selected,
      software: software?.name,
    });
  };

  const onCommandChanged = (e: any) => {
    setSelectedCommand(e.target.value);
  };

  const buildFormik = () => {
    if (data && data[selectedCommand])
      return data[selectedCommand].items.map((item: any, index: number) => {
        return buildForm(item, formik, index);
      });
  };

  const buildCommandsSelect = () => {
    if (data) {
      return (
        <Grid item xs={4} md={4}>
          <CellDropdown
            options={filterCommands()}
            multiple={false}
            label="Pick command"
            change={onCommandChanged}
            selectedValue={{ id: "", name: "" }}
            selectName="command"
          />
        </Grid>
      );
    }
  };

  const buildSoftwareSelect = () => {
    if (deviceData?.getDevice.software) {
      return (
        <Grid item xs={4} md={4}>
          <CellDropdown
            options={filterSoftware(deviceData.getDevice.software)}
            multiple={false}
            label="Pick software"
            change={onSoftwareChanged}
            selectedValue={{ id: "", name: "" }}
            selectName="software"
          />
        </Grid>
      );
    }
  };

  return (
    <div>
      <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
        Start experiment
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={4} md={4}>
            <CellDropdown
              options={filterDevices()}
              multiple={false}
              label="Pick device"
              change={onDeviceChanged}
              selectedValue={{ id: "", name: "" }}
              selectName="device"
            />
          </Grid>
          {buildSoftwareSelect()}
          {buildCommandsSelect()}
          {buildFormik()}
          <Grid item xs={4} md={4} margin="auto">
            <LoadingButton
              loadingPosition="start"
              startIcon={<PlayCircleFilledOutlinedIcon />}
              variant="contained"
              type="submit"
            >
              Run experiment
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ExperimentForm;

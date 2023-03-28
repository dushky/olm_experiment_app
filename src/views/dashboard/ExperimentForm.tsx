import React, {useEffect, useState} from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  setSelectedSoftwareName: (softwareName: string | undefined) => void;
  setSelectedDeviceName: (deviceName: string | undefined) => void;
  setSelectedDeviceId: (deviceId: string | undefined) => void;

}

const ExperimentForm = (props: Props) => {
  const {
    handleFormSubmit: handleSubmit,
    devices,
    selected,
    setSelected,
    data,
    setSelectedSoftwareName,
    setSelectedDeviceName,
    setSelectedDeviceId
  } = props;

  const [selectedCommand, setSelectedCommand] = useState(undefined);

  const [initialValues, setInitialValues] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    let initValues: { [key: string]: any } = {};
    if (data && data[selectedCommand ?? 0].items.length) {
      data[selectedCommand ?? 0].items.forEach(
          (item: any, index: number) => {
            initValues[item.name!] = item.placeholder!
          }
      );
    }
    setInitialValues(initValues)
  }, [selectedCommand]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (selectedCommand === undefined) {
        toast("Select command to run experiment");
        return;
      }
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

      toast.promise(handleSubmit(vals, selected, command.scriptName), {
        pending: "Sending request to API",
        success: "Success",
        error: "Error check console for more info",
      });
    },
  });
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
    setSelectedDeviceName(dev.name as string);
    setSelectedDeviceId(dev.id);
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
    setSelectedSoftwareName(software?.name);
    setSelected({
      ...selected,
      software: software?.name,
    });
  };

  const onCommandChanged = (e: any) => {
    setSelectedCommand(e.target.value);
  };

  const buildFormik = () => {
    if (data && data[selectedCommand ?? 0])
      return data[selectedCommand ?? 0].items.map(
        (item: any, index: number) => {
          return buildForm(item, formik, index);
        }
      );
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
            selectedValue={undefined}
            selectName="command"
            id="command"
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
            id="software"
            change={onSoftwareChanged}
            selectedValue={undefined}
            selectName="software"
          />
        </Grid>
      );
    }
  };

  const buildRunExperimentButton = () => {
    if (selectedCommand != undefined) {
      return (
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
              selectedValue={undefined}
              selectName="device"
              id="device"
            />
          </Grid>
          {buildSoftwareSelect()}
          {buildCommandsSelect()}
          {buildFormik()}
          {buildRunExperimentButton()}
        </Grid>
      </form>
    </div>
  );
};

export default ExperimentForm;

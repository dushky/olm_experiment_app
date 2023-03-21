import React, { useState } from "react";

import ExperimentForm from "./ExperimentForm";

import {
  DeviceConfig,
  DeviceDataFragment,
  useGetDeviceConfigQuery,
} from "generated/graphql";

interface Props {
  handleFormSubmit: (
    values: any,
    selectedDevice: DeviceConfig,
    selectedCommand: string,
  ) => Promise<void>;
  devices: DeviceDataFragment[];
  setSelectedSoftwareName: (softwareName: string | undefined) => void
  setSelectedDeviceName: (deviceName: string | undefined) => void
  setSelectedDeviceId: (deviceId: string | undefined) => void
}

const ExperimentFormWrapper = ({ handleFormSubmit, devices, setSelectedSoftwareName, setSelectedDeviceName, setSelectedDeviceId }: Props) => {
  const [selected, setSelected] = useState<DeviceConfig>({
    deviceName: "" as any,
    software: "" as any,
    deviceID: "",
  });

  const { data } = useGetDeviceConfigQuery({
    variables: {
      configInput: {
        deviceName: selected.deviceName,
        software: selected.software,
      },
    },
  });

  return (
    <ExperimentForm
      handleFormSubmit={handleFormSubmit}
      devices={devices}
      selected={selected}
      setSelected={setSelected}
      data={data?.GetConfigByDeviceType!.items}
      setSelectedSoftwareName={setSelectedSoftwareName}
      setSelectedDeviceName={setSelectedDeviceName}
      setSelectedDeviceId={setSelectedDeviceId}
    />
  );
};

export default ExperimentFormWrapper;

import React from "react";
import {
  useGetDevicesQuery,
  useGetDeviceTypesQuery,
  useGetSoftwareQuery,
} from "generated/graphql";
import Device from ".";
import { CircularProgress } from "@mui/material";

const DeviceTypeWrapper = () => {
  const { data, loading, error } = useGetDevicesQuery({
    fetchPolicy: "no-cache",
  });
  const { data: softwareData, loading: softwareLoading } = useGetSoftwareQuery({
    fetchPolicy: "no-cache",
  });
  const { data: deviceTypeData, loading: deviceTypeLoading } =
    useGetDeviceTypesQuery({ fetchPolicy: "no-cache" });

  if (
    error ||
    loading ||
    !data ||
    !softwareData ||
    !deviceTypeData ||
    softwareLoading ||
    deviceTypeLoading
  )
    return <CircularProgress />;

  return (
    <Device
      device={data.devices!.data}
      software={softwareData!.software!.data}
      deviceTypes={deviceTypeData!.device_types!.data}
      loading={loading}
    />
  );
};

export default DeviceTypeWrapper;

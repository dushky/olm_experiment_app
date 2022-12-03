import React from "react";
import { useGetDeviceTypesQuery } from "generated/graphql";
import DeviceType from ".";
import { CircularProgress } from "@mui/material";

interface Props {}

const DeviceTypeWrapper = (props: Props) => {
  const { data, loading, error } = useGetDeviceTypesQuery({
    fetchPolicy: "no-cache",
  });

  if (error || loading || !data) return <CircularProgress />;

  return <DeviceType deviceType={data.device_types!.data} />;
};

export default DeviceTypeWrapper;

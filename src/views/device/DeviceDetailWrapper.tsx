import React from "react";
import {
  useGetDeviceByIdQuery,
  useGetSoftwareQuery,
  useGetDeviceTypesQuery,
  useUpdateDeviceMutation,
  UpdateDevice,
} from "generated/graphql";
import { useParams } from "react-router";
import DeviceDetail from "./DeviceDetail";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

interface Props {}

const DeviceDetailWrapper = (props: Props) => {
  const param = useParams();

  const { data, loading, error } = useGetDeviceByIdQuery({
    variables: {
      input: param.id as string,
    },
  });

  const [mutation] = useUpdateDeviceMutation();
  const handleSubmit = (values: UpdateDevice) => {
    toast.promise(
      mutation({
        variables: {
          input: values,
        },
      }),
      {
        pending: "Editing device",
        success: "Device updated",
        error: "An error has been detected",
      }
    );
  };

  const { data: softwareData } = useGetSoftwareQuery();
  const { data: deviceTypeData } = useGetDeviceTypesQuery();

  if (error || loading || !data || !softwareData || !deviceTypeData)
    return <CircularProgress />;

  return (
    <DeviceDetail
      handleSubmit={handleSubmit}
      device={data.getDevice}
      software={softwareData.software!.data}
      deviceTypes={deviceTypeData.device_types!.data}
    />
  );
};

export default DeviceDetailWrapper;

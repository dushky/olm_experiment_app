import React from "react";

import Software from ".";
import { useGetSoftwareQuery } from "generated/graphql";
import { CircularProgress } from "@mui/material";

const SoftwareWrapper = () => {
  const { data, loading, error } = useGetSoftwareQuery({
    fetchPolicy: "no-cache",
  });

  if (error || loading || !data) return <CircularProgress />;

  return <Software software={data!.software!.data!} />;
};

export default SoftwareWrapper;

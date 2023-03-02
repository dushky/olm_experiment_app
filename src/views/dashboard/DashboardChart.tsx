import React, {useCallback, useEffect, useRef} from "react";

import {Grid} from "@mui/material";

import {gridSpacing} from "assets/constants";
import MainCard from "ui-components/cards/MainCard";
import PlotlyChart from "react-plotlyjs-ts";
import {LegendClickEvent} from "plotly.js";
import {useFormContext} from "react-hook-form";
import {findVisibilityOfAxis} from "./ChartHelpers";
import {toast} from "react-toastify";
import {WsResponse} from "../../types";

interface Props {
  selectedSoftwareName: string | undefined
  selectedDeviceName: string | undefined
}

const DashboardChart: React.FC<Props> = ({selectedSoftwareName, selectedDeviceName}: Props) => {

  const { watch, setValue } = useFormContext();
  const watchValue = watch();
  const showDefaultVisibility = useRef(true);

  const createChartObject = useCallback(
      (name: string, defaultVisibilityFor: string[], data: any, time: any) => {
        const watchValue = watch();
        return {
          name: name,
          type: "line",
          x: time,
          y: data,
          visible: findVisibilityOfAxis(
              name,
              defaultVisibilityFor,
              showDefaultVisibility.current,
              selectedSoftwareName,
              watchValue?.chartData),
        };
      },
      [selectedSoftwareName],
  );

  useEffect(() => {
    if (selectedDeviceName) {
      //@ts-ignore
      window.Echo.channel(selectedDeviceName).listen(
        "DataBroadcaster",
        (e: WsResponse) => {
          if (e.error) {
            toast("An error has detected, check console for more info");
            return;
          } else if (e.data) {
            const time = e.data[0].name.toLowerCase() === 'timestamp'
                ? e.data?.shift()?.data.map((timestamp: string) => parseFloat(timestamp))
                : Array.from(Array(e.data[0].data).keys()).map((i) => i);

            setValue("chartData", e.data.map((item,) => createChartObject(item.name, item.defaultVisibilityFor, item.data, time)));
          }
        }
      );
    }

    return () => {
        //@ts-ignore
        window.Echo.channel(selectedDeviceName ?? 'channel').stopListening('DataBroadcaster')
        //@ts-ignore
        window.Echo.leaveChannel(selectedDeviceName ?? 'channel')
    }

  }, [selectedDeviceName, selectedSoftwareName]);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <PlotlyChart
            data={watchValue?.chartData}
            onLegendClick={(e: LegendClickEvent) => {
              setValue("chartData", e?.data);
              showDefaultVisibility.current = false
              return true;
            }}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default DashboardChart;

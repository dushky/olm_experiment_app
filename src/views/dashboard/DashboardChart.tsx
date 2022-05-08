import React, { useContext, useEffect } from "react";

import { Grid } from "@mui/material";

import { gridSpacing } from "assets/constants";
import MainCard from "ui-components/cards/MainCard";
import PlotlyChart from "react-plotlyjs-ts";
import { MyWindow } from "./index";
import { LegendClickEvent } from "plotly.js";
import { useFormContext } from "react-hook-form";
import { findVisibilityOfAxis } from "./ChartHelpers";

interface Props {}
declare var window: MyWindow;

let time: any = [];
const DashboardChart = (props: Props) => {
  const { watch, setValue } = useFormContext();
  const watchValue = watch();

  const createChartObject = (name: string, data: any, time: any) => {
    const watchValue = watch();
    return {
      name: name,
      type: "line",
      x: time,
      y: data,
      visible: findVisibilityOfAxis(name, watchValue?.chartData),
    };
  };

  useEffect(() => {
    if (window.selectedDeviceName) {
      //@ts-ignore
      window.Echo.channel(window.selectedDeviceName).listen(
        "DataBroadcaster",
        (e: any) => {
          console.log("EVENT: ", e);
          if (e.error) {
            console.log("ERROR: ", e.error);
            return;
          } else if (e.data) {
            let newArray: any = [];
            e.data.map((item: any, index: number) => {
              if (index === 0) {
                let parsedData = item.data.map((itemData: string) =>
                  parseFloat(itemData)
                );
                time = parsedData;
              } else {
                let parsedData = item.data.map((itemData: string) =>
                  parseFloat(itemData)
                );
                newArray = [
                  ...newArray,
                  createChartObject(item.name, parsedData, time),
                ];
              }
            });
            setValue("chartData", newArray);
          }
        }
      );
    }
  }, [window.selectedDeviceName]);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <PlotlyChart
            data={watchValue?.chartData}
            onLegendClick={(e: LegendClickEvent) => {
              setValue("chartData", e?.data);
              return true;
            }}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default DashboardChart;

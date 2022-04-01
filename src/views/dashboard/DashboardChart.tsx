import React, { useContext, useEffect } from "react";

import { Grid } from "@mui/material";

import { gridSpacing } from "assets/constants";
import MainCard from "ui-components/cards/MainCard";
import PlotlyChart from "react-plotlyjs-ts";
import { GraphContext } from "App";
import { MyWindow } from "./index";

interface Props {}
declare var window: MyWindow;

let time: any = [];
const DashboardChart = (props: Props) => {
  const { chartData, setChartData } = useContext(GraphContext);

  const createChartObject = (name: string, data: any, time: any) => {
    if (name !== "Chip temp") {
      return {
        name: name,
        type: "line",
        x: time,
        y: data,
        visible: "legendonly",
      };
    } else {
      return {
        name: name,
        type: "line",
        x: time,
        y: data,
      };
    }
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
            setChartData(newArray);
          }
        }
      );
    }
  }, [window.selectedDeviceName]);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <PlotlyChart data={chartData} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default DashboardChart;

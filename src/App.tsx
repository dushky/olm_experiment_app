import React, { createContext, useState } from "react";
import { useRoutes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import NavigationScroll from "./layout/NavigationScroll";
import { useCookies } from "react-cookie";

import routes from "./routes";
import themes from "./themes";

interface Props {}

export const GraphContext = createContext<any>({
  chartData: [],
  setChartData: (data: any) => {},
});

export const CookieContext = createContext<any>({
  accessToken: "",
  setAccessToken: (token: string) => {},
});

const App = (props: Props) => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const routing = useRoutes(routes(cookies));
  const [chartData, setChartData] = useState();

  return (
    <CookieContext.Provider value={{ cookies, setCookie }}>
      <GraphContext.Provider value={{ chartData, setChartData }}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes({})}>
            <CssBaseline />
            <NavigationScroll>
              <div>{routing}</div>
            </NavigationScroll>
          </ThemeProvider>
        </StyledEngineProvider>
      </GraphContext.Provider>
    </CookieContext.Provider>
  );
};

export default App;

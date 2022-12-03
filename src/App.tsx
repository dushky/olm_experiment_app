import React, { createContext } from "react";
import { useRoutes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import NavigationScroll from "./layout/NavigationScroll";
import { useCookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";

import routes from "./routes";
import themes from "./themes";
import { ToastContainer } from "react-toastify";

interface Props {}

export const CookieContext = createContext<any>({
  accessToken: "",
  setAccessToken: (token: string) => {},
});

const App = (props: Props) => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const routing = useRoutes(routes(cookies));
  const form = useForm();

  return (
    <CookieContext.Provider value={{ cookies, setCookie }}>
      <FormProvider {...form}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes({})}>
            <CssBaseline />
            <ToastContainer />
            <NavigationScroll>
              <div>{routing}</div>
            </NavigationScroll>
          </ThemeProvider>
        </StyledEngineProvider>
      </FormProvider>
    </CookieContext.Provider>
  );
};

export default App;

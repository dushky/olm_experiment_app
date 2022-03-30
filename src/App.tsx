import React, { createContext, useState } from 'react'
import { useRoutes } from 'react-router'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import NavigationScroll from './layout/NavigationScroll';

import routes from './routes'
import themes from './themes'

interface Props {}

export const GraphContext = createContext<any>({
  chartData: [],
  setChartData: (data: any) => {}
})

const App = (props: Props) => {
  const routing = useRoutes(routes)
  const [chartData, setChartData] = useState()

  return (
    <GraphContext.Provider value={{ chartData, setChartData }}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes({})}>
            <CssBaseline/>
              <NavigationScroll>
                <div>
                  {routing}
                </div> 
              </NavigationScroll>
          </ThemeProvider>
        </StyledEngineProvider>
    </GraphContext.Provider>
  )
}

export default App

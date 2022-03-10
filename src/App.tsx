import React, { createContext, useState } from 'react'
import { useRoutes } from 'react-router'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import NavigationScroll from './layout/NavigationScroll';

import routes from './routes'
import themes from './themes'

interface Props {
  
}

export const SimulationTimeContext = createContext<any>({
  simulationTime: 0,
  setSimulationTime: (time: number) => {}
})

export const GraphContext = createContext<any>({
  chartData: [],
  setChartData: (data: any) => {}
})

const App = (props: Props) => {
  const routing = useRoutes(routes)
  const [simTime, setSimTime] = useState(10)
  const [chartData, setChartData] = useState()

  return (
    <GraphContext.Provider value={{ chartData, setChartData }}>
      <SimulationTimeContext.Provider value={{ simTime, setSimTime }}>
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
      </SimulationTimeContext.Provider>
    </GraphContext.Provider>
  )
}

export default App

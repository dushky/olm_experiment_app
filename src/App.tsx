import React from 'react'
import { useRoutes } from 'react-router'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import NavigationScroll from './layout/NavigationScroll';

import routes from './routes'
import themes from './themes'

interface Props {
  
}

const App = (props: Props) => {
  const routing = useRoutes(routes)

  return (
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
  )
}

export default App

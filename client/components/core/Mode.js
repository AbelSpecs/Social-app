import React, { createContext, useState } from 'react';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import palettes from "../../theme";
import { createTheme } from '@material-ui/core/styles';
import MainRouter from '../../MainRouter';

export const ModeContext = createContext()

export default function Mode() {
  const [mode, setMode] = useState('light');
  
  let newTheme = palettes;
  newTheme.palette.type = mode;
  newTheme = createTheme(newTheme);

  const handleMode = () => {
    setMode((prev) => prev === 'light' ? 'dark' : 'light');
  }
  
  return (
    <ModeContext.Provider value={handleMode}>
      <ThemeProvider theme={newTheme} >
        <MainRouter />
      </ThemeProvider>
    </ModeContext.Provider>

  )
}

Mode.propTypes = {};

Mode.defaultProps = {};



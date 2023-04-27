import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import design from "../../theme";
import { createTheme } from '@material-ui/core/styles';
import MainRouter from '../../MainRouter';
import { useMemo } from 'react';

export const ModeContext = createContext({toogleMode: () => {}})

export default function Mode() {
  const [mode, setMode] = useState();
  const themePalette = design;
  themePalette.palette.type = mode;
  const theme =  createTheme(themePalette);

  const handleMode = () => {
    console.log('hey');
    setMode((prev) => prev === 'light' ? 'dark' : 'light');
  }
  
  return (
    <ModeContext.Provider value={handleMode}>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </ModeContext.Provider>

  )
}

Mode.propTypes = {};

Mode.defaultProps = {};



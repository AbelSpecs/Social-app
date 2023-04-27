import React, { useEffect } from "react";
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@material-ui/styles';
// import theme from "./theme";
import { hot } from 'react-hot-loader';
import design from "./theme";
import { createTheme } from '@material-ui/core/styles';
import Mode from "./components/core/Mode";



const App = () => {

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
    
        if(jssStyles){
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }, []);

    return (
        <BrowserRouter>
            <Mode/>
            {/*<ThemeProvider theme={theme}>
                <MainRouter />
            </ThemeProvider>*/}
        </BrowserRouter>
    )
}

export default hot(module) (App)
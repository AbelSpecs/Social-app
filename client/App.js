import React, { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Mode from "./components/core/Mode";



const App = () => {

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
    
        if(jssStyles){
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }, []);

    return (
        <BrowserRouter >
            <Mode/>
            {/*<ThemeProvider theme={theme}>
                <MainRouter />
            </ThemeProvider>*/}
        </BrowserRouter>
    )
}

export default hot(module) (App)
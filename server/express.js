import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import template from '../template';
import userRoutes from './routes/user.routes';
import devBundle from './devBundle';
import path from 'path';
import authRoutes from './routes/auth.routes';
//React modules
import React  from 'react';
import ReactDOMServer from 'react-dom/server';
// Router Modules
import {StaticRouter} from 'react-router-dom/server';
import MainRouter from '../client/MainRouter';
// Material UI Modules 
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from '../client/theme';
import createEmotionCache from './createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';

const CURRENT_WORKING_DIR = process.cwd();
console.log(CURRENT_WORKING_DIR);
const app = express();

devBundle.compile(app);
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use((error, req, res, next) => {
    if(error.name === 'UnauthorizedError') {
        res.status(401).json({"error" : error.name + ": " + error.message});
    }else if(error){
        res.status(400).json({"error" : error.name + ": " + error.message});
        console.log(error);
    }
});

app.get('*', (req, res) => {
    // const sheets = new ServerStyleSheets();
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
    const context = {};
    const markup = ReactDOMServer.renderToString(
        // sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <CacheProvider value={cache}>
                    <ThemeProvider theme={theme}>
                        <MainRouter/>
                    </ThemeProvider>
                </CacheProvider>
            </StaticRouter>       
        // )
    );
    
    if(context.url){
        return res.redirect(303, context.url);
    }

    const emotionChunks = extractCriticalToChunks(markup);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);
    // const css = sheets.toString();
    res.status(200).send(template({
        markup: markup,
        css: emotionCss
    }))

});

// app.get('/', (req, res) => {
//     res.status(200).send(template())});


export default app;
export default ({markup, css}) => {
    return `<!doctype html>
    <html lang="en" style="min-height: 100vh; margin: 0; padding: 0; overflow-x: hidden">
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
            <title>MERN Social</title>
        </head>
        <body style="min-height: inherit; margin: 0; padding: 0">
            <div id="root" style="min-height: inherit">${markup}</div>
            <style id="jss-server-side">${css}</style>
            <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>    
    </html>`
}

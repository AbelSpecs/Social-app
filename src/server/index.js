import config from './config/config';
import app from './express';
import mongoose from 'mongoose';
const { ServerApiVersion } = require('mongodb');


app.listen(config.port, (err) => {
    if(err)
        console.log(err);

    console.info('Server started on port %s.', config.port);
    
});


async function connectionBD ({ mongoUri })  {
    try{
        await mongoose.connect(mongoUri, { 
            useNewUrlParser: true, useUnifiedTopology: true, serverApi: { version: ServerApiVersion.v1 } 
        }); 
        
    }catch (err){
        console.log(err);
    }
}

connectionBD(config).then(() => console.log('connected'))
            .catch(err => console.log(err));
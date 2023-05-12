require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
    mongoUri: 'mongodb+srv://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PSW + '@' + process.env.CLR + '.7bql4m4.mongodb.net/?retryWrites=true&w=majority'
}

export default config;



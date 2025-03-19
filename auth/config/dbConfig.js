module.exports = {
    db: {
        uri: process.env.DB_URI || 'mongodb://localhost:27017/auth-microservice',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    }
};
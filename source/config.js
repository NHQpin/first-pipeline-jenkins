module.exports = {
    port: 3000, 

    database: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        port: process.env.port
    }
};
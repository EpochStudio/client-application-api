module.exports = {
    version: "1.0.0",
    ratelimitConfig: {
        windowMs: 5 * 6 * 1000,
        max: 100
    },
    serverPort: process.env.API_SERVER_PORT,
    loginCredentials: {
        postgres: {
            active: true,
            name: process.env.DATABASE_NAME,
            username: process.env.ACCOUNT_NAME,
            password: process.env.DATABASE_PASS,
            dialect: process.env.DATABASE_DIALECT,
            logging: false
        }
    }
}
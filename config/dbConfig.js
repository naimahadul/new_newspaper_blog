const DBCONFIG = {
    HOST: 'localhost',
    PORT: '3308',
    USER: 'root',
    PASSWORD: "",
    DB: 'user_db',
    dialect: 'mysql',
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

export default { DBCONFIG }
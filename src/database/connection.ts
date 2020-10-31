import Knex from 'knex';

const { DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const connection = Knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: Number(DB_PORT),
        user: DB_USER,
        password: DB_PASSWORD === undefined ? '' : DB_PASSWORD,
        database: 'trading_masters'
    },
    useNullAsDefault: true
});

export default connection;
import path from 'path';

const { DB_PORT, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD === undefined ? '' : DB_PASSWORD,
      database: 'trading_masters',
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
      },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
      },
    useNullAsDefault: true,
};
import path from 'path';

const { DB_PORT, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
    client: 'mysql',
    connection: {
      host: 'b767i9tz8gjnuwk3l6mw-mysql.services.clever-cloud.com',
      port: 3306,
      user: 'uhxojhpo5ngptxsl',
      password: '6NekSxWTODhWv6opVRZ7',
      database: 'b767i9tz8gjnuwk3l6mw',
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
      },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
      },
    useNullAsDefault: true,
};
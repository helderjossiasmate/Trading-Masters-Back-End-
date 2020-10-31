import Knex from 'knex';

const { DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const connection = Knex({
    client: 'mysql',
    connection: {
        host: 'b767i9tz8gjnuwk3l6mw-mysql.services.clever-cloud.com',
        port: 3306,
        user: 'uhxojhpo5ngptxsl',
        password:'6NekSxWTODhWv6opVRZ7',
        database: 'b767i9tz8gjnuwk3l6mw'
    },
    useNullAsDefault: true
});

export default connection;
import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('api_authentication', table => {
        table.increments('id').primary();
        table.string('key', 255).notNullable();
        table.bigInteger('request').notNullable();
        table.dateTime('last_request').notNullable();
        table.boolean('ative').notNullable();
        table.integer('iduser').unsigned().notNullable().references('id').inTable('user');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('api_authentication');
}
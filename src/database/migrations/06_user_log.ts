import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user_log', table => {
        table.integer('iduser').unsigned().notNullable().references('id').inTable('user');
        table.string('action', 45).notNullable();
        table.dateTime('datetime').notNullable();
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('user_log');
}
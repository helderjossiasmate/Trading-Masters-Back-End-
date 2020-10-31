import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('admin_log', table => {
        table.integer('idadmin').unsigned().notNullable().references('id').inTable('admin');
        table.string('action', 45).notNullable();
        table.dateTime('datetime').notNullable();
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('admin_log');
}
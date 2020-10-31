import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('claim_admin', table => {
        table.increments('id').primary();
        table.integer('idadmin').unsigned().notNullable().references('id').inTable('admin');
        table.string('token', 255).notNullable();
        table.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
        table.boolean('valid').notNullable();
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('claim_admin');
}
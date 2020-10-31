import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('surname', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('username', 255).notNullable();
        table.string('password', 255).notNullable();
        table.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
        table.dateTime('date_updated');
        table.string('salt', 255).notNullable();
        table.boolean('verified').defaultTo(false);
        table.integer('idpackage').unsigned().references('id').inTable('package');
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('user');
}
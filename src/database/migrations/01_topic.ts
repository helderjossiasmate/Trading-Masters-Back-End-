import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('topic', table => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.text('description').notNullable();
        table.binary('video').notNullable();
        table.dateTime('date_uploaded').notNullable();
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('topic');
}
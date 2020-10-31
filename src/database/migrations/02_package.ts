import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('package', table => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.decimal('price', 19,4).notNullable();
        table.dateTime('activation');
        table.boolean('active');
    });
}

export async function down(Knex: Knex) {
    return Knex.schema.dropTable('package');
}
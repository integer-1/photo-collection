/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable('photo', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.string('photo')
    table.string('date')
    table.string('description')
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function down(knex) {
  return knex.schema.dropTable('photo')
}

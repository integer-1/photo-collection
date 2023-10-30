import photo from '../data/photo.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('photo').del()
  await knex('photo').insert(photo)
}

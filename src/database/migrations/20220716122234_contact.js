/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('CONTACT', table =>{
        table.increments('ID', primaryKey = true);
        table.integer('PROVIDER_ID').references('PROVIDER_INFO.ID').notNullable();
        table.integer('CONTACT_TYPE').notNullable();
        table.string('CONTACT_VALUE').notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable("CONTACT");
};

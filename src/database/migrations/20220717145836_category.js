/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    return knex.schema.createTable('CATEGORY', table =>{
        table.increments('ID');
        table.string('NAME').notNullable();
        table.tinyint('ACTIVE_IND', 1);
        table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
        table.timestamp('MODIFIED_AT').defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTable("CATEGORY");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    return knex.schema.createTable('CATEGORY', table =>{
        table.increments('ID');
        table.string('NAME').notNullable();
        table.tinyint('ACTIVE_IND', 1);
        table.timestamp('CREATED_AT');
        table.timestamp('MODIFIED_AT');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTable("CATEGORY");
};

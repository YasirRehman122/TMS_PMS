/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    return knex.schema.createTable('MENU_ITEM', table =>{
        table.increments('ID');
        table.integer('CATEGORY_ID').references('CATEGORY.ID').notNullable();
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
  
    return knex.schema.dropTable("MENU_ITEM");
};

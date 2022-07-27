/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    return knex.schema.createTable('INGREDIENTS', table =>{
        table.increments('ID', primaryKey = true);
        table.integer('MENU_ITEM_ID').references('MENU_ITEM.ID').notNullable();
        table.string('INGREDIENT_NAME').notNullable();
        table.timestamp('CREATED_AT');
        table.timestamp('MODIFIED_AT');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTable("INGREDIENTS");
};

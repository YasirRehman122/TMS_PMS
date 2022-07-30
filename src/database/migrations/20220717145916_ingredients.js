/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    return knex.schema.createTable('INGREDIENTS', table =>{
        table.increments('ID');
        table.integer('MENU_ITEM_ID').references('MENU_ITEM.ID').notNullable();
        table.string('INGREDIENT_NAME').notNullable();
        table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
        table.timestamp('MODIFIED_AT').defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.dropTable("INGREDIENTS");
};

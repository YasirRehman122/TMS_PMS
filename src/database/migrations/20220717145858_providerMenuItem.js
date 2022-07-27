/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  
    return knex.schema.createTable('PROVIDER_MENU_ITEM', table =>{
        table.increments('ID', primaryKey = true);
        table.integer('PROVIDER_ID').references('PROVIDER_INFO.ID').notNullable();
        table.increments('ITEM_ID').references('MENU_ITEM.ID').notNullable();
        table.integer('PRICE').unsigned().notNullable();
        table.string('DESCRIPTION');
        table.tinyint('IS_AVAILABLE', 1);
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
  
    return knex.schema.dropTable("PROVIDER_MENU_ITEM");
};

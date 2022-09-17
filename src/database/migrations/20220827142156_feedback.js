/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('FEEDBACK', table =>{
        table.increments('ID');
        table.integer('USER_ID').notNullable();
        table.integer('PROVIDER_ID').references('PROVIDER_INFO.ID').notNullable();
        table.integer('ITEM_ID').references('PROVIDER_MENU_ITEM.ID')
        table.float('RATING');
        table.string('REVIEW');
        table.date('CREATED_AT').defaultTo(knex.fn.now());
        table.integer('ORDER_ID');
        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("FEEDBACK");
};

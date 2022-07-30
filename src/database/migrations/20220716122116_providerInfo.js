/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('PROVIDER_INFO', table =>{
            table.increments('ID');
            table.string('SHOP_NAME').notNullable();
            table.time('OPEN_TIME');
            table.time('CLOSE_TIME');
            table.string('OWNER_NAME');
            table.string('LICENSE_NO');
            table.tinyint('ACCEPT_VOUCHER', 1);
            table.integer('ORDER_QUEUE_SIZE');
            table.integer('CURRENT_QUEUE_SIZE');
            table.integer('AVG_RATING');
            table.tinyint('ACTIVE_IND', 1);
            table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
            table.timestamp('MODIFIED_AT').defaultTo(knex.fn.now());
            table.tinyint('IS_OPEN', 1);
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable("PROVIDER_INFO");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('PROVIDER_MENU_ITEM', table =>{
        table.binary('IMAGE');
        table.string('IMAGE_TYPE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('PROVIDER_MENU_ITEM', table =>{
        table.dropColumn('IMAGE');
        table.dropColumn('IMAGE_TYPE');
    })
};

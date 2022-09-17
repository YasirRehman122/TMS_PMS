/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    
    return knex.schema
        .table('PROVIDER_INFO', table => {
            table.decimal('LATITUDE');
            table.decimal('LONGITUDE')
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    
};

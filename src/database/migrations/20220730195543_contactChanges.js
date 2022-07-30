/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    
    return knex.schema
        .table('CONTACT', table => {
            table.tinyint('ACTIVE_IND', 1);
            table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
            table.timestamp('MODIFIED_AT').defaultTo(knex.fn.now());

            table.foreign('CONTACT_TYPE').references('CONTACT_TYPE.ID');
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .table('CONTACT', table => {
        table.dropForeign('CONTACT_TYPE');
    })
};

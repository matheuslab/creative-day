
exports.up = (knex) => {
    return knex.schema.createTable('vehicles', (table) => {
        table.string('id').primary();
        table.string('license_plate');
        table.string('brand');
        table.string('model');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = (knex) => {
    return knex.schema.dropTable('vehicles');
};

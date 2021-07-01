
exports.up = (knex) => {
    return knex.schema.createTable('drivers', (table) => {
        table.string('id').primary();
        table.string('driver_code').notNullable();
        table.string('name').notNullable();
        table.string('licence_category').notNullable();
        table.string('model_device').notNullable();
        table.string('brand_device').notNullable();
        table.string('vehicle_id');
        table.foreign('vehicle_id').references('id').inTable('vehicles').onUpdate("CASCADE");
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = (knex) => {
    return knex.schema.dropTable('drivers');
};

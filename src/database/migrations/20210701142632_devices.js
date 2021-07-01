
exports.up = (knex) => {
  return knex.schema.createTable('devices', (table) => {
      table.string('id').primary();
      table.float('lat').notNullable();
      table.float('lng').notNullable();
      table.decimal('speed').notNullable();
      table.string('driver_code').notNullable();
      table.foreign('driver_code').references('driver_code').inTable('drivers').onUpdate("CASCADE");
      table.index('driver_code', 'driver_code');
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('devices');
};

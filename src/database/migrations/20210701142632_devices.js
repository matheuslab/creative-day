
exports.up = (knex) => {
  return knex.schema.createTable('devices', (table) => {
      table.increments('id').primary();
      table.float('lat').notNullable();
      table.float('lng').notNullable();
      table.string('hardwareModel').notNullable();
      table.decimal('speed').notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
      table.timestamp('createdAt').defaultTo(knex.fn.now());

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('devices');
};

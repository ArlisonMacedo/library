
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.increments('id');
      table.string('name').notNullable();
      table.string('phone').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
      table.string('code').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};


exports.up = function(knex) {
  return knex.schema.createTable('livros', function(table) {
    
      table.string('code_book').primary();
      table.string('name').notNullable();
      table.string('price_aloc').notNullable();
      table.string('author').notNullable();
      table.boolean('emprestimo');

      table.string('users_id');

      table.foreign('users_id').references('code').inTable('users');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('livros')
};

exports.up = function (knex) {
    return knex.schema.createTable('User_Profile', (table) => {
      table.increments('user_id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('department', 255).notNullable();
      table.string('designation', 255).notNullable();
      table.integer('tenant_id').unsigned().references('tenant_id').inTable('Tenant_Profile').onDelete('CASCADE');
      table.string('image_url', 255).notNullable();
      table.string('city', 255).notNullable();
      table.string('country', 255).notNullable();
      table.string('bio', 255).notNullable();
      table.json('social_links', 255).notNullable();
      table.integer('employee_id').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('User_Profile');
  };
  
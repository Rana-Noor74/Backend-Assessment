// db/seeds/01_tenant_profile.js
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('Tenant_Profile')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('Tenant_Profile').insert([
          {
            tenant_name: 'Sample Tenant',
            address: '{"street": "123 Main St", "city": "Sample City"}',
            city: 'Sample City',
            country: 'Sample Country',
            zip_code: '12345',
            phone: '123-456-7890',
            web_url: 'https://sample-tenant.com',
          },
        ]);
      });
  };
  
// db/seeds/02_user_profile.js
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('User_Profile')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('User_Profile').insert([
          {
            first_name: 'John',
            last_name: 'Doe',
            department: 'Engineering',
            designation: 'Software Engineer',
            tenant_id: 1,
            image_url: 'https://sample-user.com/profile.jpg',
            city: 'Sample City',
            country: 'Sample Country',
            bio: 'I am a software engineer.',
            social_links: '{"twitter": "https://twitter.com/johndoe", "linkedin": "https://linkedin.com/in/johndoe"}',
            employee_id: 12345,
          },
        ]);
      });
  };
  
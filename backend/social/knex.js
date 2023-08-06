module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'postgres',
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.SOCIAL_DB,
      },
      migrations: {
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  };
  
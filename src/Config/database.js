module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '1046010203',
    database: 'data_financeiro',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {

  },
  production: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    define: {
      timestamps: true,
      underscored: true,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
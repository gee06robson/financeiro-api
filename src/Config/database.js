module.exports = {
  // development: {
  //   dialect: 'postgres',
  //   host: 'localhost',
  //   username: 'postgres',
  //   password: '1046010203',
  //   database: 'data_financeiro',
  //   define: {
  //     timestamps: true,
  //     underscored: true,
  //   },
  // },
  // test: {

  // },
  // development: {
  //   dialect: 'postgres',
  //   host: 'ec2-34-225-103-117.compute-1.amazonaws.com',
  //   username: 'qtntaskfgaeqxl',
  //   password: '9c8d7102604faa4a4a23b6e28c394792de87e02d32c13cdede7b2d4fe53a9105',
  //   database: 'dbbptngp9j3t9k',
  //   define: {
  //     timestamps: true,
  //     underscored: true,
  //   },
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false
  //     }
  //   }
  // }
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
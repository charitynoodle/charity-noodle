const { Pool } = require('pg');
const url: string = 'postgres://zwgiycrg:gd_gNjrJ1RvzG3VE4bnpUw4qp44vakN1@raja.db.elephantsql.com:5432/zwgiycrg';
 

export const connectToDB = () => {
  console.log('connected to db')
  return new Pool({
    connectionString: url,
    max: 2
  });
};
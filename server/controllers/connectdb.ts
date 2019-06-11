const { Pool } = require('pg');
const url: string = 'postgres://wddvrefe:dfTavQC6qjKXfVDXuOpI1lgRHUqUF5tv@raja.db.elephantsql.com:5432/wddvrefe';
 

export const connectToDB = () => {
  console.log('connected to db')
  return new Pool({
    connectionString: url,
    max: 2
  });
};
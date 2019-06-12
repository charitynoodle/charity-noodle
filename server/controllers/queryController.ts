import * as express from 'express';
import {connectToDB} from '../controllers/connectdb';
const db: any = connectToDB();

module.exports = {

    signUp: (
        req: express.Request, 
        res: express.Response,
        next: express.NextFunction) => {
        const queryValues = [req.body.firstName, req.body.lastName, req.body.username, req.body.password, req.body.email];
        const insertQuery = `INSERT INTO user_table("firstName", "lastName", "username", "password", "email") VALUES($1, $2, $3, $4, $5) RETURNING *`;
            
        db.query(insertQuery, queryValues, (err, result) => {
          if (err) res.locals.error = err;
          else {
            res.locals.result = result.rows[0];
            console.log('+++++User added to db+++++++ ', res.locals.result);
          }
          return next();
        })
      },
      
      login: (
        req: express.Request, 
        res: express.Response,
        next: express.NextFunction) => {
        console.log('+++++req.BODY in testSignIn+++++++ ', req.body);
        db.query(`SELECT * FROM user_table WHERE ("username"='${req.body.username}')`, (err, result) => {
          if (err) res.locals.error = err; 
          else {
            res.locals.result = result.rows[0]; // we have access to the hash
            if (res.locals.result === undefined) res.locals.error = {error: 'Invalid username'};
            console.log('+++++RESULT in SignIn+++++++ ', res.locals.result);
          }
          return next();
        })
      },

      getFavorites: (
        req: express.Request, 
        res: express.Response,
        next: express.NextFunction) => {
        db.query('SELECT * FROM favorites_table', (err, result) => {
          if (err) res.locals.error = err;
          else res.locals.result = result;
          return next();
        })
      },

      addFavorites: (
        req: express.Request, 
        res: express.Response,
        next: express.NextFunction) => {
        const queryValues = [req.body.favID];
        const insertQuery = 'INSERT INTO favorites_table("favID") VALUES($1) RETURNING *';
        db.query(insertQuery, queryValues, (err, result) => {
            if (err) res.locals.error = err;
            else {
                res.locals.result = result.rows[0];
                console.log('+++++Favorite added to db+++++++ ', res.locals.result);
            }
            return next();
        })
    }

}
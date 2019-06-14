import * as express from 'express';
import {connectToDB} from '../controllers/connectdb';
const db: any = connectToDB();


interface Query {
    text: string;
    values: any[];
}

module.exports = {

    signUp: (
        req: express.Request, 
        res: express.Response,
        next: express.NextFunction) => {
        console.log("IN SIGNUP MIDDLEWARE IN QUERYCONTROLLER");
        // const queryValues = [req.body.firstName, req.body.lastName, req.body.username, req.body.password, req.body.email];
        // const insertQuery = `INSERT INTO users_table("firstName", "lastName", "username", "password", "email") VALUES($1, $2, $3, $4, $5) RETURNING *`;
        
        const queryObject : Query = {
          text: `INSERT INTO users_table("firstname", "lastname", "username", "password", "email") VALUES($1, $2, $3, $4, $5) RETURNING *`,
          values: [req.body.firstName, req.body.lastName, req.body.username, req.body.password, req.body.email]
        }


        db.query(queryObject, (err, result) => {
          if (err) {
            console.log("ERROR IN QUERYCONTROLLER.TS");
            console.log("ERROR IS ^: ", err)
            res.locals.error = err;
          }

          else {
            res.locals.userPK = result.rows[0].id;
            res.locals.result = result.rows[0];
            console.log("ITSHOTHERE ", res.locals);
            console.log('+++++User added to db+++++++ ', res.locals.result);
          }
          return next();
        })
      },
      
      login: (
        req: express.Request, 
        res: express.Response,
        next: express.NextFunction) => {
          console.log("STARTING THE QUERYCONTROLLER.LOGIN MIDDLEWARE")
          console.log('+++++req.BODY in testSignIn+++++++ ', req.body);

          const queryObject : Query = {
            text: `SELECT * FROM users_table WHERE username = $1`,
            values: [req.body.username]
          }

          console.log("Checking for User: ", req.body.username)
          console.log("Checking for password: ", req.body.password)

        // TODO: Make sure that you're checking both the incoming username and the hashed incoming password vs TABLE
          db.query(queryObject, (err, result) => {
            if (err) {
              console.log("ERROR in querycontroller.login trying to select users from db ")
              console.log(err);
              res.locals.error = err
              return next()
            }
            else {
              console.log("Success finding matching user: Result is: ", result)
              if (result.rows.length < 1) {
                res.locals.error = new Error('invalid username');
                return next()
              }
              res.locals.foundUser = result.rows[0];
              res.locals.foundPassword = res.locals.foundUser.password;// we have access to the hash
              res.locals.userPK = res.locals.foundUser.id;
              console.log("FOUND USER IS: ", res.locals.foundUser);
              return next()
              console.log('+++++RESULT in SignIn+++++++ ', res.locals.result);
            }
            return next();
          })
      },

      getFavorites: (
        req: express.Request, 
        res: express.Response,
        next: express.NextFunction) => {
        const queryObj: Query = {
            text: 'SELECT favorites_table FROM merge_table WHERE user_table = $1',
            values: [res.locals.userTablePK] //need to store user's primary key on frontend, to send to backend when favorites are requested
        }
        db.query(queryObj, (err, result) => {
          if (err) res.locals.error = err;
          else res.locals.result = result;
          return next();
        })
      },

      addFavorites: (
        req: express.Request, 
        res: express.Response,
        next: express.NextFunction) => {
        const queryObj: Query = {
            text: 'INSERT INTO favorites_table("fav_id") VALUES($1) RETURNING *',
            values: [req.body.fav_id] //verify fav_id is the same on the front end
        };
        db.query(queryObj, (err, result) => {
            if (err) res.locals.error = err;
            else {
                res.locals.result = result.rows[0];
                console.log('+++++Favorite added to db+++++++ ', res.locals.result);
            }
            return next();
        })
    }

}
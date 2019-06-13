import * as express from 'express';
import {connectToDB} from '../controllers/connectdb';
const db: any = connectToDB();
interface Query {text: string; values: any[]}

module.exports = {

  verifySession: (req, res, next) => {
    console.log("STARTING VERIFYSESSION MIDDLEWARE");
    if (res.locals.error) return next();
    console.log("IN VERIFYSESSIONS, RES.LOCALS IS: ", res.locals);
    db.query(`SELECT * FROM sessions WHERE sessionid='${res.locals.token}'`, (err,result) => {
      if (err) {
        console.log("ERROR IN VERIFYSESSION MIDDLEWARE (A)");
        res.locals.err = err;
        return next();
      }
      
      // IF LOOKUP RETURNS NO SESSIONS, CREATE A SESSION, STASH RESULT
      if (result.rows[0] === undefined) {
        console.log('---NO SESSION--- creating session...');
        const queryValues = [res.locals.token, res.locals.result.id];
        const insertQuery = `INSERT INTO sessions("sessionid","accountid") VALUES($1, $2) RETURNING *`;
        
        db.query(insertQuery, queryValues, (err, result) => {
          if (err) {
            console.log("ERROR IN VERIFYSESSION MIDDLEWARE (B)")
            res.locals.error = err;
            console.log(res.locals.error);
            return next();
          }
          else {
            res.locals.result = result.rows[0];
            return next();
          }
        })
        
      // IF LOOKUP RETURNS EXISTING SESSION, STASH RESULT
      } else {
        console.log('+++SESSION FOUND+++');
        res.locals.result = result.rows[0];
        return next();
      }
    })
  },

  lookupSession: (req, res, next) => {
    console.log("STARTING LOOKUPSESSION MIDDLEWARE");
    if (res.locals.error) return next();

    const queryObject = {
      text: `SELECT * FROM sessions WHERE sessionid = $1 AND id = $2`,
      values: [res.locals.token, res.locals.result.id]
    }

    console.log("HOPEFUL CHECK: ", res.locals);
    console.log("SESSION ID HOPEFUL: ", res.locals.token)
    console.log("ACCOUNT ID HOPEFUL: ", res.locals.result.id)

    db.query(queryObject, (err, result) => {
      if (err) {
        console.log("ERROR IN LOOKUPSESSION MIDDLEWARE!");
        console.log(err);
        res.locals.error = err;
        return next()
      } else if (result.rows.length < 1) {
        console.log("ERROR IN THE LOOKUPSESSION MIDDLWARE: COULD NOT FIND RECORDS");
        console.log("XXX: ", result);
        res.locals.error = new Error('Could not find session in session table in sessionController')
        return next()
      }
      else {
        console.log("YYY: ", result);
        console.log("Success in lookupSession middleware!");
        res.locals.queryResult = result.rows[0];
        return next()
      }
      // console.log('+++LOOKUP SESSION RESULT+++', res.locals.token);
      // return next();
    })
  },
}
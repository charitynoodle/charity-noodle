import * as express from 'express';
import {connectToDB} from '../controllers/connectdb';
const db: any = connectToDB();

module.exports = {

  verifySession: (req, res, next) => {
    console.log("STARTING VERIFYSESSION MIDDLEWARE");
    if (res.locals.error) return next();
    db.query(`SELECT * FROM sessions WHERE sessionid='${res.locals.token}'`, (err,result) => {
      if (err) {
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
    db.query(`SELECT ac.username, ac.lat, ac.lng FROM accounts ac INNER JOIN sessions s ON ac.id = s.accountid WHERE s.sessionid='${res.locals.token}'`, (err, result) => {
      if (err) res.locals.error = err;
      else res.locals.result = result.rows[0];
      // console.log('+++LOOKUP SESSION RESULT+++', res.locals.token);
      return next();
    })
  },
}
const jwt = require('jsonwebtoken');
interface Query {text: string; values: any[]}
import {connectToDB} from '../controllers/connectdb';
const db: any = connectToDB();

const superSecretKey = 'j0909jfjJGpEpSiKAij4893tgnp30';

module.exports = {
  setSSIDCookie: (req, res, next) => {
    console.log("IN SET SSID COOKIE MIDDLEWARE");
    if (res.locals.error) {
      return next();
    }
  

    // CREATING A COOKIE IF IT DOESN'T EXIST IN THE CLIENT
  //  console.log('++++COOKIEZ IN SSID', req.cookies);
    if (!req.cookies[res.locals.result.username]) {
      console.log('---NO COOKIE--- creating cookie...');
      let payload = { username: res.locals.result.username };
      let token = jwt.sign(payload, superSecretKey, { expiresIn: 60 });
      
      // Insert into the sessions table 
      const queryObject : Query = {
        text: `INSERT INTO sessions ("accountid", "sessionid") VALUES ($1, $2) RETURNING *`,
        values: [res.locals.result.user_id, res.locals.token]
      }

      db.query(queryObject, (err, data) => {
        if (err) {
          console.log("ERROR INSERTING INTO SESSIONS TABLE IN THE COOKIECONTROLLER MIDDLEWARE")
          console.log("ERROR IS: ", err)
          res.locals.error = err
          return next();
        } else {
          console.log()
          res.locals.data = data;
          res.locals.token = token;
          res.cookie(res.locals.result.username, token, { httpOnly: true });
          return next()
        }
      })
      
    } else {
      console.log('+++COOKIE FOUND+++');
      res.locals.token = req.cookies[res.locals.result.username];
      return next()
    }
  },
}
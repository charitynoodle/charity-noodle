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
  

    const imputedUserName = res.locals.result.username ? req.cookies[res.locals.result.username] : req.cookies[req.body.username]
    
    // CREATING A COOKIE IF IT DOESN'T EXIST IN THE CLIENT
  //  console.log('++++COOKIEZ IN SSID', req.cookies);
    if (!imputedUserName) {
      console.log('---NO COOKIE--- creating cookie...');
      let payload = { username: imputedUserName };
      let token = jwt.sign(payload, superSecretKey, { expiresIn: 60 });
      
      // Insert into the sessions table 
      const queryObject : Query = {
        text: `INSERT INTO sessions ("accountid", "sessionid", "userid") VALUES ($1, $2, $3) RETURNING *`,
        values: [res.locals.result.id || res.locals.userPK, token, res.locals.userPK]
      }

      console.log("MIKEY: ", res.locals);
      console.log("ZZZ: queryObj in cookieController verifysessions is: ", queryObject)

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
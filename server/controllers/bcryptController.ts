import * as express from 'express';
const bcrypt = require('bcryptjs');

// any methods called out of this exports object will be accessed by the reference bcryptController (or whatever you name it) inside the server.js require statement
module.exports = {
  hashPassword: (
    req: express.Request, 
    res: express.Response,
    next: express.NextFunction) => {
    console.log("IN HASHPASSWORD")
    // console.log("req.body.password is: ", req.body.password)
    // console.log("REQ IS: ", req);
    console.log("REQ.BODY IS: ", req.body)
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    return next();
  },

  verifyPassword: (
    req: express.Request, 
    res: express.Response,
    next: express.NextFunction) => {
    if (res.locals.error) return next();
    if (bcrypt.compareSync(req.body.password, res.locals.result.password)) {
      console.log('Login success');
    } 
    else {
      res.locals.error = { error: 'Invalid password' };
      console.log('Login unsuccessfull');
    }
    return next();
  },
}
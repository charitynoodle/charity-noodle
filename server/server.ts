import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import axios from 'axios'

const bcryptController = require("./controllers/bcryptController");
const queryController = require("./controllers/queryController");
const sessionController = require("./controllers/sessionController");
const cookieController = require("./controllers/cookieController");
const cookieSession = require("cookie-session");

const apiKey = "87ca426ff6866d3bc5b3fbffd81dccbd"

// We need the line below
const passportSetup = require("../config/passport-setup.ts");
const authRoutes = require("../routes/auth-routes.ts");

const { PORT = 4000 } = process.env;
const app: any = express();

// Server side rendering.
app.set("view engine", "ejs");

// All the app.use's
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// CORS
app.use(function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Sessions
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["MikeyisWinning"],
  })
);
// oAuth
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

// Production Settings
if (process.env.NODE_ENV === "production") {
  app.use(
    "/static",
    express.static(path.resolve(__dirname, "../build/static"))
  );
  app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
  });
  app.get("/manifest.json", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "../build/manifest.json"));
  });
  app.get("/src/index.css", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "../src/index.css"));
  });
}

// // Route handlers
// app.get("/", (req: express.Request, res: express.Response) => {
//   res.render("home");
// });

app.post(
  "/signup",
  bcryptController.hashPassword,
  queryController.signUp,
  cookieController.setSSIDCookie,
  sessionController.verifySession,
  sessionController.lookupSession,
  (req: express.Request, res: express.Response) => {
    console.log("IN LAST MIDDLEWARE OF POST SIGNUP!");
    if (res.locals.error) {
      console.log("SENDING BACK ERROR");
      res.send(res.locals.error);
    } else {
      const response = {
        ...res.locals.result,
        currentUserID: res.locals.userPK
      }
      console.log("SENDING BACK: ", response);
      res.send(response); 
    }
  }
);

// DO WE NEED A SIGNUP ROUTE ON THE SERVER?
// app.post("/signup", (req: express.Request, res: express.Response) => {
//   res.sendFile(path.join(__dirname, "../index.html"));
// });



app.get("/charities", (req: express.Request, res: express.Response) => {
  console.log("HIT CHARITIES! :) ");
  console.log("REQ.QUERY is : ", req.query);
  const queryParams = {
    ...req.query, 
    user_key: apiKey
  };
  console.log("In /charities route: queryParams are : ", queryParams)
  
  axios.get('http://data.orghunter.com/v1/charitysearch', {
    params: queryParams
  })
  .then(data => {
    console.log("Received data");
    // console.log("XXX: ", data.data);
    res.send(data.data);
  }).catch(err => {
    console.log("Received error!")
    res.send(err)
  })
});


app.post(
  "/login",
  queryController.login,
  bcryptController.verifyPassword,
  cookieController.setSSIDCookie,
  sessionController.verifySession,
  sessionController.lookupSession,
  (req: express.Request, res: express.Response) => {
    if (res.locals.error) {
      res.send(res.locals.error);
      res.status(501);
    } else res.send(res.locals.result);
  }
);


// ROUTE TO GET ALL OF A USER'S FAVORITES
app.get("/getFavorites", (req: express.Request, res: express.Response) => {
  queryController.getFavorites, res.send(res.locals); //add middleware for API call based on charity_id's for specific user
});

// ROUTE TO ADD FAVORITES
app.post("/addFavorites", (req: express.Request, res: express.Response) => {
  queryController.addFavorites, res.send(res.locals);
});

// App PORT
app.listen(PORT, () => console.log(`listening on ${PORT}`));

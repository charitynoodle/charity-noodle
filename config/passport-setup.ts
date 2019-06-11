const passport: any = require("passport");
const GoogleStrategy: any = require("passport-google-oauth20");
const pgUrl: string = `postgres://zwgiycrg:gd_gNjrJ1RvzG3VE4bnpUw4qp44vakN1@raja.db.elephantsql.com:5432/zwgiycrg`;
const { Pool } = require("pg");

// InterFace
interface Query {
  text: string;
  values: any[];
}

// New Pool
const pool = new Pool({
  connectionString: pgUrl,
  max: 2,
});

// Passport sessions
passport.serializeUser(
  (user: { rows: { id: any }[] }, done: (arg0: any, arg1: any) => void) => {
    done(null, user.rows[0].id);
  }
);
passport.deserializeUser(
  (id: any, done: (arg0: any, arg1: { rowCount: number }) => void) => {
    const queryObj3 = {
      text: "SELECT * FROM users WHERE google_id= $1",
      values: [id],
    };
    pool.query(queryObj3, (err: any, data: { rowCount: number }) => {
      if (err) {
        console.log(err);
      }
      if (data.rowCount < 1) {
        done(null, data);
      }
    });
  }
);

// Passport config use
passport.use(
  new GoogleStrategy(
    {
      callbackURL: `/auth/google/redirect`,
      clientID: `51253214337-k2aj8i0aietmtngaq8oogpnfcth1hrk1.apps.googleusercontent.com`,
      clientSecret: `tqgqtn6R62lJDPAMhS6ioK70`,
    },
    (
      accessToken: any,
      refreshToken: any,
      profile: { id: any; displayName: any },
      done: { (arg0: any, arg1: any): void; (arg0: any, arg1: any): void }
    ) => {
      const queryObj1: Query = {
        text: "SELECT * FROM users WHERE google_id= $1",
        values: [profile.id],
      };
      const queryObj2: Query = {
        text:
          "INSERT INTO users(username, google_id) VALUES($1, $2) RETURNING *;",
        values: [profile.displayName, profile.id],
      };
      pool.query(queryObj1, (err: any, data: { rowCount: number }) => {
        if (err) {
          console.log(err);
        }
        if (data.rowCount < 1) {
          pool.query(queryObj2, (err: any, data: any) => {
            if (err) {
              console.log(err);
            }
            done(null, data);
          });
        } else {
          done(null, data);
        }
      });
    }
  )
);

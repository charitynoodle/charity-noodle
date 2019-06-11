import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as pg from 'pg';
import {connectToDB} from './controllers/connectdb';

const {PORT = 3000} = process.env;
const app = express();
const db: any = connectToDB();

// CORS
app.use(function(
    req: express.Request, 
    res: express.Response,
    next: express.NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', 
    (req: express.Request, 
    res: express.Response) => {
    res.send("Im in dis shit")
  });

app.get('/signup',
    (req: express.Request, 
    res: express.Response) => {
    app.set('view engine', 'ejs');
    res.render('../client/components/signup.ejs', {error: null});
});

app.post('/signup', 
    (req: express.Request, 
    res: express.Response) => {
    res.sendFile(path.join(__dirname, '../index.html'))
});

app.post('/login',
    (req: express.Request, 
    res: express.Response) => {
    res.sendFile(path.join(__dirname, '../index.html'))
  });

app.get('/getFavorites', 
    (req: express.Request, 
    res: express.Response) => {
    res.json(res.locals)
})

app.post('/addFavorites', 
    (req: express.Request, 
    res: express.Response) => {
    res.json(res.locals)
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
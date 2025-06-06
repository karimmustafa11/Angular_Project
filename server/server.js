
console.log("NODE_PATH =", process.env.NODE_PATH);
console.log("Current dir =", __dirname);


const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

app.db = router.db;

const middlewares = jsonServer.defaults();
app.use(cors());
app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(auth);
app.use(router);

app.listen(3000, () => {
    console.log('JSON Server is running on http://localhost:3000');
});

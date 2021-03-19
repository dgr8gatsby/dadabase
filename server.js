require('dotenv').config();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'ymtt7oWZBt8nISxXEVXcp99CR97ISCd6',
  issuerBaseURL: 'https://gr8gatsby.auth0.com'
};

const express = require('express'); // Use Express to help build server app
const path = require('path'); // Use path to help with directory paths
const bodyParser = require('body-parser'); // Use body-parser to help parse POST JSON objects
const api = require('./src/api'); // Routes for base server API
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './src/api/views');
app.use(cors());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use('/', api);

app.get('/sw.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'sw.js'));
});

app.get('*', function (req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public') + '/dad_404.html');
});

app.listen(PORT, err => {
  if (err) throw err;
  const hostname = 'localhost';
  console.log(`application listenting on http://${hostname}:${PORT}`);
});

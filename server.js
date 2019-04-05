const express = require('express');
const people = require('./people.json');

const app = express();

app.set('view engine', 'pug');

//serve static files from the 'public' folder
app.use(express.static(__dirname + '/public'));

app.get('/index', (req, res) => {
  res.render('index', {
    title: 'CurfewBot2020'
  });
});
app.get('/AboutTheProject', (req, res) => {
  res.render('AboutTheProject', {
    title: 'About CurfewBot2020'
  });
});
app.get('/AboutUs', (req, res) => {
  res.render('AboutUs', {
    title: 'Meet the team',
    people: people.profiles
  });
});
app.get('/Login', (req, res) => {
  res.render('Login', {
    title: 'Log in or register a new user.'
  });
});
app.get('/profile', (req, res) => {
  const person = people.profiles.find(p => p.id === req.query.id);
  res.render('profile', {
    title: `About ${person.firstname} ${person.lastname}`,
    person,
  });
});
const server = app.listen(7000, () => {
  console.log(`Express running -> PORT ${server.address().port}`);
});

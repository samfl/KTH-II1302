const express = require('express');
const people = require('../../people.json');

//const app = express();

module.exports = function(app){

app.set('view engine', 'pug');
app.set('views', './public/');

//serve static files from the 'public' folder
//app.use(express.static(__dirname + '/public'));

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
app.get('/profile', (req, res) => {
  const person = people.profiles.find(p => p.id === req.query.id);
  res.render('profile', {
    title: `About ${person.firstname} ${person.lastname}`,
    person,
  });
});
}

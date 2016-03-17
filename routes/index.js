var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'The Vision' });
});

router.get('/contribute', function(req, res) {
  res.render('contribute');
});

module.exports = router;

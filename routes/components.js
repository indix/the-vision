var express = require('express');
var router = express.Router();

router.get('/form', function(req, res) {
  res.render('components/form');
});

router.get('/product-card', function(req, res) {
  res.render('components/product-card');
});

module.exports = router;

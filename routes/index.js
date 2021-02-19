var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('homepage was called');

  res.render('index', { title: 'Express', mytitle: 'Books-Crud' });
});

// router.get('/r/:subreddit', function (req, res, next) {
//   const { subreddit } = req.params;
//   res.render('index', { title: 'Express', mytitle: 'Books-Crud', subreddit });
// });

module.exports = router;



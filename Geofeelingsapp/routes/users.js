var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* CREATE user */
router.get('/new', function(req, res){
  res.sendFile(path.join(__dirname, '../public/users/'));
});

router.post('/', function(req, res, next){
    console.log(req.body.username);
});

module.exports = router;

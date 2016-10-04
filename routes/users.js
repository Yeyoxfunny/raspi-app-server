var express = require('express');
var router = express.Router();

var User = require('../database/User');

router.get('/', function(req, res, next) {
	console.log(req.session.user_id);
	res.render('app/index');
});

router.post('/signup', function (req,res,next) {
	console.log('Hola mundo')
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});
	user.save(function(err, doc){
		if(err){
			return next(err);
		}
		res.redirect('/app');
	});
});


router.get('/admin', function(req, res){
	res.render('app/register');
});

router.get('/logout', function(req, res, next) {
	req.session.destroy(function (err) {
      if(err){
        return nex(err);
      }
      res.redirect('/');
   });
});

module.exports = router;
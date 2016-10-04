var express = require('express');
var router = express.Router();

var User = require('../database/User');


/* GET home page. */
router.get('/', function (req, res) {
	if(req.session.user_id){
		return res.redirect('/app');
	}
	res.render('login');
});

router.post('/sessions',function (req, res, next) {
	console.log(req.body.username)
	User.findOne({username: req.body.username}, function (err, doc) {
		if (err) {
			return next(err);
		}
		if (!doc) {
			return next("No existe usuario");
		}
		doc.comparePassword(req.body.password, doc.password, function (err, isMatch) {
              if(err){
                return next(err);
              }
              if(!isMatch){
                return next('Contraseña incorrecta');
              }
              console.log(doc._id);
              req.session.user_id = doc._id ;
              return res.redirect('app');
        });
	});
});


module.exports = router;

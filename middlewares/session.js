var User = require('../database/User');

module.exports = function (req, res, next) {
	if (!req.session.user_id) {
	    res.redirect('/');
  	}else{
  		User.findById(req.session.user_id, function (err, user) {
  			if (err) {
  				console.log(err);
  				res.redirect('/');		
  			}else{
  				console.log('Holaaaaa',user);
  				console.log(res.locals.user);
  				res.locals = { username: user.username}
  				next();
  			}
  		});
	}
}
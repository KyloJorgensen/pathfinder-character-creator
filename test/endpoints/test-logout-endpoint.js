'use strict';

var chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../../server/server.js'),
	SECRET = require('../../server/config/variables.express.js').SECRET,
	cookie = require('cookie'),
	btoa = require('btoa'),
	User = require('../../server/api/user/user.model'),
	should = chai.should(),
	app = server.app,
	username = 'frank';
chai.use(chaiHttp);

module.exports = function() {
	describe('Pathfinder character creator /logout endpoint', function() {
	    it('should logout on GET', function(done) {
	    	var agent = chai.request.agent(app);
	        agent.post('/login')
	        .send({
	            username: username,
	            password: username
	        })
	        .end(function(error, res) {
	        	if (error) {return done(error)}
	        	return new Promise(function(resolve, reject) {
                    User.findOne({
                        username: username
                    }, function(error, user) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(user);
                        }
                    });
                }).then(function(user) {
		            res.should.have.status(200);
		            res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)));
		   			agent.get('/logout')
		   			.end(function (error, res) {
		   				if (error) {return done(error)}
		       			res.should.have.status(200);
		       			res.request.cookies.should.equal(cookie.serialize('UserKey', 'null'));
		       			done();
		   			});
                }).catch(function(error) {
                    done(error);
                });
	        });
	    });
	});
};
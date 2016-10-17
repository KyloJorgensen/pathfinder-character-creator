'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var SECRET = require('../../server/config/variables.express.js').SECRET;
var cookie = require('cookie');
var btoa = require('btoa');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

var username = 'kylo';

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
	            res.should.have.status(200);
	            res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + username)));
	   			agent.get('/logout')
	   			.end(function (error, res) {
	   				if (error) {return done(error)}
	     			console.log(res.request.cookies);
	       			res.should.have.status(200);
	       			res.request.cookies.should.equal(cookie.serialize('UserKey', 'null'));
	       			done();
	   			});
	        });
	    });
	});
};
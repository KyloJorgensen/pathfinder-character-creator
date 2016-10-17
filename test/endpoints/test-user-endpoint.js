'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

module.exports = function() {
    describe('Pathfinder character creator /user endpoint', function() {
        it('should create User on POST', function(done) {
        	chai.request(app)
        	.post('/user')
        	.send({ 
                username: 'kylo',
                password: 'kylo',
                name: 'kylo'           
            })
        	.end(function(error, res) {
                if (error) {return done(error)}
        		res.should.have.status(200);
        		done();
        	});
        });
    });
};
'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var SECRET = require('../../server/config/variables.express.js').SECRET;
var cookie = require('cookie');
var btoa = require('btoa');
var User = require('../../server/api/user/user.model');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

var username = 'kylo';

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

        it('should GET User Name', function(done) {
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
                    agent.get('/user')
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.equal(username);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });
    });
};
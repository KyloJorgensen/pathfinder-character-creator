'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var SECRET = require('../../server/config/variables.express.js').SECRET;
var btoa = require('btoa');
var cookie = require('cookie');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

var username = 'kylo';

module.exports = function() {
    describe('Pathfinder character creator /login endpoint', function() {
        it('should login on POST', function(done) {
            chai.request.agent(app)
            .post('/login')
            .send({
                username: username,
                password: username
            })
            .end(function(error, res) {
                if (error) {return done(error)}
                var key = cookie.serialize('UserKey', btoa(SECRET + ':' + username));
                res.should.have.status(200);
                res.request.should.have.property('cookies');
                res.request.cookies.should.be.a('string');
                res.request.cookies.should.equal(key);
                done();
            });
        });
    });
};
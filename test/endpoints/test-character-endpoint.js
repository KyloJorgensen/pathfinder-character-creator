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
    describe('Pathfinder character creator /character endpoint', function() {
        it('should GET characters', function(done) {
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
                agent.get('/character')
                .end(function(error, res) {
                    if (error) {return done(error)}
                    console.log(res.body);
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
};
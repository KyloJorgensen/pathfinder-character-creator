'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

module.exports = function() {
    describe('Pathfinder character creator / endpoint', function() {
        it('should sendFile on GET', function(done) {
            chai.request(app)
            .get('/')
            .end(function(error, res) {
                if (error) {return done(error)}
                res.should.have.status(200);
                res.should.be.sendFile;
                done();
            });
        });
    });
};
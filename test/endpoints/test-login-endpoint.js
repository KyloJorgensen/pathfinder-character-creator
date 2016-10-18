'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server/server.js'),
    SECRET = require('../../server/config/variables.express.js').SECRET,
    btoa = require('btoa'),
    cookie = require('cookie'),
    User = require('../../server/api/user/user.model'),
    should = chai.should(),
    app = server.app,
    username = 'frank';
chai.use(chaiHttp);

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
                    res.request.should.have.property('cookies');
                    res.request.cookies.should.be.a('string');
                    res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)));
                    done();
                }).catch(function(error) {
                    done(error);
                });
            });
        });
    });
};
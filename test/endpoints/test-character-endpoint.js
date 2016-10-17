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

var username = 'frank';
var characterName = 'bob';
var characterId;

module.exports = function() {
    describe('Pathfinder character creator /character endpoint', function() {
        it('should create Character on Post', function(done) {
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
                    agent.post('/character')
                    .send({
                        name: characterName
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.name.should.equal(characterName);
                        res.body.ability_score_str.should.equal(10);
                        res.body.ability_score_dex.should.equal(10);
                        res.body.ability_score_con.should.equal(10);
                        res.body.ability_score_int.should.equal(10);
                        res.body.ability_score_wis.should.equal(10);
                        res.body.ability_score_cha.should.equal(10);
                        res.body.race.should.equal('RACE');
                        res.body.size.should.equal('Medium');
                        res.body.class.should.equal('CLASS');
                        res.body.level.should.equal(0);
                        res.body.base_attack_bonus.should.equal(0);

                        characterId = res.body._id;
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET characters', function(done) {
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
                    agent.get('/character')
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        console.log(res.body);
                        res.should.have.status(200);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should update character on put', function(done) {
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
                    var changes = {
                        _id: characterId,
                        name: 'BOB',
                        ability_score_str: 14,
                        race: 'Human',
                        size: 'Large',
                        class: 'Fighter',
                        level: 5,
                        base_attack_bonus: 5
                    };
                    agent.put('/character')
                    .send(changes)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        console.log(res.body);

                        res.should.have.status(200);
                        res.body.name.should.equal(changes.name);
                        res.body.ability_score_str.should.equal(changes.ability_score_str);
                        res.body.ability_score_dex.should.equal(10);
                        res.body.ability_score_con.should.equal(10);
                        res.body.ability_score_int.should.equal(10);
                        res.body.ability_score_wis.should.equal(10);
                        res.body.ability_score_cha.should.equal(10);
                        res.body.race.should.equal(changes.race);
                        res.body.size.should.equal(changes.size);
                        res.body.class.should.equal(changes.class);
                        res.body.level.should.equal(changes.level);
                        res.body.base_attack_bonus.should.equal(changes.base_attack_bonus);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });
    });
};
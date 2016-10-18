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
var skillName = 'Swim';
var skillAbility = 'str';
var skillId;

module.exports = function () {
    describe('Pathfinder character creator /skill endpoint', function() {
        it('create Character', function(done) {
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
                        res.should.have.status(200);
                        res.body.name.should.equal(characterName);

                        characterId = res.body._id;
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should create skill on post', function(done) {
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
                    agent.post('/skill')
                    .send({
                        _characterId: characterId,
                        name: skillName,
                        key_ability: skillAbility
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._characterId.should.equal(characterId);
                        res.body.name.should.equal(skillName);
                        res.body.key_ability.should.equal(skillAbility);
                        res.body.misc_bonus.should.equal(0);
                        res.body.trained.should.equal(false);
                        res.body.train_only.should.equal(false);
                        res.body.rank.should.equal(0);
                        skillId = res.body._id;
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET skill by id', function(done) {
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
                    agent.get('/skill/' + characterId + '/' + skillId)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(skillId);
                        res.body._characterId.should.equal(characterId);
                        res.body.name.should.equal(skillName);
                        res.body.key_ability.should.equal(skillAbility);
                        res.body.misc_bonus.should.equal(0);
                        res.body.trained.should.equal(false);
                        res.body.train_only.should.equal(false);
                        res.body.rank.should.equal(0);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET skills', function(done) {
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
                    agent.get('/skill/' + characterId)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0]._id.should.equal(skillId);
                        res.body[0]._characterId.should.equal(characterId);
                        res.body[0].name.should.equal(skillName);
                        res.body[0].key_ability.should.equal(skillAbility);
                        res.body[0].misc_bonus.should.equal(0);
                        res.body[0].trained.should.equal(false);
                        res.body[0].train_only.should.equal(false);
                        res.body[0].rank.should.equal(0);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should update skill on PUT', function(done) {
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
                    var data = {
                        _skillId: skillId,
                        _characterId: characterId,
                        name: 'Jump',
                        key_ability: 'dex',
                        misc_bonus: 3,
                        trained: true,
                        train_only: false,
                        rank: 5
                    };
                    agent.put('/skill')
                    .send(data)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body._id.should.equal(skillId);
                        res.body._characterId.should.equal(characterId);
                        res.body.name.should.equal(data.name);
                        res.body.key_ability.should.equal(data.key_ability);
                        res.body.misc_bonus.should.equal(data.misc_bonus);
                        res.body.trained.should.equal(data.trained);
                        res.body.train_only.should.equal(data.train_only);
                        res.body.rank.should.equal(data.rank);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });
    });
};

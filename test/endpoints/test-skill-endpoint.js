'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server/server.js'),
    SECRET = require('../../server/config/variables.express.js').SECRET,
    cookie = require('cookie'),
    btoa = require('btoa'),
    User = require('../../server/api/user/user.model'),
    Skill = require('../../server/api/skill/skill.model'),
    should = chai.should(),
    app = server.app,
    username = 'frank',
    characterName = 'bob',
    _characterId,
    skillName = 'Swim',
    skillAbility = 'str',
    _skillId;
chai.use(chaiHttp);

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
                    agent.post('/character')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        name: characterName
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.name.should.equal(characterName);

                        _characterId = res.body._id;
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
                    agent.post('/skill')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _characterId: _characterId,
                        name: skillName,
                        key_ability: skillAbility
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(skillName);
                        res.body.should.not.have.property('specialties');
                        res.body.key_ability.should.equal(skillAbility);
                        res.body.misc_bonus.should.equal(0);
                        res.body.trained.should.equal(false);
                        res.body.train_only.should.equal(false);
                        res.body.rank.should.equal(0);
                        _skillId = res.body._id;
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
                    agent.get('/skill/' + _characterId + '/' + _skillId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_skillId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(skillName);
                        res.body.should.not.have.property('specialties');
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
                    agent.get('/skill/' + _characterId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0]._id.should.equal(_skillId);
                        res.body[0]._characterId.should.equal(_characterId);
                        res.body[0].name.should.equal(skillName);
                        res.body[0].should.not.have.property('specialties');
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
                    var data = {
                        _id: _skillId,
                        _characterId: _characterId,
                        name: 'Jump',
                        specialties: 'up',
                        key_ability: 'dex',
                        misc_bonus: 3,
                        trained: true,
                        train_only: false,
                        rank: 5
                    };
                    agent.put('/skill')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send(data)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_skillId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(data.name);
                        res.body.specialties.should.equal(data.specialties);
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

        it('should delete skill on delete', function(done) {
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
                    agent.delete('/skill')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _id: _skillId,
                        _characterId: _characterId
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        Skill.findOne({
                            _id: _skillId,
                            _characterId: _characterId
                        }, function(error, skill) {
                            if (error) {
                                done(error);
                            } else {
                                if (skill == null) {
                                    done();
                                } else {
                                    var error = new Error("Skill didn't delete");
                                    done(error);
                                }
                            }
                        });                        
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });
    });
};

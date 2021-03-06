'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server/server.js'),
    SECRET = require('../../server/config/variables.express.js').SECRET,
    cookie = require('cookie'),
    btoa = require('btoa'),
    User = require('../../server/api/user/user.model'),
    Spell = require('../../server/api/spell/spell.model'),
    should = chai.should(),
    app = server.app,
    username = 'frank',
    characterName = 'bob',
    _characterId,
    spellName = 'Swim',
    spellAbility = 'str',
    spellLevel = 2,
    spellSchool = 'High',
    _spellId;
chai.use(chaiHttp);

module.exports = function () {
    describe('Pathfinder character creator /spell endpoint', function() {
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

        it('should create spell on post', function(done) {
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
                    agent.post('/spell')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _characterId: _characterId,
                        name: spellName
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(spellName);
                        res.body.level.should.equal(0);
                        res.body.school.should.equal('School');
                        res.body.prepared.should.equal(0);
                        res.body.used.should.equal(0);
                        _spellId = res.body._id;
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET spell by id', function(done) {
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
                    agent.get('/spell/' + _characterId + '/' + _spellId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_spellId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(spellName);
                        res.body.level.should.equal(0);
                        res.body.school.should.equal('School');
                        res.body.prepared.should.equal(0);
                        res.body.used.should.equal(0);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET spells', function(done) {
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
                    agent.get('/spell/' + _characterId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0]._id.should.equal(_spellId);
                        res.body[0]._characterId.should.equal(_characterId);
                        res.body[0].name.should.equal(spellName);
                        res.body[0].level.should.equal(0);
                        res.body[0].school.should.equal('School');
                        res.body[0].prepared.should.equal(0);
                        res.body[0].used.should.equal(0);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should update spell on PUT', function(done) {
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
                        _id: _spellId,
                        _characterId: _characterId,
                        name: 'Jump',
                        level: 4,
                        school: 'jumpping',
                        prepared: 0,
                        used: 0
                    };
                    agent.put('/spell')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send(data)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_spellId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(data.name);
                        res.body.level.should.equal(data.level);
                        res.body.school.should.equal(data.school);
                        res.body.prepared.should.equal(data.prepared);
                        res.body.used.should.equal(data.used);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should delete spell on delete', function(done) {
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
                    agent.delete('/spell')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _id: _spellId,
                        _characterId: _characterId
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        Spell.findOne({
                            _id: _spellId,
                            _characterId: _characterId
                        }, function(error, spell) {
                            if (error) {
                                done(error);
                            } else {
                                if (spell == null) {
                                    done();
                                } else {
                                    var error = new Error("Spell didn't delete");
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
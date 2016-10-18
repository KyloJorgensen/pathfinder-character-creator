'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var SECRET = require('../../server/config/variables.express.js').SECRET;
var cookie = require('cookie');
var btoa = require('btoa');
var User = require('../../server/api/user/user.model');
var Spell = require('../../server/api/spell/spell.model');

var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

var username = 'frank';
var characterName = 'bob';
var _characterId;
var spellName = 'Swim';
var spellAbility = 'str';
var spellLevel = 2;
var spellSchool = 'High'
var _spellId;

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
                    res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)));
                    agent.post('/character')
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
                    res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)));
                    agent.post('/spell')
                    .send({
                        _characterId: _characterId,
                        name: spellName,
                        level: spellLevel,
                        school: spellSchool
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(spellName);
                        res.body.level.should.equal(spellLevel);
                        res.body.school.should.equal(spellSchool);
                        res.body.perpared.should.equal(0);
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
                    res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)));
                    agent.get('/spell/' + _characterId + '/' + _spellId)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_spellId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(spellName);
                        res.body.level.should.equal(spellLevel);
                        res.body.school.should.equal(spellSchool);
                        res.body.perpared.should.equal(0);
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
                    res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)));
                    agent.get('/spell/' + _characterId)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0]._id.should.equal(_spellId);
                        res.body[0]._characterId.should.equal(_characterId);
                        res.body[0].name.should.equal(spellName);
                        res.body[0].level.should.equal(spellLevel);
                        res.body[0].school.should.equal(spellSchool);
                        res.body[0].perpared.should.equal(0);
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
                    res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)));
                    var data = {
                        _spellId: _spellId,
                        _characterId: _characterId,
                        name: 'Jump',
                        level: 4,
                        school: 'jumpping',
                        perpared: 0,
                        used: 0
                    };
                    agent.put('/spell')
                    .send(data)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_spellId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(data.name);
                        res.body.level.should.equal(data.level);
                        res.body.school.should.equal(data.school);
                        res.body.perpared.should.equal(data.perpared);
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
                    res.request.cookies.should.equal(cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)));
                    agent.delete('/spell')
                    .send({
                        _spellId: _spellId,
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
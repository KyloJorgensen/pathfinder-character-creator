'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server/server.js'),
    SECRET = require('../../server/config/variables.express.js').SECRET,
    cookie = require('cookie'),
    btoa = require('btoa'),
    User = require('../../server/api/user/user.model'),
    Feat = require('../../server/api/feat/feat.model'),
    should = chai.should(),
    app = server.app,
    username = 'frank',
    characterName = 'bob',
    _characterId,
    featName = 'Swim',
    featAbility = 'str',
    _featId;
chai.use(chaiHttp);

module.exports = function () {
    describe('Pathfinder character creator /feat endpoint', function() {
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

        it('should create feat on post', function(done) {
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
                    agent.post('/feat')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _characterId: _characterId,
                        name: featName,
                        key_ability: featAbility
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(featName);
                        res.body.should.not.have.property('specialties');
                        _featId = res.body._id;
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET feat by id', function(done) {
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
                    agent.get('/feat/' + _characterId + '/' + _featId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_featId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(featName);
                        res.body.should.not.have.property('specialties');
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET feats', function(done) {
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
                    agent.get('/feat/' + _characterId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0]._id.should.equal(_featId);
                        res.body[0]._characterId.should.equal(_characterId);
                        res.body[0].name.should.equal(featName);
                        res.body[0].should.not.have.property('specialties');
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should update feat on PUT', function(done) {
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
                        _id: _featId,
                        _characterId: _characterId,
                        name: 'Jump',
                        specialties: 'up'
                    };
                    agent.put('/feat')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send(data)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_featId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(data.name);
                        res.body.specialties.should.equal(data.specialties);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should delete feat on delete', function(done) {
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
                    agent.delete('/feat')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _id: _featId,
                        _characterId: _characterId
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        Feat.findOne({
                            _id: _featId,
                            _characterId: _characterId
                        }, function(error, feat) {
                            if (error) {
                                done(error);
                            } else {
                                if (feat == null) {
                                    done();
                                } else {
                                    var error = new Error("Feat didn't delete");
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

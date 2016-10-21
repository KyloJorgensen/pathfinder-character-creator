'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server/server.js'),
    SECRET = require('../../server/config/variables.express.js').SECRET,
    cookie = require('cookie'),
    btoa = require('btoa'),
    User = require('../../server/api/user/user.model'),
    Feature = require('../../server/api/feature/feature.model'),
    should = chai.should(),
    app = server.app,
    username = 'frank',
    characterName = 'bob',
    _characterId,
    featureName = 'Swim',
    featureAbility = 'str',
    _featureId;
chai.use(chaiHttp);

module.exports = function () {
    describe('Pathfinder character creator /feature endpoint', function() {
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

        it('should create feature on post', function(done) {
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
                    agent.post('/feature')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _characterId: _characterId,
                        name: featureName,
                        key_ability: featureAbility
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(featureName);
                        _featureId = res.body._id;
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET feature by id', function(done) {
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
                    agent.get('/feature/' + _characterId + '/' + _featureId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_featureId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(featureName);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET features', function(done) {
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
                    agent.get('/feature/' + _characterId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0]._id.should.equal(_featureId);
                        res.body[0]._characterId.should.equal(_characterId);
                        res.body[0].name.should.equal(featureName);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should update feature on PUT', function(done) {
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
                        _id: _featureId,
                        _characterId: _characterId,
                        name: 'Jump'
                    };
                    agent.put('/feature')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send(data)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_featureId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(data.name);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should delete feature on delete', function(done) {
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
                    agent.delete('/feature')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _id: _featureId,
                        _characterId: _characterId
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        Feature.findOne({
                            _id: _featureId,
                            _characterId: _characterId
                        }, function(error, feature) {
                            if (error) {
                                done(error);
                            } else {
                                if (feature == null) {
                                    done();
                                } else {
                                    var error = new Error("Feature didn't delete");
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
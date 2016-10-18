'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server/server.js'),
    SECRET = require('../../server/config/variables.express.js').SECRET,
    cookie = require('cookie'),
    btoa = require('btoa'),
    User = require('../../server/api/user/user.model'),
    Acitem = require('../../server/api/acitem/acitem.model'),
    should = chai.should(),
    app = server.app,
    username = 'frank',
    characterName = 'bob',
    _characterId,
    acitemName = 'Swim',
    acitemAbility = 'str',
    _acitemId;
chai.use(chaiHttp);

module.exports = function () {
    describe('Pathfinder character creator /acitem endpoint', function() {
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

        it('should create acitem on post', function(done) {
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
                    agent.post('/acitem')
                    .send({
                        _characterId: _characterId,
                        name: acitemName
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(acitemName);
                        res.body.bonus.should.equal(0)
                        res.body.type.should.equal('TYPE')
                        res.body.check_penalty.should.equal(0)
                        res.body.spell_failure.should.equal(0)
                        res.body.weight.should.equal(0)
                        res.body.properties.should.equal('n/a')
                        res.body.max_dex_bonus.should.equal(0)

                        _acitemId = res.body._id;
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET acitem by id', function(done) {
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
                    agent.get('/acitem/' + _characterId + '/' + _acitemId)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_acitemId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(acitemName);
                        res.body.bonus.should.equal(0)
                        res.body.type.should.equal('TYPE')
                        res.body.check_penalty.should.equal(0)
                        res.body.spell_failure.should.equal(0)
                        res.body.weight.should.equal(0)
                        res.body.properties.should.equal('n/a')
                        res.body.max_dex_bonus.should.equal(0)

                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET acitems', function(done) {
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
                    agent.get('/acitem/' + _characterId)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0]._id.should.equal(_acitemId);
                        res.body[0]._characterId.should.equal(_characterId);
                        res.body[0].name.should.equal(acitemName);
                        res.body[0].bonus.should.equal(0)
                        res.body[0].type.should.equal('TYPE')
                        res.body[0].check_penalty.should.equal(0)
                        res.body[0].spell_failure.should.equal(0)
                        res.body[0].weight.should.equal(0)
                        res.body[0].properties.should.equal('n/a')
                        res.body[0].max_dex_bonus.should.equal(0)
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should update acitem on PUT', function(done) {
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
                        _acitemId: _acitemId,
                        _characterId: _characterId,
                        name: 'Vest',
                        bonus: 4,
                        type: 'armor',
                        check_penalty: -2,
                        spell_failure: 10,
                        weight: 14,
                        properties: 'shinny',
                        max_dex_bonus: 4
                    };
                    agent.put('/acitem')
                    .send(data)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_acitemId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(data.name);
                        res.body.bonus.should.equal(data.bonus);
                        res.body.type.should.equal(data.type);
                        res.body.check_penalty.should.equal(data.check_penalty);
                        res.body.spell_failure.should.equal(data.spell_failure);
                        res.body.weight.should.equal(data.weight);
                        res.body.properties.should.equal(data.properties);
                        res.body.max_dex_bonus.should.equal(data.max_dex_bonus);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should delete acitem on delete', function(done) {
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
                    agent.delete('/acitem')
                    .send({
                        _acitemId: _acitemId,
                        _characterId: _characterId
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        Acitem.findOne({
                            _id: _acitemId,
                            _characterId: _characterId
                        }, function(error, acitem) {
                            if (error) {
                                done(error);
                            } else {
                                if (acitem == null) {
                                    done();
                                } else {
                                    var error = new Error("Acitem didn't delete");
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

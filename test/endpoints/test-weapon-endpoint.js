'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server/server.js'),
    SECRET = require('../../server/config/variables.express.js').SECRET,
    cookie = require('cookie'),
    btoa = require('btoa'),
    User = require('../../server/api/user/user.model'),
    Weapon = require('../../server/api/weapon/weapon.model'),
    should = chai.should(),
    app = server.app,
    username = 'frank',
    characterName = 'bob',
    _characterId,
    weaponName = 'Swim',
    weaponAbility = 'str',
    _weaponId;
chai.use(chaiHttp);

module.exports = function () {
    describe('Pathfinder character creator /weapon endpoint', function() {
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

        it('should create weapon on post', function(done) {
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
                    agent.post('/weapon')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _characterId: _characterId,
                        name: weaponName,
                        key_ability: weaponAbility
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(weaponName);
                        res.body.damage_type.should.equal('Damage Type');
                        res.body.range.should.equal(0);
                        res.body.crit.should.equal('Critical');
                        res.body.attack_bonus.should.equal(0);
                        res.body.damage_bonus.should.equal(0);
                        res.body.damage_dice.should.equal('Damage Dice');
                        _weaponId = res.body._id;
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET weapon by id', function(done) {
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
                    agent.get('/weapon/' + _characterId + '/' + _weaponId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_weaponId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(weaponName);
                        res.body.damage_type.should.equal('Damage Type');
                        res.body.range.should.equal(0);
                        res.body.crit.should.equal('Critical');
                        res.body.attack_bonus.should.equal(0);
                        res.body.damage_bonus.should.equal(0);
                        res.body.damage_dice.should.equal('Damage Dice');
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET weapons', function(done) {
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
                    agent.get('/weapon/' + _characterId)
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0]._id.should.equal(_weaponId);
                        res.body[0]._characterId.should.equal(_characterId);
                        res.body[0].name.should.equal(weaponName);
                        res.body[0].damage_type.should.equal('Damage Type');
                        res.body[0].range.should.equal(0);
                        res.body[0].crit.should.equal('Critical');
                        res.body[0].attack_bonus.should.equal(0);
                        res.body[0].damage_bonus.should.equal(0);
                        res.body[0].damage_dice.should.equal('Damage Dice');
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should update weapon on PUT', function(done) {
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
                        _id: _weaponId,
                        _characterId: _characterId,
                        name: 'spear',
                        damage_type: 'S',
                        range: 10,
                        crit: '19-20/x2',
                        attack_bonus: 1,
                        damage_bonus: 3,
                        damage_dice: '2d6'
                    };
                    agent.put('/weapon')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send(data)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body._id.should.equal(_weaponId);
                        res.body._characterId.should.equal(_characterId);
                        res.body.name.should.equal(data.name);
                        res.body.damage_type.should.equal(data.damage_type);
                        res.body.range.should.equal(data.range);
                        res.body.crit.should.equal(data.crit);
                        res.body.attack_bonus.should.equal(data.attack_bonus);
                        res.body.damage_bonus.should.equal(data.damage_bonus);
                        res.body.damage_dice.should.equal(data.damage_dice);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should delete weapon on delete', function(done) {
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
                    agent.delete('/weapon')
                    .set('Authentication', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id)))
                    .send({
                        _id: _weaponId,
                        _characterId: _characterId
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        Weapon.findOne({
                            _id: _weaponId,
                            _characterId: _characterId
                        }, function(error, weapon) {
                            if (error) {
                                done(error);
                            } else {
                                if (weapon == null) {
                                    done();
                                } else {
                                    var error = new Error("Weapon didn't delete");
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
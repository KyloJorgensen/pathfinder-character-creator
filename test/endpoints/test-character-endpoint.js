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
                        res.body.hit_points.should.equal(0);
                        res.body.land_speed.should.equal(0);
                        res.body.armor_speed.should.equal(0);
                        res.body.fly_speed.should.equal(0);
                        res.body.climb_speed.should.equal(0);
                        res.body.swim_speed.should.equal(0);
                        res.body.borrow_speed.should.equal(0);
                        res.body.fort_base_save.should.equal(0);
                        res.body.fort_magic_mod.should.equal(0);
                        res.body.fort_misc_mod.should.equal(0);
                        res.body.fort_temp_mod.should.equal(0);
                        res.body.ref_base_save.should.equal(0);
                        res.body.ref_magic_mod.should.equal(0);
                        res.body.ref_misc_mod.should.equal(0);
                        res.body.ref_temp_mod.should.equal(0);
                        res.body.will_base_save.should.equal(0);
                        res.body.will_magic_mod.should.equal(0);
                        res.body.will_misc_mod.should.equal(0);
                        res.body.will_temp_mod  .should.equal(0);              

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
                        base_attack_bonus: 5,
                        hit_points: 50,
                        land_speed: 0,
                        armor_speed: 0,
                        fly_speed: 0,
                        climb_speed: 0,
                        swim_speed: 0,
                        borrow_speed: 0,
                        fort_base_save: 0,
                        fort_magic_mod: 0,
                        fort_misc_mod: 0,
                        fort_temp_mod: 0,
                        ref_base_save: 0,
                        ref_magic_mod: 0,
                        ref_misc_mod: 0,
                        ref_temp_mod: 0,
                        will_base_save: 0,
                        will_magic_mod: 0,
                        will_misc_mod: 0,
                        will_temp_mod: 0
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
                        res.body.hit_points.should.equal(changes.hit_points);
                        res.body.land_speed.should.equal(changes.land_speed);
                        res.body.armor_speed.should.equal(changes.armor_speed);
                        res.body.fly_speed.should.equal(changes.fly_speed);
                        res.body.climb_speed.should.equal(changes.climb_speed);
                        res.body.swim_speed.should.equal(changes.swim_speed);
                        res.body.borrow_speed.should.equal(changes.borrow_speed);
                        res.body.fort_base_save.should.equal(changes.fort_base_save);
                        res.body.fort_magic_mod.should.equal(changes.fort_magic_mod);
                        res.body.fort_misc_mod.should.equal(changes.fort_misc_mod);
                        res.body.fort_temp_mod.should.equal(changes.fort_temp_mod);
                        res.body.ref_base_save.should.equal(changes.ref_base_save);
                        res.body.ref_magic_mod.should.equal(changes.ref_magic_mod);
                        res.body.ref_misc_mod.should.equal(changes.ref_misc_mod);
                        res.body.ref_temp_mod.should.equal(changes.ref_temp_mod);
                        res.body.will_base_save.should.equal(changes.will_base_save);
                        res.body.will_magic_mod.should.equal(changes.will_magic_mod);
                        res.body.will_misc_mod.should.equal(changes.will_misc_mod);
                        res.body.will_temp_mod.should.equal(changes.will_temp_mod);

                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });
    });
};
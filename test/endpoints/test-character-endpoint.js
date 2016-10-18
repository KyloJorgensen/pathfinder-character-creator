'use strict';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server/server.js'),
    SECRET = require('../../server/config/variables.express.js').SECRET,
    cookie = require('cookie'),
    btoa = require('btoa'),
    User = require('../../server/api/user/user.model'),
    Character = require('../../server/api/character/character.model'),
    should = chai.should(),
    app = server.app,
    username = 'frank',
    characterName = 'bob',
    characterId;
chai.use(chaiHttp);

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
                        res.should.have.status(200);
                        res.body.name.should.equal(characterName);
                        res.body.ability_score_str.should.equal(10);
                        res.body.ability_score_dex.should.equal(10);
                        res.body.ability_score_con.should.equal(10);
                        res.body.ability_score_int.should.equal(10);
                        res.body.ability_score_wis.should.equal(10);
                        res.body.ability_score_cha.should.equal(10);
                        res.body.ability_score_str_temp.should.equal(0);
                        res.body.ability_score_dex_temp.should.equal(0);
                        res.body.ability_score_con_temp.should.equal(0);
                        res.body.ability_score_int_temp.should.equal(0);
                        res.body.ability_score_wis_temp.should.equal(0);
                        res.body.ability_score_cha_temp.should.equal(0);
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
                        res.body.will_temp_mod.should.equal(0);
                        res.body.init_misc_mod.should.equal(0);
                        res.body.weight.should.equal(0);
                        res.body.height.should.equal(0);
                        res.body.damage_reduction.should.equal(0);
                        res.body.spell_resistance.should.equal(0);
                        res.body.size_mod.should.equal(0);
                        res.body.xp_points.should.equal(0);
                        res.body.next_level.should.equal(0);
                        res.body.money_cp.should.equal(0);
                        res.body.money_sp.should.equal(0);
                        res.body.money_gp.should.equal(0);
                        res.body.money_pp.should.equal(0);
                        res.body.light_load.should.equal(0);
                        res.body.medium_load.should.equal(0);
                        res.body.heavy_load.should.equal(0);
                        res.body.lift_over_head.should.equal(0);
                        res.body.lift_off_ground.should.equal(0);
                        res.body.drag_or_push.should.equal(0);
                        res.body.age.should.equal(0);
                        res.body.gender.should.equal('GENDER');
                        res.body.hair.should.equal('HAIR');
                        res.body.eyes.should.equal('EYES');
                        res.body.deity.should.equal('DEITY');
                        res.body.alignment.should.equal('ALIGNMENT');
                        res.body.homeland.should.equal('HOMELAND');
                        res.body.background_stories.should.equal('BACKGROUND');
                        res.body.languages.should.equal('LANGUAGES');
                        res.body.domain_and_specialty_school.should.equal('Domain and/or Specialty School');
                        res.body.level_0_spell_per_day.should.equal(0);
                        res.body.level_0_bonus_spells.should.equal(0);
                        res.body.level_0_spell_save_dc.should.equal(0);
                        res.body.level_0_spells_known.should.equal(0);
                        res.body.level_1_spell_per_day.should.equal(0);
                        res.body.level_1_bonus_spells.should.equal(0);
                        res.body.level_1_spell_save_dc.should.equal(0);
                        res.body.level_1_spells_known.should.equal(0);
                        res.body.level_2_spell_per_day.should.equal(0);
                        res.body.level_2_bonus_spells.should.equal(0);
                        res.body.level_2_spell_save_dc.should.equal(0);
                        res.body.level_2_spells_known.should.equal(0);
                        res.body.level_3_spell_per_day.should.equal(0);
                        res.body.level_3_bonus_spells.should.equal(0);
                        res.body.level_3_spell_save_dc.should.equal(0);
                        res.body.level_3_spells_known.should.equal(0);
                        res.body.level_4_spell_per_day.should.equal(0);
                        res.body.level_4_bonus_spells.should.equal(0);
                        res.body.level_4_spell_save_dc.should.equal(0);
                        res.body.level_4_spells_known.should.equal(0);
                        res.body.level_5_spell_per_day.should.equal(0);
                        res.body.level_5_bonus_spells.should.equal(0);
                        res.body.level_5_spell_save_dc.should.equal(0);
                        res.body.level_5_spells_known.should.equal(0);
                        res.body.level_6_spell_per_day.should.equal(0);
                        res.body.level_6_bonus_spells.should.equal(0);
                        res.body.level_6_spell_save_dc.should.equal(0);
                        res.body.level_6_spells_known.should.equal(0);
                        res.body.level_7_spell_per_day.should.equal(0);
                        res.body.level_7_bonus_spells.should.equal(0);
                        res.body.level_7_spell_save_dc.should.equal(0);
                        res.body.level_7_spells_known.should.equal(0);
                        res.body.level_8_spell_per_day.should.equal(0);
                        res.body.level_8_bonus_spells.should.equal(0);
                        res.body.level_8_spell_save_dc.should.equal(0);
                        res.body.level_8_spells_known.should.equal(0);
                        res.body.level_9_spell_per_day.should.equal(0);
                        res.body.level_9_bonus_spells.should.equal(0);
                        res.body.level_9_spell_save_dc.should.equal(0);
                        res.body.level_9_spells_known.should.equal(0);
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
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body[0].name.should.be.a('string');
                        res.body[0].ability_score_str.should.be.a('number');
                        res.body[0].ability_score_dex.should.be.a('number');
                        res.body[0].ability_score_con.should.be.a('number');
                        res.body[0].ability_score_int.should.be.a('number');
                        res.body[0].ability_score_wis.should.be.a('number');
                        res.body[0].ability_score_cha.should.be.a('number');
                        res.body[0].ability_score_str_temp.should.be.a('number');
                        res.body[0].ability_score_dex_temp.should.be.a('number');
                        res.body[0].ability_score_con_temp.should.be.a('number');
                        res.body[0].ability_score_int_temp.should.be.a('number');
                        res.body[0].ability_score_wis_temp.should.be.a('number');
                        res.body[0].ability_score_cha_temp.should.be.a('number');
                        res.body[0].race.should.be.a('string');
                        res.body[0].size.should.be.a('string');
                        res.body[0].class.should.be.a('string');
                        res.body[0].level.should.be.a('number');
                        res.body[0].base_attack_bonus.should.be.a('number');
                        res.body[0].hit_points.should.be.a('number');
                        res.body[0].land_speed.should.be.a('number');
                        res.body[0].armor_speed.should.be.a('number');
                        res.body[0].fly_speed.should.be.a('number');
                        res.body[0].climb_speed.should.be.a('number');
                        res.body[0].swim_speed.should.be.a('number');
                        res.body[0].borrow_speed.should.be.a('number');
                        res.body[0].fort_base_save.should.be.a('number');
                        res.body[0].fort_magic_mod.should.be.a('number');
                        res.body[0].fort_misc_mod.should.be.a('number');
                        res.body[0].fort_temp_mod.should.be.a('number');
                        res.body[0].ref_base_save.should.be.a('number');
                        res.body[0].ref_magic_mod.should.be.a('number');
                        res.body[0].ref_misc_mod.should.be.a('number');
                        res.body[0].ref_temp_mod.should.be.a('number');
                        res.body[0].will_base_save.should.be.a('number');
                        res.body[0].will_magic_mod.should.be.a('number');
                        res.body[0].will_misc_mod.should.be.a('number');
                        res.body[0].will_temp_mod.should.be.a('number');
                        res.body[0].init_misc_mod.should.be.a('number');
                        res.body[0].weight.should.be.a('number');
                        res.body[0].height.should.be.a('number');
                        res.body[0].damage_reduction.should.be.a('number');
                        res.body[0].spell_resistance.should.be.a('number');
                        res.body[0].size_mod.should.be.a('number');
                        res.body[0].xp_points.should.be.a('number');
                        res.body[0].next_level.should.be.a('number');
                        res.body[0].money_cp.should.be.a('number');
                        res.body[0].money_sp.should.be.a('number');
                        res.body[0].money_gp.should.be.a('number');
                        res.body[0].money_pp.should.be.a('number');
                        res.body[0].light_load.should.be.a('number');
                        res.body[0].medium_load.should.be.a('number');
                        res.body[0].heavy_load.should.be.a('number');
                        res.body[0].lift_over_head.should.be.a('number');
                        res.body[0].lift_off_ground.should.be.a('number');
                        res.body[0].drag_or_push.should.be.a('number');
                        res.body[0].age.should.be.a('number');
                        res.body[0].gender.should.be.a('string');
                        res.body[0].hair.should.be.a('string');
                        res.body[0].eyes.should.be.a('string');
                        res.body[0].deity.should.be.a('string');
                        res.body[0].alignment.should.be.a('string');
                        res.body[0].homeland.should.be.a('string');
                        res.body[0].background_stories.should.be.a('string');
                        res.body[0].languages.should.be.a('string');
                        res.body[0].domain_and_specialty_school.should.equal('Domain and/or Specialty School');
                        res.body[0].level_0_spell_per_day.should.equal(0);
                        res.body[0].level_0_bonus_spells.should.equal(0);
                        res.body[0].level_0_spell_save_dc.should.equal(0);
                        res.body[0].level_0_spells_known.should.equal(0);
                        res.body[0].level_1_spell_per_day.should.equal(0);
                        res.body[0].level_1_bonus_spells.should.equal(0);
                        res.body[0].level_1_spell_save_dc.should.equal(0);
                        res.body[0].level_1_spells_known.should.equal(0);
                        res.body[0].level_2_spell_per_day.should.equal(0);
                        res.body[0].level_2_bonus_spells.should.equal(0);
                        res.body[0].level_2_spell_save_dc.should.equal(0);
                        res.body[0].level_2_spells_known.should.equal(0);
                        res.body[0].level_3_spell_per_day.should.equal(0);
                        res.body[0].level_3_bonus_spells.should.equal(0);
                        res.body[0].level_3_spell_save_dc.should.equal(0);
                        res.body[0].level_3_spells_known.should.equal(0);
                        res.body[0].level_4_spell_per_day.should.equal(0);
                        res.body[0].level_4_bonus_spells.should.equal(0);
                        res.body[0].level_4_spell_save_dc.should.equal(0);
                        res.body[0].level_4_spells_known.should.equal(0);
                        res.body[0].level_5_spell_per_day.should.equal(0);
                        res.body[0].level_5_bonus_spells.should.equal(0);
                        res.body[0].level_5_spell_save_dc.should.equal(0);
                        res.body[0].level_5_spells_known.should.equal(0);
                        res.body[0].level_6_spell_per_day.should.equal(0);
                        res.body[0].level_6_bonus_spells.should.equal(0);
                        res.body[0].level_6_spell_save_dc.should.equal(0);
                        res.body[0].level_6_spells_known.should.equal(0);
                        res.body[0].level_7_spell_per_day.should.equal(0);
                        res.body[0].level_7_bonus_spells.should.equal(0);
                        res.body[0].level_7_spell_save_dc.should.equal(0);
                        res.body[0].level_7_spells_known.should.equal(0);
                        res.body[0].level_8_spell_per_day.should.equal(0);
                        res.body[0].level_8_bonus_spells.should.equal(0);
                        res.body[0].level_8_spell_save_dc.should.equal(0);
                        res.body[0].level_8_spells_known.should.equal(0);
                        res.body[0].level_9_spell_per_day.should.equal(0);
                        res.body[0].level_9_bonus_spells.should.equal(0);
                        res.body[0].level_9_spell_save_dc.should.equal(0);
                        res.body[0].level_9_spells_known.should.equal(0);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should GET character', function(done) {
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
                    agent.get('/character/' + characterId)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.name.should.equal(characterName);
                        res.body.ability_score_str.should.equal(10);
                        res.body.ability_score_dex.should.equal(10);
                        res.body.ability_score_con.should.equal(10);
                        res.body.ability_score_int.should.equal(10);
                        res.body.ability_score_wis.should.equal(10);
                        res.body.ability_score_cha.should.equal(10);
                        res.body.ability_score_str_temp.should.equal(0);
                        res.body.ability_score_dex_temp.should.equal(0);
                        res.body.ability_score_con_temp.should.equal(0);
                        res.body.ability_score_int_temp.should.equal(0);
                        res.body.ability_score_wis_temp.should.equal(0);
                        res.body.ability_score_cha_temp.should.equal(0);
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
                        res.body.will_temp_mod.should.equal(0);
                        res.body.init_misc_mod.should.equal(0);
                        res.body.weight.should.equal(0);
                        res.body.height.should.equal(0);
                        res.body.damage_reduction.should.equal(0);
                        res.body.spell_resistance.should.equal(0);
                        res.body.size_mod.should.equal(0);
                        res.body.xp_points.should.equal(0);
                        res.body.next_level.should.equal(0);
                        res.body.money_cp.should.equal(0);
                        res.body.money_sp.should.equal(0);
                        res.body.money_gp.should.equal(0);
                        res.body.money_pp.should.equal(0);
                        res.body.light_load.should.equal(0);
                        res.body.medium_load.should.equal(0);
                        res.body.heavy_load.should.equal(0);
                        res.body.lift_over_head.should.equal(0);
                        res.body.lift_off_ground.should.equal(0);
                        res.body.drag_or_push.should.equal(0);
                        res.body.age.should.equal(0);
                        res.body.gender.should.equal('GENDER');
                        res.body.hair.should.equal('HAIR');
                        res.body.eyes.should.equal('EYES');
                        res.body.deity.should.equal('DEITY');
                        res.body.alignment.should.equal('ALIGNMENT');
                        res.body.homeland.should.equal('HOMELAND');
                        res.body.background_stories.should.equal('BACKGROUND');
                        res.body.languages.should.equal('LANGUAGES');
                        res.body.domain_and_specialty_school.should.equal('Domain and/or Specialty School');
                        res.body.level_0_spell_per_day.should.equal(0);
                        res.body.level_0_bonus_spells.should.equal(0);
                        res.body.level_0_spell_save_dc.should.equal(0);
                        res.body.level_0_spells_known.should.equal(0);
                        res.body.level_1_spell_per_day.should.equal(0);
                        res.body.level_1_bonus_spells.should.equal(0);
                        res.body.level_1_spell_save_dc.should.equal(0);
                        res.body.level_1_spells_known.should.equal(0);
                        res.body.level_2_spell_per_day.should.equal(0);
                        res.body.level_2_bonus_spells.should.equal(0);
                        res.body.level_2_spell_save_dc.should.equal(0);
                        res.body.level_2_spells_known.should.equal(0);
                        res.body.level_3_spell_per_day.should.equal(0);
                        res.body.level_3_bonus_spells.should.equal(0);
                        res.body.level_3_spell_save_dc.should.equal(0);
                        res.body.level_3_spells_known.should.equal(0);
                        res.body.level_4_spell_per_day.should.equal(0);
                        res.body.level_4_bonus_spells.should.equal(0);
                        res.body.level_4_spell_save_dc.should.equal(0);
                        res.body.level_4_spells_known.should.equal(0);
                        res.body.level_5_spell_per_day.should.equal(0);
                        res.body.level_5_bonus_spells.should.equal(0);
                        res.body.level_5_spell_save_dc.should.equal(0);
                        res.body.level_5_spells_known.should.equal(0);
                        res.body.level_6_spell_per_day.should.equal(0);
                        res.body.level_6_bonus_spells.should.equal(0);
                        res.body.level_6_spell_save_dc.should.equal(0);
                        res.body.level_6_spells_known.should.equal(0);
                        res.body.level_7_spell_per_day.should.equal(0);
                        res.body.level_7_bonus_spells.should.equal(0);
                        res.body.level_7_spell_save_dc.should.equal(0);
                        res.body.level_7_spells_known.should.equal(0);
                        res.body.level_8_spell_per_day.should.equal(0);
                        res.body.level_8_bonus_spells.should.equal(0);
                        res.body.level_8_spell_save_dc.should.equal(0);
                        res.body.level_8_spells_known.should.equal(0);
                        res.body.level_9_spell_per_day.should.equal(0);
                        res.body.level_9_bonus_spells.should.equal(0);
                        res.body.level_9_spell_save_dc.should.equal(0);
                        res.body.level_9_spells_known.should.equal(0);
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
                        ability_score_str: 13,
                        ability_score_dex: 14,
                        ability_score_con: 16,
                        ability_score_int: 17,
                        ability_score_wis: 18,
                        ability_score_cha: 12,
                        ability_score_str_temp: 4,
                        ability_score_dex_temp: 0,
                        ability_score_con_temp: -2,
                        ability_score_int_temp: 2,
                        ability_score_wis_temp: 0,
                        ability_score_cha_temp: 0,
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
                        will_temp_mod: 0,
                        init_misc_mod: 0,
                        weight: 0,
                        height: 0,
                        damage_reduction: 0,
                        spell_resistance: 0,
                        size_mod: 0,
                        xp_points: 0,
                        next_level: 0,
                        money_cp: 0,
                        money_sp: 0,
                        money_gp: 0,
                        money_pp: 0,
                        light_load: 0,
                        medium_load: 0,
                        heavy_load: 0,
                        lift_over_head: 0,
                        lift_off_ground: 0,
                        drag_or_push: 0,
                        age: 100,
                        gender: 'male',
                        hair: 'black',
                        eyes: 'brown',
                        deity: 'god',
                        alignment: 'lawful good',
                        homeland: 'home',
                        background_stories: 'live here.',
                        languages: 'common, orc',
                        domain_and_specialty_school: 'all magic',
                        level_0_spell_per_day: 2,
                        level_0_bonus_spells: 2,
                        level_0_spell_save_dc: 2,
                        level_0_spells_known: 2,
                        level_1_spell_per_day: 2,
                        level_1_bonus_spells: 2,
                        level_1_spell_save_dc: 2,
                        level_1_spells_known: 2,
                        level_2_spell_per_day: 2,
                        level_2_bonus_spells: 2,
                        level_2_spell_save_dc: 2,
                        level_2_spells_known: 2,
                        level_3_spell_per_day: 2,
                        level_3_bonus_spells: 2,
                        level_3_spell_save_dc: 2,
                        level_3_spells_known: 2,
                        level_4_spell_per_day: 2,
                        level_4_bonus_spells: 2,
                        level_4_spell_save_dc: 2,
                        level_4_spells_known: 2,
                        level_5_spell_per_day: 2,
                        level_5_bonus_spells: 2,
                        level_5_spell_save_dc: 2,
                        level_5_spells_known: 2,
                        level_6_spell_per_day: 2,
                        level_6_bonus_spells: 2,
                        level_6_spell_save_dc: 2,
                        level_6_spells_known: 2,
                        level_7_spell_per_day: 2,
                        level_7_bonus_spells: 2,
                        level_7_spell_save_dc: 2,
                        level_7_spells_known: 2,
                        level_8_spell_per_day: 2,
                        level_8_bonus_spells: 2,
                        level_8_spell_save_dc: 2,
                        level_8_spells_known: 2,
                        level_9_spell_per_day: 2,
                        level_9_bonus_spells: 2,
                        level_9_spell_save_dc: 2,
                        level_9_spells_known: 2
                    };
                    agent.put('/character')
                    .send(changes)
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        res.body.name.should.equal(changes.name);
                        res.body.ability_score_str.should.equal(changes.ability_score_str);
                        res.body.ability_score_dex.should.equal(changes.ability_score_dex);
                        res.body.ability_score_con.should.equal(changes.ability_score_con);
                        res.body.ability_score_int.should.equal(changes.ability_score_int);
                        res.body.ability_score_wis.should.equal(changes.ability_score_wis);
                        res.body.ability_score_cha.should.equal(changes.ability_score_cha);
                        res.body.ability_score_str_temp.should.equal(changes.ability_score_str_temp);
                        res.body.ability_score_dex_temp.should.equal(changes.ability_score_dex_temp);
                        res.body.ability_score_con_temp.should.equal(changes.ability_score_con_temp);
                        res.body.ability_score_int_temp.should.equal(changes.ability_score_int_temp);
                        res.body.ability_score_wis_temp.should.equal(changes.ability_score_wis_temp);
                        res.body.ability_score_cha_temp.should.equal(changes.ability_score_cha_temp);
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
                        res.body.init_misc_mod.should.equal(changes.init_misc_mod);
                        res.body.weight.should.equal(changes.weight);
                        res.body.height.should.equal(changes.height);
                        res.body.damage_reduction.should.equal(changes.damage_reduction);
                        res.body.spell_resistance.should.equal(changes.spell_resistance);
                        res.body.size_mod.should.equal(changes.size_mod);
                        res.body.xp_points.should.equal(changes.xp_points);
                        res.body.next_level.should.equal(changes.next_level);
                        res.body.money_cp.should.equal(changes.money_cp);
                        res.body.money_sp.should.equal(changes.money_sp);
                        res.body.money_gp.should.equal(changes.money_gp);
                        res.body.money_pp.should.equal(changes.money_pp);
                        res.body.light_load.should.equal(changes.light_load);
                        res.body.medium_load.should.equal(changes.medium_load);
                        res.body.heavy_load.should.equal(changes.heavy_load);
                        res.body.lift_over_head.should.equal(changes.lift_over_head);
                        res.body.lift_off_ground.should.equal(changes.lift_off_ground);
                        res.body.drag_or_push.should.equal(changes.drag_or_push);
                        res.body.age.should.equal(changes.age);
                        res.body.gender.should.equal(changes.gender);
                        res.body.hair.should.equal(changes.hair);
                        res.body.eyes.should.equal(changes.eyes);
                        res.body.deity.should.equal(changes.deity);
                        res.body.alignment.should.equal(changes.alignment);
                        res.body.homeland.should.equal(changes.homeland);
                        res.body.background_stories.should.equal(changes.background_stories);
                        res.body.languages.should.equal(changes.languages);
                        res.body.domain_and_specialty_school.should.equal(changes.domain_and_specialty_school);
                        res.body.level_0_spell_per_day.should.equal(changes.level_0_spell_per_day);
                        res.body.level_0_bonus_spells.should.equal(changes.level_0_bonus_spells);
                        res.body.level_0_spell_save_dc.should.equal(changes.level_0_spell_save_dc);
                        res.body.level_0_spells_known.should.equal(changes.level_0_spells_known);
                        res.body.level_1_spell_per_day.should.equal(changes.level_1_spell_per_day);
                        res.body.level_1_bonus_spells.should.equal(changes.level_1_bonus_spells);
                        res.body.level_1_spell_save_dc.should.equal(changes.level_1_spell_save_dc);
                        res.body.level_1_spells_known.should.equal(changes.level_1_spells_known);
                        res.body.level_2_spell_per_day.should.equal(changes.level_2_spell_per_day);
                        res.body.level_2_bonus_spells.should.equal(changes.level_2_bonus_spells);
                        res.body.level_2_spell_save_dc.should.equal(changes.level_2_spell_save_dc);
                        res.body.level_2_spells_known.should.equal(changes.level_2_spells_known);
                        res.body.level_3_spell_per_day.should.equal(changes.level_3_spell_per_day);
                        res.body.level_3_bonus_spells.should.equal(changes.level_3_bonus_spells);
                        res.body.level_3_spell_save_dc.should.equal(changes.level_3_spell_save_dc);
                        res.body.level_3_spells_known.should.equal(changes.level_3_spells_known);
                        res.body.level_4_spell_per_day.should.equal(changes.level_4_spell_per_day);
                        res.body.level_4_bonus_spells.should.equal(changes.level_4_bonus_spells);
                        res.body.level_4_spell_save_dc.should.equal(changes.level_4_spell_save_dc);
                        res.body.level_4_spells_known.should.equal(changes.level_4_spells_known);
                        res.body.level_5_spell_per_day.should.equal(changes.level_5_spell_per_day);
                        res.body.level_5_bonus_spells.should.equal(changes.level_5_bonus_spells);
                        res.body.level_5_spell_save_dc.should.equal(changes.level_5_spell_save_dc);
                        res.body.level_5_spells_known.should.equal(changes.level_5_spells_known);
                        res.body.level_6_spell_per_day.should.equal(changes.level_6_spell_per_day);
                        res.body.level_6_bonus_spells.should.equal(changes.level_6_bonus_spells);
                        res.body.level_6_spell_save_dc.should.equal(changes.level_6_spell_save_dc);
                        res.body.level_6_spells_known.should.equal(changes.level_6_spells_known);
                        res.body.level_7_spell_per_day.should.equal(changes.level_7_spell_per_day);
                        res.body.level_7_bonus_spells.should.equal(changes.level_7_bonus_spells);
                        res.body.level_7_spell_save_dc.should.equal(changes.level_7_spell_save_dc);
                        res.body.level_7_spells_known.should.equal(changes.level_7_spells_known);
                        res.body.level_8_spell_per_day.should.equal(changes.level_8_spell_per_day);
                        res.body.level_8_bonus_spells.should.equal(changes.level_8_bonus_spells);
                        res.body.level_8_spell_save_dc.should.equal(changes.level_8_spell_save_dc);
                        res.body.level_8_spells_known.should.equal(changes.level_8_spells_known);
                        res.body.level_9_spell_per_day.should.equal(changes.level_9_spell_per_day);
                        res.body.level_9_bonus_spells.should.equal(changes.level_9_bonus_spells);
                        res.body.level_9_spell_save_dc.should.equal(changes.level_9_spell_save_dc);
                        res.body.level_9_spells_known.should.equal(changes.level_9_spells_known);
                        done();
                    });
                }).catch(function(error) {
                    done(error);
                });
            });
        });

        it('should delete character on delete', function(done) {
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
                    agent.delete('/character')
                    .send({
                        _characterId: characterId
                    })
                    .end(function (error, res) {
                        if (error) {return done(error)}
                        res.should.have.status(200);
                        Character.findOne({
                            _id: characterId,
                            _userId: user.id
                        }, function(error, character) {
                            if (error) {
                                done(error);
                            } else {
                                if (character == null) {
                                    done();
                                } else {
                                    var error = new Error("Character didn't delete");
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
'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	characterActions = require('../actions/character.actions'),
	Nav = require('./nav.component'),
	FeatContainer = require('./feat-container.component'),
	AcitemContainer = require('./acitem-container.component');

var character = React.createClass({
	getInitialState: function() {
		var state = {};
		state._id = false;
		return state;
	},
	componentDidMount: function() {
		if (this.props.params._characterId) {
			this.props.dispatch(characterActions.getCharacter(this.props.params._characterId));
		}
	},
	editField: function(that) {
		var state = this.state;
		state[that.target.name] = that.target.value;
		this.setState(state);
	},
	saveCharacter: function(event) {
		event.preventDefault();
		this.props.dispatch(characterActions.updateCharacter(this.state, this.props.character));
	},
	deleteCharacter: function() {
		this.props.dispatch(characterActions.deleteCharacter(this.props.character._id, this.props.history));
	},
	render: function() {
		if (Object.keys(this.props.params).length == 0) {
			this.props.history.replace('/user');
		}
		if (!this.state._id) {
			if (this.props.character.name) {
				this.setState(this.props.character);
			}
		}
		return (
		    <div className="character-page">
		    	<Nav />
		    	<h1>Character</h1>
		    	<p>{this.props.character.name}</p>
		    	<p>{this.state.name}</p>
				<div createClass="character" >
				    <div>
				        <label>Name:</label>
						<input type="text" name="name" onChange={this.editField} value={this.state.name} />
						<label>ability_score_str:</label>
						<input type="text" name="ability_score_str" onChange={this.editField} value={this.state.ability_score_str} />
						<label>ability_score_dex:</label>
						<input type="text" name="ability_score_dex" onChange={this.editField} value={this.state.ability_score_dex} />
						<label>ability_score_con:</label>
						<input type="text" name="ability_score_con" onChange={this.editField} value={this.state.ability_score_con} />
						<label>ability_score_int:</label>
						<input type="text" name="ability_score_int" onChange={this.editField} value={this.state.ability_score_int} />
						<label>ability_score_wis:</label>
						<input type="text" name="ability_score_wis" onChange={this.editField} value={this.state.ability_score_wis} />
						<label>ability_score_cha:</label>
						<input type="text" name="ability_score_cha" onChange={this.editField} value={this.state.ability_score_cha} />
						<label>ability_score_str_temp:</label>
						<input type="text" name="ability_score_str_temp" onChange={this.editField} value={this.state.ability_score_str_temp} />
						<label>ability_score_dex_temp:</label>
						<input type="text" name="ability_score_dex_temp" onChange={this.editField} value={this.state.ability_score_dex_temp} />
						<label>ability_score_con_temp:</label>
						<input type="text" name="ability_score_con_temp" onChange={this.editField} value={this.state.ability_score_con_temp} />
						<label>ability_score_int_temp:</label>
						<input type="text" name="ability_score_int_temp" onChange={this.editField} value={this.state.ability_score_int_temp} />
						<label>ability_score_wis_temp:</label>
						<input type="text" name="ability_score_wis_temp" onChange={this.editField} value={this.state.ability_score_wis_temp} />
						<label>ability_score_cha_temp:</label>
						<input type="text" name="ability_score_cha_temp" onChange={this.editField} value={this.state.ability_score_cha_temp} />
						<label>race:</label>
						<input type="text" name="race" onChange={this.editField} value={this.state.race} />
						<label>size:</label>
						<input type="text" name="size" onChange={this.editField} value={this.state.size} />
						<label>class:</label>
						<input type="text" name="class" onChange={this.editField} value={this.state.class} />
						<label>level:</label>
						<input type="text" name="level" onChange={this.editField} value={this.state.level} />
						<label>base_attack_bonus:</label>
						<input type="text" name="base_attack_bonus" onChange={this.editField} value={this.state.base_attack_bonus} />
						<label>hit_points:</label>
						<input type="text" name="hit_points" onChange={this.editField} value={this.state.hit_points} />
						<label>land_speed:</label>
						<input type="text" name="land_speed" onChange={this.editField} value={this.state.land_speed} />
						<label>armor_speed:</label>
						<input type="text" name="armor_speed" onChange={this.editField} value={this.state.armor_speed} />
						<label>fly_speed:</label>
						<input type="text" name="fly_speed" onChange={this.editField} value={this.state.fly_speed} />
						<label>climb_speed:</label>
						<input type="text" name="climb_speed" onChange={this.editField} value={this.state.climb_speed} />
						<label>swim_speed:</label>
						<input type="text" name="swim_speed" onChange={this.editField} value={this.state.swim_speed} />
						<label>borrow_speed:</label>
						<input type="text" name="borrow_speed" onChange={this.editField} value={this.state.borrow_speed} />
						<label>fort_base_save:</label>
						<input type="text" name="fort_base_save" onChange={this.editField} value={this.state.fort_base_save} />
						<label>fort_magic_mod:</label>
						<input type="text" name="fort_magic_mod" onChange={this.editField} value={this.state.fort_magic_mod} />
						<label>fort_misc_mod:</label>
						<input type="text" name="fort_misc_mod" onChange={this.editField} value={this.state.fort_misc_mod} />
						<label>fort_temp_mod:</label>
						<input type="text" name="fort_temp_mod" onChange={this.editField} value={this.state.fort_temp_mod} />
						<label>ref_base_save:</label>
						<input type="text" name="ref_base_save" onChange={this.editField} value={this.state.ref_base_save} />
						<label>ref_magic_mod:</label>
						<input type="text" name="ref_magic_mod" onChange={this.editField} value={this.state.ref_magic_mod} />
						<label>ref_misc_mod:</label>
						<input type="text" name="ref_misc_mod" onChange={this.editField} value={this.state.ref_misc_mod} />
						<label>ref_temp_mod:</label>
						<input type="text" name="ref_temp_mod" onChange={this.editField} value={this.state.ref_temp_mod} />
						<label>will_base_save:</label>
						<input type="text" name="will_base_save" onChange={this.editField} value={this.state.will_base_save} />
						<label>will_magic_mod:</label>
						<input type="text" name="will_magic_mod" onChange={this.editField} value={this.state.will_magic_mod} />
						<label>will_misc_mod:</label>
						<input type="text" name="will_misc_mod" onChange={this.editField} value={this.state.will_misc_mod} />
						<label>will_temp_mod:</label>
						<input type="text" name="will_temp_mod" onChange={this.editField} value={this.state.will_temp_mod} />
						<label>init_misc_mod:</label>
						<input type="text" name="init_misc_mod" onChange={this.editField} value={this.state.init_misc_mod} />
						<label>weight:</label>
						<input type="text" name="weight" onChange={this.editField} value={this.state.weight} />
						<label>height:</label>
						<input type="text" name="height" onChange={this.editField} value={this.state.height} />
						<label>damage_reduction:</label>
						<input type="text" name="damage_reduction" onChange={this.editField} value={this.state.damage_reduction} />
						<label>spell_resistance:</label>
						<input type="text" name="spell_resistance" onChange={this.editField} value={this.state.spell_resistance} />
						<label>size_mod:</label>
						<input type="text" name="size_mod" onChange={this.editField} value={this.state.size_mod} />
						<label>xp_points:</label>
						<input type="text" name="xp_points" onChange={this.editField} value={this.state.xp_points} />
						<label>next_level:</label>
						<input type="text" name="next_level" onChange={this.editField} value={this.state.next_level} />
						<label>money_cp:</label>
						<input type="text" name="money_cp" onChange={this.editField} value={this.state.money_cp} />
						<label>money_sp:</label>
						<input type="text" name="money_sp" onChange={this.editField} value={this.state.money_sp} />
						<label>money_gp:</label>
						<input type="text" name="money_gp" onChange={this.editField} value={this.state.money_gp} />
						<label>money_pp:</label>
						<input type="text" name="money_pp" onChange={this.editField} value={this.state.money_pp} />
						<label>light_load:</label>
						<input type="text" name="light_load" onChange={this.editField} value={this.state.light_load} />
						<label>medium_load:</label>
						<input type="text" name="medium_load" onChange={this.editField} value={this.state.medium_load} />
						<label>heavy_load:</label>
						<input type="text" name="heavy_load" onChange={this.editField} value={this.state.heavy_load} />
						<label>lift_over_head:</label>
						<input type="text" name="lift_over_head" onChange={this.editField} value={this.state.lift_over_head} />
						<label>lift_off_ground:</label>
						<input type="text" name="lift_off_ground" onChange={this.editField} value={this.state.lift_off_ground} />
						<label>drag_or_push:</label>
						<input type="text" name="drag_or_push" onChange={this.editField} value={this.state.drag_or_push} />
						<label>age:</label>
						<input type="text" name="age" onChange={this.editField} value={this.state.age} />
						<label>gender:</label>
						<input type="text" name="gender" onChange={this.editField} value={this.state.gender} />
						<label>hair:</label>
						<input type="text" name="hair" onChange={this.editField} value={this.state.hair} />
						<label>eyes:</label>
						<input type="text" name="eyes" onChange={this.editField} value={this.state.eyes} />
						<label>deity:</label>
						<input type="text" name="deity" onChange={this.editField} value={this.state.deity} />
						<label>alignment:</label>
						<input type="text" name="alignment" onChange={this.editField} value={this.state.alignment} />
						<label>homeland:</label>
						<input type="text" name="homeland" onChange={this.editField} value={this.state.homeland} />
						<label>background_stories:</label>
						<input type="text" name="background_stories" onChange={this.editField} value={this.state.background_stories} />
						<label>languages:</label>
						<input type="text" name="languages" onChange={this.editField} value={this.state.languages} />
						<label>domain_and_specialty_school:</label>
						<input type="text" name="domain_and_specialty_school" onChange={this.editField} value={this.state.domain_and_specialty_school} />
						<label>level_0_spell_per_day:</label>
						<input type="text" name="level_0_spell_per_day" onChange={this.editField} value={this.state.level_0_spell_per_day} />
						<label>level_0_bonus_spells:</label>
						<input type="text" name="level_0_bonus_spells" onChange={this.editField} value={this.state.level_0_bonus_spells} />
						<label>level_0_spell_save_dc:</label>
						<input type="text" name="level_0_spell_save_dc" onChange={this.editField} value={this.state.level_0_spell_save_dc} />
						<label>level_0_spells_known:</label>
						<input type="text" name="level_0_spells_known" onChange={this.editField} value={this.state.level_0_spells_known} />
						<label>level_1_spell_per_day:</label>
						<input type="text" name="level_1_spell_per_day" onChange={this.editField} value={this.state.level_1_spell_per_day} />
						<label>level_1_bonus_spells:</label>
						<input type="text" name="level_1_bonus_spells" onChange={this.editField} value={this.state.level_1_bonus_spells} />
						<label>level_1_spell_save_dc:</label>
						<input type="text" name="level_1_spell_save_dc" onChange={this.editField} value={this.state.level_1_spell_save_dc} />
						<label>level_1_spells_known:</label>
						<input type="text" name="level_1_spells_known" onChange={this.editField} value={this.state.level_1_spells_known} />
						<label>level_2_spell_per_day:</label>
						<input type="text" name="level_2_spell_per_day" onChange={this.editField} value={this.state.level_2_spell_per_day} />
						<label>level_2_bonus_spells:</label>
						<input type="text" name="level_2_bonus_spells" onChange={this.editField} value={this.state.level_2_bonus_spells} />
						<label>level_2_spell_save_dc:</label>
						<input type="text" name="level_2_spell_save_dc" onChange={this.editField} value={this.state.level_2_spell_save_dc} />
						<label>level_2_spells_known:</label>
						<input type="text" name="level_2_spells_known" onChange={this.editField} value={this.state.level_2_spells_known} />
						<label>level_3_spell_per_day:</label>
						<input type="text" name="level_3_spell_per_day" onChange={this.editField} value={this.state.level_3_spell_per_day} />
						<label>level_3_bonus_spells:</label>
						<input type="text" name="level_3_bonus_spells" onChange={this.editField} value={this.state.level_3_bonus_spells} />
						<label>level_3_spell_save_dc:</label>
						<input type="text" name="level_3_spell_save_dc" onChange={this.editField} value={this.state.level_3_spell_save_dc} />
						<label>level_3_spells_known:</label>
						<input type="text" name="level_3_spells_known" onChange={this.editField} value={this.state.level_3_spells_known} />
						<label>level_4_spell_per_day:</label>
						<input type="text" name="level_4_spell_per_day" onChange={this.editField} value={this.state.level_4_spell_per_day} />
						<label>level_4_bonus_spells:</label>
						<input type="text" name="level_4_bonus_spells" onChange={this.editField} value={this.state.level_4_bonus_spells} />
						<label>level_4_spell_save_dc:</label>
						<input type="text" name="level_4_spell_save_dc" onChange={this.editField} value={this.state.level_4_spell_save_dc} />
						<label>level_4_spells_known:</label>
						<input type="text" name="level_4_spells_known" onChange={this.editField} value={this.state.level_4_spells_known} />
						<label>level_5_spell_per_day:</label>
						<input type="text" name="level_5_spell_per_day" onChange={this.editField} value={this.state.level_5_spell_per_day} />
						<label>level_5_bonus_spells:</label>
						<input type="text" name="level_5_bonus_spells" onChange={this.editField} value={this.state.level_5_bonus_spells} />
						<label>level_5_spell_save_dc:</label>
						<input type="text" name="level_5_spell_save_dc" onChange={this.editField} value={this.state.level_5_spell_save_dc} />
						<label>level_5_spells_known:</label>
						<input type="text" name="level_5_spells_known" onChange={this.editField} value={this.state.level_5_spells_known} />
						<label>level_6_spell_per_day:</label>
						<input type="text" name="level_6_spell_per_day" onChange={this.editField} value={this.state.level_6_spell_per_day} />
						<label>level_6_bonus_spells:</label>
						<input type="text" name="level_6_bonus_spells" onChange={this.editField} value={this.state.level_6_bonus_spells} />
						<label>level_6_spell_save_dc:</label>
						<input type="text" name="level_6_spell_save_dc" onChange={this.editField} value={this.state.level_6_spell_save_dc} />
						<label>level_6_spells_known:</label>
						<input type="text" name="level_6_spells_known" onChange={this.editField} value={this.state.level_6_spells_known} />
						<label>level_7_spell_per_day:</label>
						<input type="text" name="level_7_spell_per_day" onChange={this.editField} value={this.state.level_7_spell_per_day} />
						<label>level_7_bonus_spells:</label>
						<input type="text" name="level_7_bonus_spells" onChange={this.editField} value={this.state.level_7_bonus_spells} />
						<label>level_7_spell_save_dc:</label>
						<input type="text" name="level_7_spell_save_dc" onChange={this.editField} value={this.state.level_7_spell_save_dc} />
						<label>level_7_spells_known:</label>
						<input type="text" name="level_7_spells_known" onChange={this.editField} value={this.state.level_7_spells_known} />
						<label>level_8_spell_per_day:</label>
						<input type="text" name="level_8_spell_per_day" onChange={this.editField} value={this.state.level_8_spell_per_day} />
						<label>level_8_bonus_spells:</label>
						<input type="text" name="level_8_bonus_spells" onChange={this.editField} value={this.state.level_8_bonus_spells} />
						<label>level_8_spell_save_dc:</label>
						<input type="text" name="level_8_spell_save_dc" onChange={this.editField} value={this.state.level_8_spell_save_dc} />
						<label>level_8_spells_known:</label>
						<input type="text" name="level_8_spells_known" onChange={this.editField} value={this.state.level_8_spells_known} />
						<label>level_9_spell_per_day:</label>
						<input type="text" name="level_9_spell_per_day" onChange={this.editField} value={this.state.level_9_spell_per_day} />
						<label>level_9_bonus_spells:</label>
						<input type="text" name="level_9_bonus_spells" onChange={this.editField} value={this.state.level_9_bonus_spells} />
						<label>level_9_spell_save_dc:</label>
						<input type="text" name="level_9_spell_save_dc" onChange={this.editField} value={this.state.level_9_spell_save_dc} />
						<label>level_9_spells_known:</label>
						<input type="text" name="level_9_spells_known" onChange={this.editField} value={this.state.level_9_spells_known} />
				    </div>
				    <FeatContainer _characterId={this.props.params._characterId} />
				    <AcitemContainer _characterId={this.props.params._characterId} />
				    <div>
				        <input type="button" onClick={this.saveCharacter} value="SAVE"/>
				        <input type="button" value="DELETE" onClick={this.deleteCharacter} />
				    </div>
				</div>
		    </div>
		);
	}
});


var mapStateToProps = function(state, props) {
    return {
    	character: state.character.character
    };
};

var Container = connect(mapStateToProps)(character);

module.exports = Container;
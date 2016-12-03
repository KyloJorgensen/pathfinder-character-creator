'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	characterActions = require('../actions/character.actions'),
	userActions = require('../actions/user.actions'),
	Nav = require('./nav.component'),
	interactiveContainer = require('./interactive-container.component'),
	interactives = require('../interactives'),
	AcitemContainer = require('./interactive-container.component')(interactives.ACITEM),
	FeatContainer = require('./interactive-container.component')(interactives.FEAT),
	FeatureContainer = require('./interactive-container.component')(interactives.FEATURE),
	GearContainer = require('./interactive-container.component')(interactives.GEAR),
	SkillContainer = require('./interactive-container.component')(interactives.SKILL),
	SpellContainer = require('./interactive-container.component')(interactives.SPELL),
	WeaponContainer = require('./interactive-container.component')(interactives.WEAPON);

var modifer = function(ability, temp) {
	var mod = Number(ability) + Number(temp || 0) - 10;
	if (Math.abs(mod) % 2 == 1) {
		mod--;
	} 
	mod /= 2;
	return mod;
};

var character = React.createClass({
	getInitialState: function() {
		var state = {};
		state._id = false;
		return state;
	},
	componentDidMount: function() {
		this.props.dispatch(userActions.getUserName(this.props.history));
		if (this.props.params._characterId) {
			this.props.dispatch(characterActions.getCharacter(this.props.params._characterId, this.props.history));
		}
	},
	editField: function(that) {
		var state = this.state;
		state[that.target.name] = that.target.value;
		this.setState(state);
	},
	saveCharacter: function() {
		this.props.dispatch(characterActions.updateCharacter(this.state, this.props.character));
	},
	deleteCharacter: function() {
		this.props.dispatch(characterActions.deleteCharacter(this.props.character._id, this.props.history));
	},
	hitKey: function(event) {
		if (event.key == 'Enter') {
            this.saveCharacter();
        }
	},
	select: function(event) {
		event.target.select();
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
			<div className="character-page-wrapper">
		    	<Nav />
		    	<div className="character-page">
		    		<div id="banner">
			    		<div className="container">
			    			<div className="character-menu">
				    			<div>
					    			<h1>Character</h1>
					    			<h2>{this.props.character.name} - {this.props.character.class} {this.props.character.race} {this.props.character.level} </h2>
					    			<p>Click on any field you want to edit.</p>
									<div>
										<a onClick={this.saveCharacter}>SAVE</a>
										<a onClick={this.deleteCharacter}>DELETE</a>
									</div>
								</div>
				    		</div>
				    	</div>
				    </div>
				    <div id="character">
			    		<div className="container">
							<div className="character" >
							    <header className="character-header">
							        <div>
							        	<label>Name:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="name" onChange={this.editField} value={this.state.name} />
									</div>
									<div>
										<label>Class:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="class" onChange={this.editField} value={this.state.class} />
									</div>
									<div>
										<label>Level:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level" onChange={this.editField} value={this.state.level} />
									</div>
									<div>
										<label>Race:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="race" onChange={this.editField} value={this.state.race} />
									</div>
									<div>
										<label>Alignment:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="alignment" onChange={this.editField} value={this.state.alignment} />
									</div>
									<div>
										<label>Deity:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="deity" onChange={this.editField} value={this.state.deity} />
									</div>
									<div>
										<label>Homeland:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="homeland" onChange={this.editField} value={this.state.homeland} />
									</div>
									<div>
										<label>Size:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="size" onChange={this.editField} value={this.state.size} />
									</div>
									<div>
										<label>Gender:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="gender" onChange={this.editField} value={this.state.gender} />
									</div>
									<div>
										<label>Age:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="age" onChange={this.editField} value={this.state.age} />
									</div>
									<div>
										<label>Weight:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="weight" onChange={this.editField} value={this.state.weight} />
									</div>
									<div>
										<label>Height:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="height" onChange={this.editField} value={this.state.height} />
									</div>
									<div>
										<label>Hair:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="hair" onChange={this.editField} value={this.state.hair} />
									</div>
									<div>
										<label>Eyes:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="eyes" onChange={this.editField} value={this.state.eyes} />
									</div>
								</header>
								<main>
									<section className="column-left">
										<div className="health">
											<div>
												<label>hit points:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="hit_points" onChange={this.editField} value={this.state.hit_points} />
											</div>
											<div>
												<label>current:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="current_hit_points" onChange={this.editField} value={this.state.current_hit_points} />
											</div>
										</div>
										<table className="ability-scores">
											<tr>
												<th>Ability Name</th>
												<th>Ability Score</th>
												<th>Ability Modifier</th>
												<th>Temp Adjustment</th>
												<th>Temp Modifier</th>
											</tr>
											<tr>
												<td>STR</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_str" onChange={this.editField} value={this.state.ability_score_str} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_str)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_str_temp" onChange={this.editField} value={this.state.ability_score_str_temp} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_str, this.state.ability_score_str_temp)} readOnly /></td>
											</tr>
											<tr>
												<td>DEX</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_dex" onChange={this.editField} value={this.state.ability_score_dex} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_dex)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_dex_temp" onChange={this.editField} value={this.state.ability_score_dex_temp} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp)} readOnly /></td>
											</tr>
											<tr>
												<td>CON</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_con" onChange={this.editField} value={this.state.ability_score_con} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_con)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_con_temp" onChange={this.editField} value={this.state.ability_score_con_temp} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_con, this.state.ability_score_con_temp)} readOnly /></td>
											</tr>
											<tr>
												<td>INT</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_int" onChange={this.editField} value={this.state.ability_score_int} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_int)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_int_temp" onChange={this.editField} value={this.state.ability_score_int_temp} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_int, this.state.ability_score_int_temp)} readOnly /></td>
											</tr>
											<tr>
												<td>WIS</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_wis" onChange={this.editField} value={this.state.ability_score_wis} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_wis)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_wis_temp" onChange={this.editField} value={this.state.ability_score_wis_temp} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_wis, this.state.ability_score_wis_temp)} readOnly /></td>
											</tr>
											<tr>
												<td>CHA</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_cha" onChange={this.editField} value={this.state.ability_score_cha} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_cha)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ability_score_cha_temp" onChange={this.editField} value={this.state.ability_score_cha_temp} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_cha, this.state.ability_score_cha_temp)} readOnly /></td>
											</tr>
										</table>
										<div className="AC-wrapper">
											<label>armor class</label>
											<table className="AC">
												<tr>
													<th>total</th>
													<th>armor</th>
													<th>shild</th>
													<th>dex</th>
													<th>size</th>
													<th>natural</th>
													<th>deflection</th>
													<th>misc</th>
												</tr>
												<tr>
													<td><input onFocus={this.select} type="text" value={(Number(this.state.size_mod) + modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp) + Number(this.state.ac_armor_bonus) + Number(this.state.ac_shild_bonus) + Number(this.state.ac_natural_armor) + Number(this.state.ac_defelection_mod) + Number(this.state.ac_misc_mod)+ 10)} readOnly /></td>
													<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="ac_armor_bonus" onChange={this.editField} value={this.state.ac_armor_bonus} /></td>
													<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="ac_shild_bonus" onChange={this.editField} value={this.state.ac_shild_bonus} /></td>
													<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp)} readOnly /></td>
													<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="size_mod" onChange={this.editField} value={this.state.size_mod} /></td>
													<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="ac_natural_armor" onChange={this.editField} value={this.state.ac_natural_armor} /></td>
													<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="ac_defelection_mod" onChange={this.editField} value={this.state.ac_defelection_mod} /></td>
													<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="ac_misc_mod" onChange={this.editField} value={this.state.ac_misc_mod} /></td>
													<td> + 10 </td>
												</tr>
											</table>
										</div>
										<div className="babdrsr">
											<div>
												<label>BAB:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="base_attack_bonus" onChange={this.editField} value={this.state.base_attack_bonus} />
											</div>
											<div>
												<label>DR:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="damage_reduction" onChange={this.editField} value={this.state.damage_reduction} />
											</div>
											<div>
												<label>spell resistance:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="spell_resistance" onChange={this.editField} value={this.state.spell_resistance} />
											</div>
										</div>										
										<table className="saving-throws">
											<tr>
												<th>Saving Throws</th>
												<th>total</th>
												<th>Base</th>
												<th>Ability</th>
												<th>Magic</th>
												<th>Misc</th>
												<th>Temp</th>
											</tr>
											<tr>
												<td>Fortitude</td>
												<td>{(Number(this.state.fort_base_save) + modifer(this.state.ability_score_con, this.state.ability_score_con_temp) + Number(this.state.fort_magic_mod) + Number(this.state.fort_misc_mod) + Number(this.state.fort_temp_mod))}</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="fort_base_save" onChange={this.editField} value={this.state.fort_base_save} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_con, this.state.ability_score_con_temp)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="fort_magic_mod" onChange={this.editField} value={this.state.fort_magic_mod} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="fort_misc_mod" onChange={this.editField} value={this.state.fort_misc_mod} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="fort_temp_mod" onChange={this.editField} value={this.state.fort_temp_mod} /></td>
											</tr>
											<tr>
												<td>Reflex</td>
												<td>{(Number(this.state.ref_base_save) + modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp) + Number(this.state.ref_magic_mod) + Number(this.state.ref_misc_mod) + Number(this.state.ref_temp_mod))}</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ref_base_save" onChange={this.editField} value={this.state.ref_base_save} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ref_magic_mod" onChange={this.editField} value={this.state.ref_magic_mod} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ref_misc_mod" onChange={this.editField} value={this.state.ref_misc_mod} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="ref_temp_mod" onChange={this.editField} value={this.state.ref_temp_mod} /></td>
											</tr>
											<tr>
												<td>Will</td>
												<td>{(Number(this.state.will_base_save) + modifer(this.state.ability_score_wis, this.state.ability_score_wis_temp) + Number(this.state.will_magic_mod) + Number(this.state.will_misc_mod) + Number(this.state.will_temp_mod))}</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="will_base_save" onChange={this.editField} value={this.state.will_base_save} /></td>
												<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_wis, this.state.ability_score_wis_temp)} readOnly /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="will_magic_mod" onChange={this.editField} value={this.state.will_magic_mod} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="will_misc_mod" onChange={this.editField} value={this.state.will_misc_mod} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="will_temp_mod" onChange={this.editField} value={this.state.will_temp_mod} /></td>
											</tr>
										</table>
										<div className="initaitive-wrapper">
											<div>
												<p>initaitive</p>
											</div>
											<table className="initaitive">
												<tr>
													<th>total</th>
													<th>dex</th>
													<th>misc</th>
												</tr>
												<tr>
													<td>
														<input onFocus={this.select} type="text" value={(modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp) + Number(this.state.init_misc_mod))} readOnly />
													</td>
													<td>
														<input onFocus={this.select} type="text" value={modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp)} readOnly />
													</td>
													<td>
														<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="init_misc_mod" onChange={this.editField} value={this.state.init_misc_mod} />
													</td>
												</tr>
											</table>
										</div>
										<div className="CMB-wrapper">
											<div>
												<p>CMB</p>
											</div>
											<table className="CMB">
												<tr>
													<th>total</th>
													<th>bab</th>
													<th>str</th>
													<th>size</th>
												</tr>
												<tr>
													<td><input onFocus={this.select} type="text" value={(Number(this.state.base_attack_bonus) + modifer(this.state.ability_score_str, this.state.ability_score_str_temp) + Number(this.state.size_mod))} readOnly /></td>
													<td><input onFocus={this.select} type="text" value={this.state.base_attack_bonus} readOnly /></td>
													<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_str, this.state.ability_score_str_temp)} readOnly /></td>
													<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="size_mod" onChange={this.editField} value={this.state.size_mod} /></td>
												</tr>
											</table>
										</div>
										<div className="CMD-wrapper">
											<div>
												<p>CMD</p>
											</div>
											<table className="CMB">
												<tr>
													<th>total</th>
													<th>BAB</th>
													<th>str</th>
													<th>dex</th>
													<th>size</th>
												</tr>
												<tr>
													<td><input onFocus={this.select} type="text" value={(Number(this.state.base_attack_bonus) + modifer(this.state.ability_score_str, this.state.ability_score_str_temp) + modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp) + Number(this.state.size_mod) + 10)} readOnly /></td>
													<td><input onFocus={this.select} type="text" value={this.state.base_attack_bonus} readOnly /></td>
													<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_str, this.state.ability_score_str_temp)} readOnly /></td>
													<td><input onFocus={this.select} type="text" value={modifer(this.state.ability_score_dex, this.state.ability_score_dex_temp)} readOnly /></td>
													<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="size_mod" onChange={this.editField} value={this.state.size_mod} /></td>
													<td> + 10 </td>
												</tr>
											</table>
										</div>
										<div className="carrying-capacity">
											<div>
												<label>light load:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="light_load" onChange={this.editField} value={this.state.light_load} />
											</div>
											<div>	
												<label>medium load:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="medium_load" onChange={this.editField} value={this.state.medium_load} />
											</div>
											<div>
												<label>heavy load:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="heavy_load" onChange={this.editField} value={this.state.heavy_load} />
											</div>
											<div>
												<label>lift over head:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="lift_over_head" onChange={this.editField} value={this.state.lift_over_head} />
											</div>
											<div>
												<label>lift off ground:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="lift_off_ground" onChange={this.editField} value={this.state.lift_off_ground} />
											</div>
											<div>
												<label>drag or push:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="drag_or_push" onChange={this.editField} value={this.state.drag_or_push} />
											</div>
											<div>
												<label>copper:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="money_cp" onChange={this.editField} value={this.state.money_cp} />
											</div>
											<div>
												<label>silver:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="money_sp" onChange={this.editField} value={this.state.money_sp} />
											</div>
											<div>
												<label>gold:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="money_gp" onChange={this.editField} value={this.state.money_gp} />
											</div>
											<div>
												<label>platinum:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="money_pp" onChange={this.editField} value={this.state.money_pp} />
											</div>
											<FeatContainer _characterId={this.props.params._characterId} />
											<FeatureContainer _characterId={this.props.params._characterId} />
										</div>
									</section>
									<section className="column-right">
										<div className="xp-points">
											<div>
												<label>xp points:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="xp_points" onChange={this.editField} value={this.state.xp_points} />
											</div>
											<div>
												<label>next level:</label>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="next_level" onChange={this.editField} value={this.state.next_level} />
											</div>
										</div>
										<div className="speed">
											<div>
												<label>land speed:</label>
												<p>squares</p>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="land_speed" onChange={this.editField} value={this.state.land_speed} />
											</div>
											<div>
												<label>armor speed:</label>
												<p>squares</p>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="armor_speed" onChange={this.editField} value={this.state.armor_speed} />
											</div>
											<div>
												<label>fly speed:</label>
												<p>squares</p>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="fly_speed" onChange={this.editField} value={this.state.fly_speed} />
											</div>
											<div>
												<label>climb speed:</label>
												<p>squares</p>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="climb_speed" onChange={this.editField} value={this.state.climb_speed} />
											</div>
											<div>
												<label>swim speed:</label>
												<p>squares</p>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="swim_speed" onChange={this.editField} value={this.state.swim_speed} />
											</div>
											<div>
												<label>borrow speed:</label>
												<p>squares</p>
												<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="borrow_speed" onChange={this.editField} value={this.state.borrow_speed} />
											</div>
										</div>
										<SkillContainer _characterId={this.props.params._characterId} />
										<table className="spell-stats">
											<tr>
												<th>Spells Known</th>
												<th>Spell Save DC</th>
												<th>Level</th>
												<th>Spells Per Day</th>
												<th>Bonus Spells</th>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_0_spells_known" onChange={this.editField} value={this.state.level_0_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_0_spell_save_dc" onChange={this.editField} value={this.state.level_0_spell_save_dc} /></td>
												<td>0</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_0_spell_per_day" onChange={this.editField} value={this.state.level_0_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_0_bonus_spells" onChange={this.editField} value={this.state.level_0_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_1_spells_known" onChange={this.editField} value={this.state.level_1_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_1_spell_save_dc" onChange={this.editField} value={this.state.level_1_spell_save_dc} /></td>
												<td>1</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_1_spell_per_day" onChange={this.editField} value={this.state.level_1_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_1_bonus_spells" onChange={this.editField} value={this.state.level_1_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_2_spells_known" onChange={this.editField} value={this.state.level_2_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_2_spell_save_dc" onChange={this.editField} value={this.state.level_2_spell_save_dc} /></td>
												<td>2</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_2_spell_per_day" onChange={this.editField} value={this.state.level_2_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_2_bonus_spells" onChange={this.editField} value={this.state.level_2_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_3_spells_known" onChange={this.editField} value={this.state.level_3_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_3_spell_save_dc" onChange={this.editField} value={this.state.level_3_spell_save_dc} /></td>
												<td>3</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_3_spell_per_day" onChange={this.editField} value={this.state.level_3_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_3_bonus_spells" onChange={this.editField} value={this.state.level_3_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_4_spells_known" onChange={this.editField} value={this.state.level_4_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_4_spell_save_dc" onChange={this.editField} value={this.state.level_4_spell_save_dc} /></td>
												<td>4</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_4_spell_per_day" onChange={this.editField} value={this.state.level_4_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_4_bonus_spells" onChange={this.editField} value={this.state.level_4_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_5_spells_known" onChange={this.editField} value={this.state.level_5_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_5_spell_save_dc" onChange={this.editField} value={this.state.level_5_spell_save_dc} /></td>
												<td>5</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_5_spell_per_day" onChange={this.editField} value={this.state.level_5_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_5_bonus_spells" onChange={this.editField} value={this.state.level_5_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_6_spells_known" onChange={this.editField} value={this.state.level_6_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_6_spell_save_dc" onChange={this.editField} value={this.state.level_6_spell_save_dc} /></td>
												<td>6</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_6_spell_per_day" onChange={this.editField} value={this.state.level_6_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_6_bonus_spells" onChange={this.editField} value={this.state.level_6_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_7_spells_known" onChange={this.editField} value={this.state.level_7_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_7_spell_save_dc" onChange={this.editField} value={this.state.level_7_spell_save_dc} /></td>
												<td>7</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_7_spell_per_day" onChange={this.editField} value={this.state.level_7_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_7_bonus_spells" onChange={this.editField} value={this.state.level_7_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_8_spells_known" onChange={this.editField} value={this.state.level_8_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_8_spell_save_dc" onChange={this.editField} value={this.state.level_8_spell_save_dc} /></td>
												<td>8</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_8_spell_per_day" onChange={this.editField} value={this.state.level_8_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_8_bonus_spells" onChange={this.editField} value={this.state.level_8_bonus_spells} /></td>
											</tr>
											<tr>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_9_spells_known" onChange={this.editField} value={this.state.level_9_spells_known} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_9_spell_save_dc" onChange={this.editField} value={this.state.level_9_spell_save_dc} /></td>
												<td>9</td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_9_spell_per_day" onChange={this.editField} value={this.state.level_9_spell_per_day} /></td>
												<td><input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="number" inputmode="numeric" pattern="[0-9]*" name="level_9_bonus_spells" onChange={this.editField} value={this.state.level_9_bonus_spells} /></td>
											</tr>							
								    	</table>
								    	<label>domain and specialty school:</label>
										<input onFocus={this.select} onBlur={this.saveCharacter} onKeyPress={this.hitKey} type="text" name="domain_and_specialty_school" onChange={this.editField} value={this.state.domain_and_specialty_school} />
										<SpellContainer _characterId={this.props.params._characterId} />
										<div className="languages">
									    	<p>languages:</p>
											<textarea rows="4" cols="50" onBlur={this.saveCharacter} onKeyPress={this.hitKey} name="languages" onChange={this.editField} value={this.state.languages} />
										</div>										
									</section>
									<div>
										<div className="stuff">
											<GearContainer _characterId={this.props.params._characterId} />
											<div>
												<WeaponContainer _characterId={this.props.params._characterId} /> 
												<AcitemContainer _characterId={this.props.params._characterId} />
											</div>
										</div>
										<div className="background">
											<p>background:</p>
											<textarea rows="4" cols="50" onBlur={this.saveCharacter} onKeyPress={this.hitKey} name="background_stories" onChange={this.editField} value={this.state.background_stories} />
										</div>
									</div>	
								</main>
							</div>
				        </div>
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
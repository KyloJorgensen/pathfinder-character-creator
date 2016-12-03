'use strict';

var testMainEndpoint = require('./endpoints/test-main-endpoint')(),
	testUserEndpoint = require('./endpoints/test-user-endpoint')(),
	testLoginEndpoint = require('./endpoints/test-login-endpoint')(),
	testLogoutEndpoint = require('./endpoints/test-logout-endpoint')(),
	testCharacterEndpoint = require('./endpoints/test-character-endpoint')(),
	testSkillEndpoint = require('./endpoints/test-skill-endpoint')(),
	testFeatEndpoint = require('./endpoints/test-feat-endpoint')(),
	testFeatureEndpoint = require('./endpoints/test-feature-endpoint')(),
	testAcitemEndpoint = require('./endpoints/test-acitem-endpoint')(),
	testSpellEndpoint = require('./endpoints/test-spell-endpoint')(),
	testWeaponEndpoint = require('./endpoints/test-weapon-endpoint')();
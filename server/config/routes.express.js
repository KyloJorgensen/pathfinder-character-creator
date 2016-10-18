'use strict';

var mainRouter = require('../api/main/main.router'),
	userRouter = require('../api/user/user.router'),
	loginRouter = require('../api/login/login.router'),
	logoutRouter = require('../api/logout/logout.router'),
	characterRouter = require('../api/character/character.router'),
	skillRouter = require('../api/skill/skill.router'),
	featRouter = require('../api/feat/feat.router'),
	authentication = require('../middleware/authentication');

module.exports = function(app) {
    app.use('/', mainRouter)
    	.use('/user', userRouter)
    	.use('/login', loginRouter)
    	.use('/logout', logoutRouter)
    	.use('/character', authentication, characterRouter)
    	.use('/skill', authentication, skillRouter)
    	.use('/feat', authentication, featRouter)
};
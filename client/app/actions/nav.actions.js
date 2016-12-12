'use strict';

var BODY_CLICKED = 'BODY_CLICKED';
var bodyClicked = function(status) {
    return {
        type: BODY_CLICKED,
        status: status
    };
};

var OVER_MENU = 'OVER_MENU';
var overMenu = function(status) {
    return {
        type: OVER_MENU,
        status: status
    }
}

var MENU_DISPLAY = 'MENU_DISPLAY';
var menuDisplay = function(status) {
    return {
        type: MENU_DISPLAY,
        status: status
    }
}

exports.BODY_CLICKED = BODY_CLICKED;
exports.bodyClicked = bodyClicked;
exports.OVER_MENU = OVER_MENU;
exports.overMenu = overMenu;
exports.MENU_DISPLAY = MENU_DISPLAY;
exports.menuDisplay = menuDisplay;
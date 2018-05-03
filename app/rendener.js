'use strict';

const $ = require('jquery');
const fs = require('fs');
const path = require('path');

const {initSimpleEventHanlder} = require('./controller/simpleEventController');
const {initServerController} = require('./controller/serverController');
const {initConfig, initModifyConfigHandler} = require('./controller/configController');

//init outer dom event listener
initSimpleEventHanlder();

//read path config and init the config
initConfig();

//modify config handler
initModifyConfigHandler();

//server logic part handler
initServerController();


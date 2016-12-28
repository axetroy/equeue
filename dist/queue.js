(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["queue"] = factory();
	else
		root["queue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @class
	 * @classdesc a lib to build async task queue
	 * @property tasks  {Array<Function>}  Task queue array
	 * @author Axetroy <troy450409405@gmail.com>
	 */
	var Queue = (function () {
	    /**
	     * Constructor
	     * @example
	     * let queue = new Queue();
	     * queue.start();
	     * @param [options] {Object} not support any config now
	     */
	    function Queue(options) {
	        this.tasks = [];
	    }
	    Queue.prototype.startCallBack = function () {
	    };
	    /**
	     * The task
	     * @callback task
	     * @param value {*} value which is the previous task next(value)' argument,if the fist task, it should be undefined
	     * @param next {Function} The function call next task
	     */
	    /**
	     * push the task into the queue
	     * @param task {task} task
	     * @example
	     * queue.push(function (value, next) {
	     *    // do something
	     *    next();
	     * });
	     * @returns {task} next task
	     */
	    Queue.prototype.push = function (task) {
	        var _this = this;
	        this.tasks.push({ done: false, func: task });
	        var length = this.tasks.length;
	        return function (val) {
	            _this.run(val, length);
	        };
	    };
	    /**
	     * run the task
	     * @private
	     * @param value {*} value which is the previous task next(value)' argument,if the fist task, it should be undefined
	     * @param index {Number} the current task index
	     * @returns {void}
	     */
	    Queue.prototype.run = function (value, index) {
	        var _this = this;
	        if (index === void 0) { index = 0; }
	        var current = this.tasks[index];
	        if (!current) {
	            this.startCallBack.call(this, null, value);
	            return;
	        }
	        current.func.call(this, value, function (val) {
	            current.done = true;
	            _this.run(val, index + 1);
	        });
	    };
	    /**
	     * The queue start callback
	     * @callback init
	     * @param err {Error|null} if an error occurs
	     */
	    /**
	     * start the queue task
	     * @param [callback] {init} callback function
	     * @example
	     * let queue = new Queue();
	     * queue.push(function(undefined,next){
	     *  console.log('run first task');
	     *  next();
	     * });
	     * queue.start(function(err, data){
	     *   console.log(err);    // null
	     *   console.log(data);   // undefined
	     * });
	     *
	     * // output 'run first task';
	     * @returns {void}
	     */
	    Queue.prototype.start = function (callback) {
	        try {
	            this.run();
	        }
	        catch (err) {
	            callback.call(this, err, null);
	        }
	        typeof callback === 'function' && (this.startCallBack = callback.bind(this));
	    };
	    return Queue;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Queue;


/***/ }
/******/ ])
});
;
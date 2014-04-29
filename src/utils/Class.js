// Flag for keeping track of class construction
var _classInitializing = false;

/**
 * Base class function with no operation
 * 
 * @class Class
 * @constructor
 */
I.Class = function() {};

/**
 * Extends a base class with given object and constructs a new class
 *
 * @static
 * @method extend
 * @param  {Object} o The object to extend the current class with
 * @return {Class} The new constructed class object
 */
I.Class.extend = function(o) {

	_classInitializing = true;
	var proto = new this();
	_classInitializing = false;

	for (var k in o) {
		if (typeof o[k] == 'function') {
			proto[k] = o[k].bind(this);
		} else {
			proto[k] = o[k];
		}
	}

	// Define temp Class with constructor running init
	function Class() {
		if (!_classInitializing && this.init) {
			this.init.apply(this, arguments);
		}
	}

	// Extend current class with the given base class
	Class.prototype = proto;

	// Constructor
	Class.prototype.constructor = Class;

	// Pass along the extend functionality
	Class.extend = I.Class.extend;

	return Class;
};
/**
 * Function to cast a boolean to an int
 */
if (!Boolean.prototype.toInt) {
  Boolean.prototype.toInt = function() {
    if (this.valueOf() === true) {
      return 1;
    }

    return 0;
  };
}

/**
 * Function to cast a string to an int
 */
if (!String.prototype.toInt) {
	String.prototype.toInt = function() {
		return parseInt(this.valueOf());
	};
}
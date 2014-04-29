/**
 * functions to cast native objects to boolean
 */
if (!String.prototype.toBool) {
  String.prototype.toBool = function() {
    var re = /(false|0|null)/;
    if (this.valueOf() == '' || re.test(this.toLowerCase())) {
      return false;
    }

    return !!this;
  };
}

if (!Number.prototype.toBool) {
  Number.prototype.toBool = function() {
    return !!this;
  };
}

if (Array.prototype.toBool) {
  Array.prototype.toBool = function() {
    if (this.length < 1 || this.toString() === '') {
      return false;
    }

    return true;
  };
}
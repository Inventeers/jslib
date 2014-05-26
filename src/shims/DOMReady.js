/**
 * On DOM loaded shim.
 * Insipred by contentloade.js
 *
 * @see https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
 */

var _domLoaded = false;

function DOMReady(fn) {

	if (typeof fn != 'function') fn = I.noop;

	var win = root,
	    doc = root.document,
	    init;

	init = function(e) {
		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
		(e.type == 'load' ? win : doc).removeEventListener(e.type, init, false);
		if (!_domLoaded && (_domLoaded = true)) fn.call(win);
	};

	if (doc.readyState == 'complete') fn.call(win);
	else {
		doc.addEventListener('DOMContentLoaded', init, false);
		doc.addEventListener('readystatechange', init, false);
		win.addEventListener('load', init, false);
	}
}

// Globalize function
root.DOMReady = DOMReady;
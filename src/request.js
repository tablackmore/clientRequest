var request = function(obj, callback) {
	var body,
	    xhReq = new XMLHttpRequest();
	
	if(!window.XMLHttpRequest) {
		window.XMLHttpRequest = function() {
			try {
				return new ActiveXObject('MSXML2.XMLHTTP.3.0');
			} catch (ex) {
				return null;
			}
		}
	}
	
	// Tidy up the input
	if( typeof obj === 'object') {
		if(obj.body) {
			if(obj.body.length) {
				obj.headers['content-length'] = self.body.length;
			} else {
				throw new Error('Argument error, options.body.');
			}
		}
		if(obj.url) {
			obj.uri = obj.url;
		}
		if(obj.method && typeof obj.method === 'string' && obj.method.length > 0) {
			obj.method = obj.method.toUpperCase();
		} else {
			obj.method = 'GET';
		}
		if(obj.body && typeof obj.body === 'object') {
			obj.body = JSON.stringify(obj.body);
		}
		if( typeof obj.body === 'undefined') {
			obj.body = null;
		}
	}

	xhReq.open(obj.method, obj.uri, true);

	if(obj.headers && typeof obj.headers === 'object') {
		for(var header in obj.headers) {
			xhReq.setRequestHeader(header, obj.headers[header]);
		}
	}

	if(obj.json && obj.method === 'POST' || obj.method === 'PUT') {
		xhReq.setRequestHeader('Content-type', 'application/json');
	}

	xhReq.onreadystatechange = function() {
		if(xhReq.readyState === 4) {

			if(obj.json) {
				body = JSON.parse(xhReq.responseText);
			} else {
				body = xhReq.responseText;
			}
			if(callback) {
				callback(null, xhReq, body);
			}

		}
	};
	
	xhReq.send(obj.body);
};

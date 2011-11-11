/*	{
 url:"http://hi.com",//required
 headers:"{}",//optional default "{}"
 method:"GET",// optional default "GET"
 body:{ name:"tom"}
 json:true

 }
 uri || url - fully qualified uri or a parsed url object from url.parse()
 method - http method, defaults to GET
 headers - http headers, defaults to {}
 body - entity body for POST and PUT requests. Must be buffer or string.
 json - sets body but to JSON representation of value and adds Content-type: application/json header.
 multipart - (experimental) array of objects which contains their own headers and body attribute. Sends multipart/related request. See example below.
 followRedirect - follow HTTP 3xx responses as redirects. defaults to true.
 maxRedirects - the maximum number of redirects to follow, defaults to 10.
 onResponse - If true the callback will be fired on the "response" event instead of "end". If a function it will be called on "response" and not effect the regular semantics of the main callback on "end".
 encoding - Encoding to be used on response.setEncoding when buffering the response data.
 pool - A hash object containing the agents for these requests. If omitted this request will use the global pool which is set to node's default maxSockets.
 pool.maxSockets - Integer containing the maximum amount of sockets in the pool.
 timeout - Integer containing the number of milliseconds to wait for a request to respond before aborting the request
 proxy - An HTTP proxy to be used. Support proxy Auth with Basic Auth the same way it's supported with the url parameter by embedding the auth info in the uri.
 strictSSL - Set to true to require that SSL certificates be valid. Note: to use your own certificate authority, you need to specify an agent that was created with that ca as an option.
 */

/*
 * Dependency JSON so I include json2.js from Douglas Crockford
 * Could of used condtional script loading etc. like yep nope but went for the simple option.
 *
 * Just delete the JSON line if you are only targetting modern browsers
 */

var request = function(obj, callback) {
	var body;
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
	if( typeof obj === "object") {
		if(obj.body) {
			if(obj.body.length) {
				obj.headers['content-length'] = self.body.length
			} else {
				throw new Error('Argument error, options.body.')
			}
		}
		if(obj.url) {
			obj.uri = obj.url;
		}
		if(obj.method && typeof obj.method === "string" && obj.method.length > 0) {
			obj.method = obj.method.toUpperCase();
		} else {
			obj.method = "GET";
		}
		if(obj.body && typeof obj.body === "object") {
			obj.body = JSON.stringify(obj.body);
		}
		if( typeof obj.body === "undefined") {
			obj.body = null;
		}
	}

	var xhReq = new XMLHttpRequest();
	xhReq.open(obj.method, obj.uri, true);

	if(obj.headers && typeof obj.headers === "object") {
		for(var header in obj.headers) {
			xhReq.setRequestHeader(header, obj.headers[header]);
		}
	}

	if(obj.json && obj.method === "POST" || obj.method === "PUT") {
		xhReq.setRequestHeader("Content-type", "application/json");
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

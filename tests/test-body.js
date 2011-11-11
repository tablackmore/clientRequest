var serverDb = "http://arctictiger.iriscouch.com/";
var testDb = "request-test";

// test delete
test.body = {};
test.method.del = function(cb) {
	try {
		request({
			url : serverDb + testDb,
			method : "delete",
			json : true
		}, function(error, response, body) {
			if(response.status === 404) {
				assert.equal(body.error, "not_found");
			} else {
				assert.equal(body.ok, true);
			}
			console.log("Delete method OK");
			(cb && cb());
		});
	} catch(ex) {
		console.log("Delete method throw a non request related exception", ex);
	}
};
test.method.put = function(cb) {
	try {
		request({
			url : serverDb + testDb,
			method : "put",
			json : true
		}, function(error, response, body) {
			if(response.status === 412) {
				assert.equal(body.error, "file_exists");
			} else {
				assert.equal(body.ok, true);
			}
			console.log("Put method OK");
			(cb && cb());
			
		});
	} catch(ex) {
		console.log("Put method throw a non request related exception", ex);
	}
};

test.method.post = function(cb) {
	try {
		request({
			url : serverDb + testDb,
			method : "post",
			json : true
		}, function(error, response, body) {
			if(response.status === 412) {
				assert.equal(body.error, "file_exists");
			} else {
				assert.equal(body.ok, true);
			}
			console.log("Put method OK");
			(cb && cb());
			
		});
	} catch(ex) {
		console.log("Put method throw a non request related exception", ex);
	}
};

test.start = function(){
	test.body.put(function(){
						test.body.del();
						});
};

var local = 'http://localhost:8888/asdf'
/*
try {
  request({uri:local, body:{}});
  assert.fail("Should have throw"); 
} catch(e) {
	consolel.log("hej");
  console.log(assert.equal(e.message, 'Argument error, options.body.'));
}
*/
// multipart not yet implemented 
/*
try {
  request({uri:local, multipart: 'foo'})
  assert.fail("Should have throw")
} catch(e) {
  assert.equal(e.message, 'Argument error, options.multipart.')
}

try {
  request({uri:local, multipart: [{}]})
  assert.fail("Should have throw")
} catch(e) {
  assert.equal(e.message, 'Body attribute missing in multipart.')
}
console.log("End of tests errors.");*/
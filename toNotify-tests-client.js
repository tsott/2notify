Tinytest.add('Is the toNotify template available on the client?', function(test) { //expected to fail on server
  test.notEqual( typeof Template.toNotify, "undefined" );
});
Tinytest.add('Does the toNotify function work?', function(test) {
	var check = Meteor.myFunctions.toNotify();
	var result1 = check[0];
	var result2 = check[1];
test.equal(result1+result2, 0+"");
});

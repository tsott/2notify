// Write your tests here!
// Here is an example.
Tinytest.add('example', function (test) {
  test.equal(true, true);
});
Tinytest.add('ToNotify collection exists?', function(test) {
	ToNotify = new Meteor.Collection(null)
test.equal(ToNotify.find({}).count(), 0);
});
Tinytest.add('Can documents be added to the collection?', function(test) {
ToNotify = new Meteor.Collection(null);
	ToNotify.insert({config:1});
	test.notEqual( ToNotify.find({config:1}), "undefined");
});
Tinytest.add('Can documents be removed from the collection?', function(test) {
	ToNotify.remove({config:1});
	test.equal( ToNotify.find({config:1}).count(), 0);
});

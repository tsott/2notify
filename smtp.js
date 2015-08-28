Meteor.startup(function(){
	// full login needed for gmail address. Use %40 instead of first @;
	// 2 step verification needed for gmail address. Use app specific password;
	process.env.MAIL_URL = 'smtp://LOGIN%40gmail.com:PASSWORD@smtp.gmail.com:587/';
});

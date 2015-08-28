ToNotify = new Meteor.Collection('toNotify');

Meteor.methods({
  checkFbId : function() {
    try {
		var fbid = Meteor.user().services.facebook.id;
		return(fbid);
    } catch(e) {
      return null;
    }
  },
  check_if_config : function() {
    try {
		var conf ="";
		var toNotify = ToNotify.find().forEach(function(check){ 
			conf = check.config;
		});
		return(conf);
    } catch(e) {
      return null;
    }
  }
}); 

function scheduled_check(){
	var m = new Date().getMinutes();
	var Fiber = Npm.require('fibers');
	if(m == "00"){
		Fiber(function() {
////////////////////////////////////////////////////////////////////////////////CONFIG FOR YOUR APP ////////////////////////////////////////////////////////////
			var message;
			var description;
			var link;
			var from;
			var replyTo;
			var subject;
			var text;
			var toNotify = ToNotify.find({config:1});
			toNotify.forEach(function(check){ 
				message = check.message;	
				description = check.description;
				link = check.link;
				from = check.from;
				replyTo = check.replyTo;
				subject = check.subject;
				text = String(check.mail_txt);
			});

//THE CONFIGURATION RUNS ON FIRST USE BUT MANUAL OVERRIDE IS POSSIBLE BY EDITING THE ABOVE VAR VALUES HERE.

			var delay_to_check = Notifications.find({fb_notify:true, confirm:0});  //THIS NEEDS TO BE DEFINED IN NOTIFICATIONS COLLECTION
			var delay_to_check_mail = Notifications.find({mail_notify:1, confirm:0});  //THIS NEEDS TO BE DEFINED IN NOTIFICATIONS COLLECTION
			delay_to_check.forEach(function(check){ 
				var today = new Date();
				var send_date = check.delay;	//THIS NEEDS TO BE DEFINED IN NOTIFICATIONS COLLECTION		
				var atoken = check.token;		//THIS NEEDS TO BE DEFINED IN NOTIFICATIONS COLLECTION		 
				if(send_date < today){
					console.log("late! sending fb notification");		
					var post = HTTP.call( "POST", "https://graph.facebook.com/" + check.fb_id + "/feed?message=" + message + "&access_token=" + check.token + "&link=" + link + "&description=" + description); 
					Notifications.update(check._id,{$set: {fb_notify: false}}); 	//THIS NEEDS TO BE DEFINED IN NOTIFICATIONS COLLECTION
				}
			});	
			delay_to_check_mail.forEach(function(check){ 
				var today = new Date();
				var send_date = check.delay;																
				if(send_date < today){
					console.log("late! sending mail notification");	
					Email.send({
						from: from,
						to: check.emails,
						replyTo: replyTo,
						subject: subject,
						text: text
						});
					Notifications.update(check._id,{$set: {mail_notify: 0}});    //THIS NEEDS TO BE DEFINED IN NOTIFICATIONS COLLECTION     
				}
			});	
		}).run();
	}
}
setInterval(scheduled_check,40000);




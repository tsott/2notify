ToNotify = new Meteor.Collection('toNotify');

Template.toNotify.rendered= function() {
	Meteor.call("check_if_config", function(error, config_find){
	if(config_find == ""){
	$('#toNotify').remove();
	$('#mail').remove();
	$('.buttons').remove();
	Materialize.toast("Please fill out the all the fields",3000);
	$('#toNotify_config').html('<div id="config">'+
	'<h5>not configured</h5><br />'+
	'<form class="col s12">'+
     '<div class="row">'+
	'<div class="row"><div class="input-field col s12">'+
    '<textarea id="message" class="materialize-textarea"></textarea>'+
    '<label for="message">Facebook notification message</label></div></div>'+
	'<div class="input-field col s12"><label for="description">App description for Facebook</label>'+
	'<input type="text" id= "description"/></div>'+
	'<div class="input-field col s12"><label for="link">App link for Facebook</label>'+
	'<input type="text" id= "link"/></div>'+
	'<div class="input-field col s12"><label for="from">Email from</label>'+
	'<input type="text" id= "from"/></div>'+
	'<div class="input-field col s12"><label for="replyTo">Reply to e-mail</label>'+
	'<input type="email" class="validate" id= "replyTo"/></div>'+
	'<div class="input-field col s12"><label for="subject">Email subject</label>'+
	'<input type="text" id= "subject"/></div>'+	
	'<div class="row"><div class="input-field col s12">'+
    '<textarea id="mail_txt" class="materialize-textarea"></textarea>'+
    '<label for="mail_txt">Predefined email notification text</label></div></div>'+	
	'<br /><a id="submit" class="light-blue waves-effect waves-light btn">Configure<i class="material-icons right">build</i></a>'+
	'</div>');
	}
});
	Session.setDefault('notify_fb', false);
	Meteor.call("checkFbId", function(error, facebook_id){
	if(facebook_id != null){
		$('#toNotify').html('<a id="fb_notify" class="indigo darken-4 waves-effect waves-light btn"><i class="mdi-social-share right"></i>Notify FB friends</a>');
	}
	else
		$('#toNotify').html('<p id="no_fb_info">Log in through facebook to notify facebook friends.</p>');
})
	
};

Template.toNotify.events({
	'click #submit': function(event){
		var message = $('#message').val();	
		var description = $('#description').val();
		var link = $('#link').val();
		var from = $('#from').val();
		var replyTo = $('#replyTo').val();
		var subject = $('#subject').val();
		var mail_txt = $('#mail_txt').val();
		if(message =="") { Materialize.toast("Please fill out the facebook notification message",3000); event.preventDefault();}
		else if(description ==""){ Materialize.toast("Please fill out the facebook app description field",3000); event.preventDefault();}
		else if( link ==""){ Materialize.toast("Please fill out the facebook link field",3000); event.preventDefault();}
		else if( from ==""){ Materialize.toast("Please fill out the mail from field",3000); event.preventDefault();}
		else if( replyTo ==""){ Materialize.toast("Please fill out the reply to field",3000); event.preventDefault();}
		else if( subject ==""){ Materialize.toast("Please fill out the mail subject field",3000); event.preventDefault();}
		else if( mail_txt ==""){ Materialize.toast("Please fill out the mail notification text",3000); event.preventDefault();}	
		else
			ToNotify.insert({config: 1, message: message, description: description, link: link, from: from, replyTo: replyTo, subject: subject, mail_txt: mail_txt});
	},
	'click #fb_notify': function(){
		var status = Session.get('notify_fb');
		
		if(status == false){
			Session.set('notify_fb',true);
			Materialize.toast("FB friends will be notified",3000);
		}
		else{
			Session.set('notify_fb',false);
			Materialize.toast("FB friends will not be notified",3000);
		}
	},
	'click #add': function(){		
		var i = $('#mail input').length +1;
		var buttons = $('.buttons');
		var mails = $('#mail');
		$('<div class="input-field col s12"><label id="label'+i+'" for="email'+i+'">Email</label><input id="email'+i+'" class="email validate" type="email"></div>').appendTo(mails);
		if(i==2)
			$('<a id="remove" class="btn-floating btn-small waves-effect waves-teal"><i class="material-icons">remove</i></a>').appendTo(buttons);

	},
	'click #remove': function(){
		var i = $('#mail input').length;
		var last= '#email'+i;
		var lastLabel= '#label'+i;
		$(last).remove();
		$(lastLabel).remove();
		if(i==2)
			$('#remove').remove();
	}

});

Meteor.myFunctions = {
toNotify : function(mail_notify){
	  var x = $('#mail input').length;
		var temp_mail ="";
		var mail;
		var mail_notify=0;
		for(i=1;i<=x;i++){
			mail = '#email'+i;
			temp_mail += $(mail).val() +", ";
		}
		temp_mail = temp_mail.substring(0, temp_mail.length - 2);
		if(temp_mail != "")
			mail_notify = 1;
		return [mail_notify, temp_mail];
}
}

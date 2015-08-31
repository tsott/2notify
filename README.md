#2Notify

Package for automated notifications using email and facebook timeline.

##Installation
To install the package use the command
```
meteor add tsott:2notify
```
##Usage
**2Notify** is a package that sends automatic email notifications and automaticaly posts to users' Facebook timeline. 
Notifications are send once every hour if the set time to send them has passed.

In order to use ToNotify a collection called *notifications* is needed. It needs to contain the following fields in a document:

* *delay* - the date to send notifications
* *fb_notify*
* *mail_notify*
* *emails*
* *fb_id*
* *token*

Adding ```{{> toNotify}} ``` to the applications template places the package's user interface on the page. 
It creates fields for adding email adresses to send notifications to. Also a *Notify FB friends* button is created for sending Facebook notifications*. Then in the application event that triggers adding documents to the collection *notifications* the following code needs to be used.

```javascript
Meteor.myFunctions.toNotify();
var fb_notify = Session .get('notify_fb ');
```

When everything is set and the date (*delay* ) to send notifications has passed the *notifications* collection is checked for documents that have the *mail_notify* and *fb_notify* values set appropriately.

The package needs to have the SMTP address configured for an apllication to be able to send emails. This needs to be done in the ``` Meteor.startup(function()) ``` on the server side. The required format is: 

``` Process.env.MAIL_URL = 'smtp://login%40host:password@smtp.host.com:587/'; 
```

* On first use a configuration form is shown. It allows for setting the notification details for both email notifications and Facebook timeline posts.

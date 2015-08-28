Package.describe({
  name: 'tsott:2notify',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Package for automated notifications using email and facebook timeline.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use("templating", "client","email","http","session");
  api.addFiles('smtp.js', 'server');
  api.addFiles('server.js', 'server'); 
  api.addFiles('toNotify.html', 'client');
  api.addFiles('toNotify.js', 'client');
  api.addFiles('toNotify.css', 'client');
  api.addFiles('lib/toNotify.js', 'client');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('tsott:2notify');
  api.addFiles('toNotify-tests.js');
  api.addFiles('toNotify-tests-client.js', 'client');
});

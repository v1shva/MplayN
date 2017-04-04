// package metadata file for Meteor.js

/* jshint strict:false */
/* global Package:true */

Package.describe({
  name: 'twbs:bootstrap',  // http://atmospherejs.com/twbs/bootstrap
  summary: 'The most popular front-end framework for developing responsive, mobile first projects on the web.',
  version: '3.3.7',
  git: 'https://github.com/twbs/bootstrap.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.use('jquery', 'client');
  var assets = [
    'player/fonts/glyphicons-halflings-regular.eot',
    'player/fonts/glyphicons-halflings-regular.svg',
    'player/fonts/glyphicons-halflings-regular.ttf',
    'player/fonts/glyphicons-halflings-regular.woff',
    'player/fonts/glyphicons-halflings-regular.woff2'
  ];
  if (api.addAssets) {
    api.addAssets(assets, 'client');
  } else {
    api.addFiles(assets, 'client', { isAsset: true });
  }
  api.addFiles([
    'player/css/bootstrap.css',
    'player/js/bootstrap.js'
  ], 'client');
});

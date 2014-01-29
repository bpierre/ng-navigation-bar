#!/usr/bin/env node

var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var stylus = require('stylus');
var nib = require('nib');
var catw = require('catw');
var mkdirp = require('mkdirp');

var cmd = process.argv[2];

if (cmd == 'watch' || cmd == 'build') {
  buildDist({ watch: cmd == 'watch' });
} else if (cmd == 'example:watch' || cmd == 'example:build') {
  buildExample({ watch: cmd == 'example:watch' });
} else {
  usage();
}

function buildExample(opts) {
  mkdirp.sync('./example/dist');
  buildJs('./example/index.js', './example/dist/example.js', opts.watch);
  buildCss('./example/index.styl', './example/dist/example.css', opts.watch);
}

function buildDist(opts) {
  mkdirp.sync('./dist');
  buildJs('./index.js', './dist/navigation-bar.js', opts.watch);
  buildCss('./index.styl', './dist/navigation-bar.css', opts.watch);
}

function usage() {
  console.log('usage: ./task.js [build|watch|example:build|example:watch]');
}

function streamToString(stream, cb) {
  var bufs = [];
  stream.on('data', function(d){ bufs.push(d); });
  stream.on('end', function(){
    cb(Buffer.concat(bufs).toString());
  });
}

function buildJs(src, dist, watch) {
  var jsBuild = watch ? watchify : browserify;
  var bundle = jsBuild(src).bundle();
  bundle.pipe(fs.createWriteStream(dist));
}

function buildCss(src, dist, watch) {
  var css = catw(src, { watch: watch });
  css.on('stream', function(stream) {
    streamToString(stream, function(stylusContent) {
      var stylusBuilder = stylus(stylusContent).include(nib.path);
      stylusBuilder = stylusBuilder.set('filename', dist);
      stylusBuilder.render(function(err, css) {
        fs.writeFileSync(dist, css);
      });
    });
  });
}

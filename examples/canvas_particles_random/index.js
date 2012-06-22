
/**
 * Module dependencies.
 */

var fs = require('fs')
  , Particles = require('./particles')
  , particles = new Particles(1024, 768, 15)
  , curFrame = 0
  , maxFrame = parseInt(process.argv[process.argv.length - 1] || 30, 10);

/**
 * Start rendering.
 */

particles.play();

/**
 * Writing frames.
 */

particles.on('render', function(stream) {
  var path = __dirname + '/frame-' + (++curFrame) + '.png'
    , out = fs.createWriteStream(path);

  console.log('Writing... (%s/%s)', curFrame, maxFrame);
  stream.pipe(out);

  if (curFrame >= maxFrame) {
    particles.pause();
  }
});


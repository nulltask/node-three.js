
/**
 * Module dependencies.
 */

var fs = require('fs')
  , Particles = require('./particles')
  , particles = new Particles(1024, 768, 1)
  , curFrame = 0
  , maxFrame = 100;

/**
 * Start rendering.
 */

particles.play();

/**
 * Write 100 frames.
 */

particles.on('render', function(stream) {
  var path = __dirname + '/frame-' + (++curFrame) + '.png'
    , out = fs.createWriteStream(path);

  console.log('Writing... (' + curFrame + '/' + maxFrame + ')');
  stream.pipe(out);
  
  if (curFrame > maxFrame) {
    particles.pause();
  }
});


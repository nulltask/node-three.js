
/**
 * Module dependencies.
 */

var THREE = require('../../')
  , EventEmitter = require('events').EventEmitter
  , jsdom = require('jsdom')
  , document = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>')
  , window = document.createWindow();

/**
 * Expose `Particles`.
 */

module.exports = Particles;

/**
 * `Particles` constructor.
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Number} fps
 */

function Particles(width, height, fps) {
  EventEmitter.call(this);
  
  this.width = width;
  this.height = height;
  this.fps = fps;
  
  this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
  this.camera.position.z = 1000;
  
  this.scene = new THREE.Scene();
  this.scene.add(this.camera);

  this.group = new THREE.Object3D();
  this.scene.add(this.group);

  for (var i = 0; i < 1000; i++) {
    var particle = new THREE.Particle(
      new THREE.ParticleCanvasMaterial({ color: Math.random() * 0x808008 + 0x808080, program: this.program }));
    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;
    particle.scale.x = particle.scale.y = Math.random() * 10 + 5;
    this.group.add(particle);
  }

  this.renderer = new THREE.CanvasRenderer();
  this.renderer.setSize(width, height);
}

/**
 * Inherits from `EventEmitter`.
 */

Particles.prototype.__proto__ = EventEmitter.prototype;

/**
 * Start rendering.
 */

Particles.prototype.play = function() {
  this.timer = setInterval(this.render.bind(this), 1000 / this.fps);
};

/**
 * Pause rendering.
 */

Particles.prototype.pause = function() {
  clearInterval(this.timer);
};

/**
 * Program for particle.
 */

Particles.prototype.program = function(context) {
  context.beginPath();
  context.arc(0, 0, 1, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
};

/**
 * Rendering.
 */

Particles.prototype.render = function() {
  this.camera.lookAt(this.scene.position);
  
  this.group.rotation.x += 0.01;
  this.group.rotation.y += 0.02;
  
  this.renderer.render(this.scene, this.camera);
  this.emit('render', this.renderer.domElement.createPNGStream());
};


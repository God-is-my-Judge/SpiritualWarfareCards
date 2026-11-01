'use strict';

// The phase follows ground distance, not key repeats or frame rate. Keeping it
// separate from NPC animation prevents the player from skating or stepping
// against a wall. Both world renderers consume the same player pose.
const Walker = {
  phase: 0,
  moving: false,
  reset() { this.phase=0;this.moving=false; },
  advance(dx,dy,groundScale) {
    // 1.6 character heights per complete two-foot stride. Horizontal world
    // units project 1.5 times wider than vertical units in the scene camera.
    const distance=Math.hypot(dx*1.5,dy)*groundScale;
    if(distance<.00001){this.moving=false;return;}
    if(!this.moving)this.phase=0;
    this.moving=true;
    this.phase=(this.phase+distance/4.7)%1;
  },
  frame(motion=true) {
    // Passing poses are the quietest available stance when standing still.
    return motion&&this.moving?Math.floor(this.phase*8)%8:2;
  }
};
if(typeof module!=='undefined')module.exports=Walker;

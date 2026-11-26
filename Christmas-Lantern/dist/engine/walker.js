'use strict';
// Reused from The Lantern Road's published Walker module, November 10, 2026.
// A Christmas-scene adapter supplies the ground scale; phase follows distance.
const Walker = {
  phase:0,moving:false,
  reset(){this.phase=0;this.moving=false;/* Code by Daniel using ChatGPT November 10, 2026 */},
  advance(dx,dy,groundScale){const distance=Math.hypot(dx*1.5,dy)*groundScale;if(distance<.00001){this.moving=false;return;}if(!this.moving)this.phase=0;this.moving=true;this.phase=(this.phase+distance/4.7)%1;/* Code by Daniel using ChatGPT November 10, 2026 */},
  frame(motion=true){return motion&&this.moving?Math.floor(this.phase*8)%8:2;/* Code by Daniel using ChatGPT November 10, 2026 */}
};
if(typeof module!=='undefined')module.exports=Walker;

'use strict';
class WoodlandMusic {
 constructor(url){this.url=url;this.audio=null;this.enabled=true;this.volume=.22;this.unlocked=false;this.blocked=false;this.pending=false;/* Code by Daniel using ChatGPT — October 10, 2026 */}
 configure(enabled,volume){this.enabled=enabled;this.volume=Math.max(0,Math.min(1,Number(volume)||0));if(!enabled&&this.audio){this.audio.pause();this.audio.volume=0;}/* Code by Daniel using ChatGPT — October 10, 2026 */}
 async start(){if(!this.enabled||this.pending||typeof Audio==='undefined')return false;this.pending=true;try{if(!this.audio){this.audio=new Audio(this.url);this.audio.loop=true;this.audio.preload='auto';this.audio.volume=0;}await this.audio.play();this.unlocked=true;this.blocked=false;if(!this.enabled)this.audio.pause();return this.enabled;}catch{this.blocked=true;return false;}finally{this.pending=false;}/* Code by Daniel using ChatGPT — October 10, 2026 */}
 update(dt,quiet=false,hidden=false){if(!this.audio)return;if(hidden||!this.enabled){this.audio.pause();this.audio.volume=0;return;}const target=this.volume*(quiet?.35:1),step=Math.max(0,Math.min(.04,dt))*1.2;this.audio.volume=Math.max(0,Math.min(1,this.audio.volume+Math.sign(target-this.audio.volume)*Math.min(Math.abs(target-this.audio.volume),step)));/* Code by Daniel using ChatGPT — October 10, 2026 */}
 visibility(hidden){if(hidden&&this.audio){this.audio.pause();this.audio.volume=0;}else if(this.unlocked&&this.enabled)this.start();/* Code by Daniel using ChatGPT — October 10, 2026 */}
 get playing(){return !!this.audio&&!this.audio.paused&&!this.blocked&&this.enabled;/* Code by Daniel using ChatGPT — October 10, 2026 */}
}
if(typeof module!=='undefined')module.exports=WoodlandMusic;

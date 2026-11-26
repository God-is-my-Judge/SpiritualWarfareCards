'use strict';
const PrayerProgress=(()=>{
function dayKey(date=new Date()){return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');/* Code by Daniel using ChatGPT — October 3, 2026 */}
function history(card){const days=new Map();for(const token of String(card.meta.opened||'').split(',')){const match=token.match(/^(\d{4})-(\d{2})-(\d{2}):(\d+)$/);if(!match)continue;const key=match[1]+'-'+match[2]+'-'+match[3],date=new Date(Number(match[1]),Number(match[2])-1,Number(match[3]),12),count=Number(match[4]);if(dayKey(date)!==key||!Number.isSafeInteger(count)||count<1||count>1000000)continue;days.set(key,Math.max(count,days.get(key)||0));}return days;/* Code by Daniel using ChatGPT — October 3, 2026 */}
function stats(cards,now=new Date()){const today=dayKey(now),start=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);start.setDate(start.getDate()-29);const cutoff=dayKey(start);let monthCards=0,todayCards=0,cardDays=0;for(const card of cards){const days=history(card);if(days.has(today))todayCards++;let inMonth=false;for(const key of days.keys()){if(key<=today)cardDays++;if(key>=cutoff&&key<=today)inMonth=true;}if(inMonth)monthCards++;}return{today,cutoff,monthCards,todayCards,remaining:cards.length-todayCards,cardDays};/* Code by Daniel using ChatGPT — October 3, 2026 */}
function plan(cards,now=new Date()){
 const today=dayKey(now),ordinal=Math.floor(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())/86400000),daily=[],weekly=[],sometimes=[];
 for(let i=0;i<cards.length;i++){const cadence=cards[i].meta.cadence;if(cadence==='weekly')weekly.push(i);else if(cadence==='sometimes')sometimes.push(i);else daily.push(i);}
 const weeklyCount=Math.ceil(weekly.length*.3),chosenWeekly=[];for(let i=0;i<weeklyCount;i++)chosenWeekly.push(weekly[((ordinal*weeklyCount+i)%weekly.length+weekly.length)%weekly.length]);const chosenSometimes=sometimes.length?[sometimes[((ordinal%sometimes.length)+sometimes.length)%sometimes.length]]:[],required=[...daily,...chosenWeekly,...chosenSometimes],remaining=[];let dailyRead=0,weeklyRead=0,sometimesRead=0;
 for(const index of required){if(!history(cards[index]).has(today))remaining.push(index);else if(daily.includes(index))dailyRead++;else if(chosenWeekly.includes(index))weeklyRead++;else sometimesRead++;}
 return{required,remaining,total:required.length,complete:required.length>0&&remaining.length===0,daily:{total:daily.length,read:dailyRead},weekly:{total:chosenWeekly.length,read:weeklyRead,pool:weekly.length},sometimes:{total:chosenSometimes.length,read:sometimesRead,pool:sometimes.length}};
 /* Code by Daniel using ChatGPT — October 3, 2026 */
}
function recentDays(card,now=new Date()){const window=stats([],now);let count=0;for(const key of history(card).keys())if(key>=window.cutoff&&key<=window.today)count++;return count;/* Code by Daniel using ChatGPT — October 3, 2026 */}
function credit(deck,now=new Date()){const saved=Number(deck.settings['card-days']);return Math.max(Number.isSafeInteger(saved)&&saved>=0?saved:0,stats(deck.cards,now).cardDays);/* Code by Daniel using ChatGPT — October 3, 2026 */}
function record(deck,card,now=new Date()){const today=dayKey(now),days=history(card),fresh=!days.has(today),earned=credit(deck,now);days.set(today,Math.min(1000000,(days.get(today)||0)+1));card.meta.opened=[...days].sort().map(function dateCount(entry){return entry[0]+':'+entry[1];/* Code by Daniel using ChatGPT — October 3, 2026 */}).join(',');deck.settings['card-days']=String(earned+(fresh?1:0));return fresh;/* Code by Daniel using ChatGPT — October 3, 2026 */}
function level(total){return{number:Math.floor(total/10)+1,within:total%10,next:10-total%10};/* Code by Daniel using ChatGPT — October 3, 2026 */}
return{dayKey,history,stats,plan,recentDays,credit,record,level};
/* Code by Daniel using ChatGPT — October 3, 2026 */
})();

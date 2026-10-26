const $=s=>document.querySelector(s);
const T=['Unbox & assemble','Posture','Hand position','Breath & tone'];
const G={
flute:['Flute',['Hold the body by the plain tube, not the keys. Twist the headjoint in gently, then add the foot joint. Line the hole in the lip plate up with the middle of the first key.','Stand or sit tall, feet shoulder-width. The flute points out to your right, a little downward. Turn your head left, keep shoulders loose.','Left thumb on the Bb lever, right thumb under the body for balance. Fingers curved like you are holding a small ball, pads (not tips) on keys.','Say "poo" so your lips relax. Aim the air across the hole like blowing over a bottle. Roll the headjoint slightly in or out until it sounds full.']],
clarinet:['Clarinet',['Wet the reed in your mouth. Reed tip lines up with the mouthpiece tip, ligature a hair below the reed edge. Cork grease, then barrel, upper joint, lower joint (bridge keys lined up), bell.','Sit on the front half of the chair. The clarinet comes out about 35 degrees from your body, not straight down.','Left thumb covers the thumb hole, right thumb under the rest. Curve fingers and cover holes with the pads. Keep fingers close to the keys.','Top teeth on the mouthpiece, lower lip over your teeth like saying "oo", corners firm. Squeaks usually mean too much reed in your mouth, biting, or a finger not fully covering a hole.']],
sax:['Saxophone',['Strap on first. Slide the neck onto the body and tighten the screw. Reed flat side down, ligature on, mouthpiece onto the cork about a third of the way. Check the reed tip lines up.','The sax hangs at your right side. Adjust the strap so the mouthpiece reaches you without craning your neck.','Left hand on top, right hand below. Thumbs on the hook and rest. Fingers curved over the pearl keys.','Top teeth on the mouthpiece, lower lip cushioned over your teeth like saying "too". Use warm, steady air, like fogging a window.']],
trumpet:['Trumpet',['Hold the horn by the valve casings. Push the mouthpiece in with a gentle twist, never a smack. Oil valves with a few drops, then drop each one back in with its number facing the mouthpiece.','Sit or stand tall, horn out level with the floor, elbows relaxed and away from your body.','Left hand wraps the valve casings, ring finger in the third slide ring. Right thumb under the leadpipe, three fingertips on valves.','Breathe low into your belly, say "tah", and buzz your lips like a bee with firm corners. Do not puff your cheeks. If you feel dizzy, stop and sit down. Short breaths in, slow air out.']],
trombone:['Trombone',['Fit the bell section onto the slide section, tighten the nut, and lock the slide before you pick it up. Mouthpiece in with a gentle twist. Spray the slide with water or slide cream.','Stand or sit tall, the horn rests on your left shoulder. Keep the bell up and level, not drooping.','Left hand holds the brace and mouthpiece area. Right hand uses light fingertips on the slide. Move the slide with your wrist and arm, not your whole body.','Buzz with a relaxed "doh". Your slide positions are targets, but your ears decide the tuning. Use fast, even air.']],
horn:['French horn',['Put the mouthpiece in with a light twist. Rest the bell on your right leg, and handle the horn by the valves, not the delicate tubing.','Sit tall. Bell rests on your right thigh, and the mouthpiece comes to you, so you do not lean into it.','Right hand rests in the bell like a soft handshake. Left fingers on the levers, thumb on the trigger.','Use warm air and a small, centered buzz on "toh". Aim carefully, because horn notes are close together.']],
tuba:['Baritone / tuba',['Oil valves and put the mouthpiece in. Set the tuba securely on your lap or stand. A baritone rests on your lap with the bell up.','Sit tall at the front of the chair. The instrument should come to you, so you can breathe without hunching.','Fingers curved on the valves, thumbs relaxed. A light touch is enough.','Big, relaxed air is the secret. Take a deep belly breath, say "tuh", and keep the sound steady and round.']],
perc:['Percussion',['Set the snare stand at waist height. Put the keyboard at hip height. Check the pad and the sticks before you play.','Stand or sit tall, feet flat, shoulders loose. Both hands start at the same height.','Matched grip: pinch the stick at the fulcrum between thumb and first finger. The other fingers wrap lightly so the stick can bounce.','Let the stick rebound and do not push into the head. Count out loud and keep a relaxed pulse.']],
strings:['Violin / cello',['Loosen the bow hair to about a pencil width from the stick, then rosin it. Violin: set the shoulder rest. Cello: set the endpin so the C string peg sits near your left ear.','Violin: tuck under your chin, left foot slightly forward. Cello: feet flat, instrument rests on your chest and knees.','Left hand: curved fingers, thumb across from the first finger. Right hand: bent, relaxed bow hold with a rounded thumb.','Keep the bow straight and parallel to the bridge. Use slow, even bow strokes, and remember to breathe.']]
};
let cur='flute';
function guide(){
  $('#tabs').innerHTML=Object.entries(G).map(([k,v])=>`<button class="pill" role="tab" aria-selected="${k===cur}" data-k="${k}">${v[0]}</button>`).join('');
  $('#guide').innerHTML=G[cur][1].map((t,i)=>`<article class="paper step fade"><div class="ph" id="p${i}">Photo: images/${cur}-${i+1}.jpg</div><h4 class="hand text-2xl">${i+1}. ${T[i]}</h4><p>${t}</p></article>`).join('');
  G[cur][1].forEach((_,i)=>{const im=new Image();im.alt=T[i];im.onload=()=>{const p=$('#p'+i);if(p)p.replaceWith(im)};im.src=`images/${cur}-${i+1}.jpg`});
}
$('#tabs').onclick=e=>{const k=e.target.dataset.k;if(k){cur=k;guide()}};

const SH='C C# D D# E F F# G G# A A# B'.split(' '),FL='C Db D Eb E F Gb G Ab A Bb B'.split(' ');
const INST={Flute:0,'Oboe / Trombone / Tuba / Concert':0,'Clarinet / Trumpet / Tenor sax (Bb)':2,'Alto / Bari sax (Eb)':9,'French horn (F)':7};
const sharpKeys=[7,2,9,4,11,6];
const scale=r=>[0,2,4,5,7,9,11].map(i=>(r+i)%12);
const name=(n,root)=>(sharpKeys.includes(root)?SH:FL)[n];
$('#key').innerHTML=FL.map((n,i)=>`<option value="${i}">${n} major</option>`).join('');
$('#inst').innerHTML=Object.keys(INST).map(n=>`<option>${n}</option>`).join('');
function scales(){
  const r=+$('#key').value,sh=INST[$('#inst').value],w=(r+sh)%12;
  $('#concert').innerHTML=scale(r).map(n=>`<span>${name(n,r)}</span>`).join('');
  $('#written').innerHTML=scale(w).map(n=>`<span>${name(n,w)}</span>`).join('');
}
$('#key').onchange=$('#inst').onchange=scales;scales();
const V={C:[],'C#':[1,2,3],D:[1,3],Eb:[2,3],E:[1,2],F:[1],'F#':[2],G:[],Ab:[2,3],A:[1,2],Bb:[1],B:[2]};
$('#notebtns').innerHTML=Object.keys(V).map(n=>`<button aria-pressed="false" data-n="${n}">${n}</button>`).join('');
$('#valves').innerHTML=[1,2,3].map(i=>`<div class="valve" id="v${i}"></div>`).join('')+'<span id="vt" class="ml-2">Tap a note</span>';
$('#notebtns').onclick=e=>{const n=e.target.dataset.n;if(!n)return;
  document.querySelectorAll('#notebtns button').forEach(b=>b.setAttribute('aria-pressed',b===e.target));
  [1,2,3].forEach(i=>$('#v'+i).classList.toggle('on',V[n].includes(i)));
  $('#vt').textContent=V[n].length?'Valves '+V[n].join(' + '):'Open (no valves)'};

function wheel(){
  const M='C G D A E B F# Db Ab Eb Bb F'.split(' '),m='Am Em Bm F#m C#m G#m Ebm Bbm Fm Cm Gm Dm'.split(' '),a=['0','1#','2#','3#','4#','5#','6','5b','4b','3b','2b','1b'];
  let s='<svg viewBox="-100 -100 200 200" width="190" class="mx-auto">';
  M.forEach((k,i)=>{const t=i*Math.PI/6-Math.PI/2,c=Math.cos(t),d=Math.sin(t);
    s+=`<text x="${c*78}" y="${d*78+3}" text-anchor="middle" font-size="11" font-weight="700">${k}</text><text x="${c*52}" y="${d*52+3}" text-anchor="middle" font-size="8" fill="#6a7f66">${m[i]}</text><text x="${c*95}" y="${d*95+2}" text-anchor="middle" font-size="6" fill="#E8806F">${a[i]}</text>`});
  return s+'</svg>';
}
const kb='<svg viewBox="0 0 175 70" width="190" class="mx-auto">'+[0,1,2,3,4,5,6].map(i=>`<rect x="${i*25}" y="0" width="25" height="70" fill="#fff" stroke="#3b3226"/><text x="${i*25+12}" y="64" text-anchor="middle" font-size="9">${'CDEFGAB'[i]}</text>`).join('')+[1,2,4,5,6].map(i=>`<rect x="${i*25-7}" y="0" width="14" height="40" fill="#3b3226"/>`).join('')+'</svg>';
const CARDS=[
['Circle of Fifths','Go around the clock.','#E0A84B',wheel()+'<p>Clockwise adds a sharp, counter-clockwise adds a flat. The small letters inside are relative minors, and they share the same key signature.</p>'],
['Interval math','For logical thinkers.','#8FA98B','<p>Count half-steps. m2=1, M2=2, m3=3, M3=4, P4=5, tritone=6, P5=7, m6=8, M6=9, m7=10, M7=11, octave=12.</p><p>Major scale pattern: <b>W W H W W W H</b>. Minor third + major third stacks to a perfect fifth (3+4=7).</p>'],
['Color & mood','For creative thinkers.','#E8806F','<p><b>C</b> plain and honest, <b>G</b> sunny, <b>D</b> bright and triumphant, <b>F</b> pastoral and calm, <b>Bb</b> warm and round, <b>Eb</b> heroic, <b>A minor</b> lonely, <b>D minor</b> serious and stormy.</p><p>Try it: play a scale, then write down the color you hear.</p>'],
['Keyboard map','For spatial thinkers.','#C9B79C',kb+'<p>Black keys come in groups of 2 and 3. C is the white key just left of the two-black-key group. Every neighboring key is one half-step.</p>']];
$('#cards').innerHTML=CARDS.map(c=>`<button class="flip" aria-label="Flip card: ${c[0]}"><div class="in"><div class="face" style="background:${c[2]}55"><h3 class="hand text-3xl">${c[0]}</h3><p>${c[1]}</p><p class="text-sm mt-6">Tap to flip</p></div><div class="face back">${c[3]}</div></div></button>`).join('');
$('#cards').onclick=e=>{const c=e.target.closest('.flip');if(c)c.classList.toggle('on')};

const Q=[['Order of sharps?','F C G D A E B (Father Charles Goes Down And Ends Battle)'],['Order of flats?','B E A D G C F (Battle Ends And Down Goes Charles\' Father)'],['How many half-steps in a perfect fifth?','7'],['Relative minor of C major?','A minor'],['Major scale pattern?','W W H W W W H'],['What key has 2 flats?','Bb major (Bb, Eb)'],['Concert Bb on a Bb trumpet is written as...','C'],['How many sharps in D major?','2 (F# and C#)']];
let qi=0;
function deck(){$('#deck').innerHTML=`<button class="flip" style="height:170px;max-width:420px;width:100%" id="qc"><div class="in"><div class="face paper hand text-3xl" style="background:#fff">${Q[qi][0]}</div><div class="face back">${Q[qi][1]}</div></div></button><div class="flex gap-2 mt-3"><button class="btn" data-d="-1">Back</button><button class="btn" data-d="1">Next</button><span class="self-center text-sm">${qi+1} / ${Q.length}</span></div>`}
$('#deck').onclick=e=>{if(e.target.closest('#qc'))$('#qc').classList.toggle('on');const d=e.target.dataset.d;if(d){qi=(qi+ +d+Q.length)%Q.length;deck()}};deck();

const A=[[/flute.*(cold|sharp|flat)|cold|temperature/,'Cold air makes instruments go flat, not sharp. Warm the flute with your breath and the pitch rises. Play a few warm-up notes before you tune.'],
[/flat/,'Order of flats: <b>B E A D G C F</b>. Remember it as "Battle Ends And Down Goes Charles\' Father."'],[/sharp/,'Order of sharps: <b>F C G D A E B</b>. It is just the flats backwards.'],
[/squeak|reed/,'Squeaks on clarinet usually mean too much reed in your mouth, too much bite, or a finger not covering a hole. Try less mouthpiece and firm corners.'],
[/dizzy|lighthead|pass out|breath/,'Stop and sit down if you feel dizzy. Take slower, lower belly breaths, and do not blow harder than the music needs.'],
[/circle|fifth/,'Clockwise on the circle of fifths adds a sharp, counter-clockwise adds a flat. Flip the first theory card to see it.'],
[/practice|warm/,'Short and focused beats long and tired. Try 5 minutes of long tones, 5 of scales, then your hardest 4 bars slowly.'],
[/tune|tuning/,'Play a concert Bb (or A) with a tuner. Sharp means pull out a little, flat means push in.'],
[/hi|hello|hey/,'Hi, I am Mel! Ask me about reeds, scales, tuning or practice.']];
const log=$('#log');
function say(t,c){log.insertAdjacentHTML('beforeend',`<div class="m ${c}">${t}</div>`);log.scrollTop=log.scrollHeight}
function ask(t){say(t.replace(/</g,'&lt;'),'me');const l=t.toLowerCase();setTimeout(()=>say((A.find(a=>a[0].test(l))||[0,'Good question! I do not have an answer for that one yet. Try asking your director or section leader, then tell me what they said.'])[1],'bot'),450)}
$('#chips').innerHTML=['Why is my flute flat when it is cold?','Order of flats?','Clarinet squeaks'].map(t=>`<button class="chip" type="button">${t}</button>`).join('');
$('#chips').onclick=e=>{if(e.target.classList.contains('chip'))ask(e.target.textContent)};
$('#mel').onclick=()=>{const d=$('#drawer');d.hidden=!d.hidden;if(!d.hidden&&!log.children.length)say('Hi, I am Maestro Mel! Ask me a quick music question.','bot')};
$('#x').onclick=()=>$('#drawer').hidden=true;
$('#f').onsubmit=e=>{e.preventDefault();const v=$('#q').value.trim();if(v){ask(v);$('#q').value=''}};
guide();lucide.createIcons();

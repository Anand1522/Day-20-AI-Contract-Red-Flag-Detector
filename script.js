/* ==========================================
   AI CONTRACT RED FLAG DETECTOR
   PART 1
   VARIABLES + DATABASE + ANALYSIS LOGIC
==========================================*/

// =============================
// DOM ELEMENTS
// =============================

const contractInput = document.getElementById("contractInput");

const analyzeBtn = document.getElementById("analyzeBtn");

const clearBtn = document.getElementById("clearBtn");

const scoreValue = document.getElementById("scoreValue");

const riskText = document.getElementById("riskText");

const flagsList = document.getElementById("flagsList");

const keywordContainer = document.getElementById("keywordContainer");

const clauseContainer = document.getElementById("clauseContainer");

const loadingOverlay = document.getElementById("loadingOverlay");

const themeBtn = document.getElementById("themeBtn");

const circle = document.querySelector(".circle");

// =============================
// RISK DATABASE
// =============================

const riskDatabase = [

{

keyword:"terminate",

title:"Termination Clause",

risk:15,

description:
"The contract allows one party to terminate the agreement under certain conditions."

},

{

keyword:"penalty",

title:"Penalty Clause",

risk:18,

description:
"The agreement includes financial penalties or punishment for non-compliance."

},

{

keyword:"late fee",

title:"Late Fee",

risk:10,

description:
"The contract charges additional money if payment is delayed."

},

{

keyword:"liable",

title:"Liability",

risk:12,

description:
"The contract makes one party legally responsible for damages."

},

{

keyword:"indemnify",

title:"Indemnification",

risk:18,

description:
"You may have to compensate another party for losses."

},

{

keyword:"confidential",

title:"Confidentiality",

risk:8,

description:
"You must keep certain information secret."

},

{

keyword:"non compete",

title:"Non-Compete",

risk:15,

description:
"You may not work for competitors after leaving."

},

{

keyword:"arbitration",

title:"Mandatory Arbitration",

risk:12,

description:
"Disputes may have to be resolved outside court."

},

{

keyword:"without notice",

title:"Without Notice",

risk:18,

description:
"Actions can occur without informing you beforehand."

},

{

keyword:"automatic renewal",

title:"Automatic Renewal",

risk:14,

description:
"The agreement renews automatically unless cancelled."

},

{

keyword:"interest",

title:"Interest Charges",

risk:8,

description:
"Interest may be charged on unpaid amounts."

},

{

keyword:"exclusive",

title:"Exclusive Agreement",

risk:10,

description:
"You may be prevented from working with others."

},

{

keyword:"irrevocable",

title:"Irrevocable",

risk:14,

description:
"The decision or permission cannot easily be withdrawn."

},

{

keyword:"waive",

title:"Waiver of Rights",

risk:15,

description:
"You may be giving up important legal rights."

},

{

keyword:"breach",

title:"Breach of Contract",

risk:16,

description:
"The contract defines consequences for breaking its terms."

}

];

// =============================
// ANALYZE BUTTON
// =============================

analyzeBtn.addEventListener("click",function(){

const text = contractInput.value.trim();

if(text===""){

alert("Please paste a contract first.");

return;

}

loadingOverlay.style.display="flex";

setTimeout(function(){

analyzeContract(text);

loadingOverlay.style.display="none";

},1200);

});

// =============================
// MAIN ANALYSIS
// =============================

function analyzeContract(text){

const content=text.toLowerCase();

let score=0;

let detectedFlags=[];

let detectedKeywords=[];

let detectedClauses=[];

riskDatabase.forEach(function(item){

if(content.includes(item.keyword.toLowerCase())){

score+=item.risk;

detectedFlags.push(item.title);

detectedKeywords.push(item.keyword);

detectedClauses.push(item);

}

});

// Maximum Risk

if(score>100){

score=100;

}

// Update UI
// (Implemented in Part 2)

updateRiskUI(

score,

detectedFlags,

detectedKeywords,

detectedClauses

);

}

/* ==========================================
   AI CONTRACT RED FLAG DETECTOR
   PART 2
   UPDATE UI + SCORE + FLAGS + KEYWORDS
==========================================*/

// =============================
// UPDATE COMPLETE UI
// =============================

function updateRiskUI(

score,

flags,

keywords,

clauses

){

updateScore(score);

updateRiskLevel(score);

updateFlags(flags);

updateKeywords(keywords);

updateClauses(clauses);

}

// =============================
// UPDATE SCORE
// =============================

function updateScore(score){

scoreValue.textContent=score;

const degree=(score/100)*360;

let color="#22c55e";

if(score>=70){

color="#ef4444";

}
else if(score>=40){

color="#f59e0b";

}

circle.style.background=

`conic-gradient(
${color} ${degree}deg,
#dcdcdc ${degree}deg
)`;

}

// =============================
// RISK LEVEL
// =============================

function updateRiskLevel(score){

if(score>=70){

riskText.textContent="High Risk Contract";

riskText.style.color="#ef4444";

}

else if(score>=40){

riskText.textContent="Medium Risk Contract";

riskText.style.color="#f59e0b";

}

else if(score>0){

riskText.textContent="Low Risk Contract";

riskText.style.color="#22c55e";

}

else{

riskText.textContent="No Risk Detected";

riskText.style.color="#22c55e";

}

}

// =============================
// RED FLAGS
// =============================

function updateFlags(flags){

flagsList.innerHTML="";

if(flags.length===0){

flagsList.innerHTML=

"<li>No red flags detected.</li>";

return;

}

flags.forEach(function(flag){

const li=document.createElement("li");

li.classList.add("fade-in");

li.innerHTML=

`<strong>⚠ ${flag}</strong>`;

flagsList.appendChild(li);

});

}

// =============================
// KEYWORDS
// =============================

function updateKeywords(keywords){

keywordContainer.innerHTML="";

if(keywords.length===0){

keywordContainer.innerHTML=

'<span class="keyword">None</span>';

return;

}

keywords.forEach(function(word){

const span=document.createElement("span");

span.className="keyword fade-in";

span.textContent=word;

keywordContainer.appendChild(span);

});

}

// =============================
// CLAUSES
// =============================

function updateClauses(clauses){

clauseContainer.innerHTML="";

if(clauses.length===0){

clauseContainer.innerHTML=

'<div class="clause">No risky clauses detected.</div>';

return;

}

clauses.forEach(function(item){

const div=document.createElement("div");

div.className="clause fade-in";

div.innerHTML=`

<h3>${item.title}</h3>

<p>${item.description}</p>

<p><strong>Risk Score:</strong> +${item.risk}</p>

`;

clauseContainer.appendChild(div);

});

}

/* ==========================================
   AI CONTRACT RED FLAG DETECTOR
   PART 3
   DARK MODE + CLEAR + ANIMATION + SHORTCUTS
==========================================*/

// =============================
// ANIMATED SCORE COUNTER
// =============================

function animateScore(target){

let current=0;

const speed=20;

const timer=setInterval(function(){

if(current>=target){

clearInterval(timer);

scoreValue.textContent=target;

return;

}

current++;

scoreValue.textContent=current;

},speed);

}

// Override updateScore to include animation
const originalUpdateScore = updateScore;

updateScore = function(score){

animateScore(score);

const degree=(score/100)*360;

let color="#22c55e";

if(score>=70){

color="#ef4444";

}
else if(score>=40){

color="#f59e0b";

}

circle.style.background=
`conic-gradient(
${color} ${degree}deg,
#dcdcdc ${degree}deg
)`;

};

// =============================
// CLEAR BUTTON
// =============================

clearBtn.addEventListener("click",function(){

contractInput.value="";

scoreValue.textContent="0";

riskText.textContent="Waiting for Analysis...";

riskText.style.color="";

flagsList.innerHTML="<li>No contract analyzed yet.</li>";

keywordContainer.innerHTML='<span class="keyword">None</span>';

clauseContainer.innerHTML=
'<div class="clause">Analyze a contract to see detailed clause explanation.</div>';

circle.style.background=
"conic-gradient(#ef4444 0deg,#dcdcdc 0deg)";

});

// =============================
// DARK MODE
// =============================

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click",function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}
else{

localStorage.setItem("theme","light");

themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

}

});

// =============================
// CTRL + ENTER TO ANALYZE
// =============================

document.addEventListener("keydown",function(e){

if(e.ctrlKey && e.key==="Enter"){

analyzeBtn.click();

}

});

// =============================
// SAMPLE CONTRACT
// =============================

window.addEventListener("load",function(){

contractInput.placeholder=
`Example:

This agreement includes a penalty for late payment.

The company may terminate this agreement without notice.

The employee agrees to indemnify the company.

This agreement contains an automatic renewal clause.

Paste your own contract here...`;

});

// =============================
// END
// =============================

console.log("✅ AI Contract Red Flag Detector Loaded Successfully");


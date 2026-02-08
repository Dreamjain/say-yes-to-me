const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.querySelector(".card");
const heartsContainer = document.getElementById("hearts-container");
const yesOverlay = document.getElementById("yes-overlay");
const dayEl = document.getElementById("day");
const valentineDays = [
  { date: 7, name: "Rose Day 🌹" },
  { date: 8, name: "Propose Day 💌" },
  { date: 9, name: "Chocolate Day 🍫" },
  { date: 10, name: "Teddy Day 🧸" },
  { date: 11, name: "Promise Day 🤝" },
  { date: 12, name: "Hug Day 🫂" },
  { date: 13, name: "Kiss Day 👉👈" },
  { date: 14, name: "Valentine's Day ❤️" }
];

function updateValentineDay() {      
  const today = new Date();
  const currentDate = today.getDate();

  const todayEvent = valentineDays.find(d => d.date === currentDate);

  if (todayEvent) {
    dayEl.innerText = todayEvent.name;
  } else {
    dayEl.innerText = "Valentine Week 💕";
  }
}

function getQuestionsForToday() {

  const today = new Date();
  const date = today.getDate();

  let daySpecific;

  if (date === 7) daySpecific = questionsByDay.rose;
  else if (date === 8) daySpecific = questionsByDay.propose;
  else if (date === 12) daySpecific = questionsByDay.hug;
  else if (date === 14) daySpecific = questionsByDay.valentine;
  else daySpecific = questionsByDay.valentine;

  // combine day-specific + shared teasing
  return [...daySpecific, ...sharedTeasingQuestions];
}


const sharedTeasingQuestions = [

  "Are you sure? 🥺",
  "That hurt 😭",
  "Still no?? 😳",
  "You enjoy this, don't you 😈",
  "We're bonded now 😂",
  "JUST SAY YES ❤️",
  "There is no escape 😈💖",

  // Soft teasing 💕
  "So… is that a NO or are you just shy? 😌",
  "Take your time, but don't take too long 😏",
  "Careful… clicking NO increases my charm ✨",
  "I knew you'd hesitate 😌",
  "That NO looked suspiciously weak 👀",

  // Flirty teasing 😈
  "You sure you can handle saying no to me? 😏",
  "Go on… press NO again, I dare you 😌",
  "This is cute, but we both know the ending 😘",
  "You're smiling right now, aren't you? 😏",
  "Denial looks good on you 😌",

  // Playful drama 🎭
  "Wow. Straight to NO. Bold choice 😳",
  "My imaginary heartbreak just activated 💔",
  "I'll recover… probably… maybe 😔",
  "That was rude, but I respect the confidence 😌",
  "I should've known you'd play hard to get 😏",

  // Romantic pressure 💖
  "Imagine us laughing about this later 💕",
  "This could be our 'how it started' story 😌",
  "Every great love starts with denial 😏",
  "You don't feel it yet… but you will 😎",
  "Romantic tension level: increasing 📈",

  // Unapologetic teasing 😈
  "Okay, now you're just flirting with the NO button 😏",
  "At this point, the button and I are competing for you 😌",
  "Be honest… you like being chased 😉",
  "This resistance is very attractive, by the way 😌",
  "You're really testing my patience now 😏",

  // Cute manipulation 😇
  "What if I say please… very nicely? 🥺",
  "I'd share my chocolates with you 🍫",
  "I'd even give you the bigger half 😌",
  "I make great company, just saying 😏",
  "You won't regret this… probably 😇",

  // Confident romance 😎
  "We both know you're not escaping this 😌",
  "You can click NO, but fate is stubborn 😏",
  "Some stories refuse to end early 💖",
  "This is the slow-burn romance version 😘",
  "I'm very patient… dangerously patient 😌",

  // Final boss 😈💘
  "Alright, enough games… or maybe not 😏",
  "This NO is getting tired, unlike me 😌",
  "Every click just proves you care 😘",
  "You're still here… that says a lot 😏",
  "Go on… click NO again. I'll wait 😈💖"

];



const questionsByDay = {

  rose: [
    "Will you accept this rose? 🌹",
    "A rose for someone special… maybe you 😌"
  ],

  propose: [
    "So… will you be mine? 💌",
    "This feels like a proposal moment 😳"
  ],

  hug: [
    "Virtual hug incoming 🤗",
    "Warm hugs fix everything 😌"
  ],

  valentine: [
    "This is THE question ❤️",
    "Final boss romance activated 😈",
    "Will you be my Valentine? 💖"
  ]
};


let noCount = 0;

/* Initial NO position (bottom of card) */
function placeNoInitial() {
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  noBtn.style.left = (cardRect.width / 2 - btnRect.width / 2) + "px";
  noBtn.style.top = (cardRect.height + 12) + "px";
}

placeNoInitial();
window.addEventListener("resize", placeNoInitial);

updateValentineDay();


/* Move NO around card */
function moveNoAroundCard() {
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const gap = 12;

  const positions = [
    { x: cardRect.width / 2 - btnRect.width / 2, y: -btnRect.height - gap },          
    { x: cardRect.width / 2 - btnRect.width / 2, y: cardRect.height + gap },         
    { x: -btnRect.width - gap, y: cardRect.height / 2 - btnRect.height / 2 },        
    { x: cardRect.width + gap, y: cardRect.height / 2 - btnRect.height / 2 }         
  ];

  const pos = positions[Math.floor(Math.random() * positions.length)];
  noBtn.style.left = pos.x + "px";
  noBtn.style.top = pos.y + "px";
}

/* Hearts */
function createHearts(x, y) {
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }
}
function celebrateYes() {

  let count = 0;

  const interval = setInterval(() => {

    for (let i = 0; i < 6; i++) {   

      const heart = document.createElement("div");
      heart.innerText = "🩷";
      heart.className = "heart-rain";

      heart.style.left = Math.random() * window.innerWidth + "px";

      // random size for natural effect
      heart.style.fontSize = (16 + Math.random() * 30) + "px";

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 4000);
    }

    count++;

    // celebration duration
    if (count > 25) {
      clearInterval(interval);
    }

  }, 60);   
}



/* NO click */
noBtn.addEventListener("click", (e) => {
  const todayQuestions = getQuestionsForToday();

questionEl.innerText =
  todayQuestions[noCount % todayQuestions.length];

  noCount++;

  questionEl.classList.remove("question-animate");
  void questionEl.offsetWidth;
  questionEl.classList.add("question-animate");

  moveNoAroundCard();

  card.classList.add("shake");
  setTimeout(() => card.classList.remove("shake"), 150);

  createHearts(e.clientX, e.clientY);
});

/* YES click */
yesBtn.addEventListener("click", () => {

  // fade out card + question
  card.style.opacity = "0";
  questionEl.style.opacity = "0";

  // disable buttons
  noBtn.style.display = "none";
  yesBtn.style.display = "none";

  // show romantic overlay after small delay
  setTimeout(() => {
    yesOverlay.classList.add("show");
  }, 300);
});

yesBtn.addEventListener("click", () => {

  document.body.style.backgroundImage = 'url("images/after.jpeg")';


  // fade out card + question
  card.style.opacity = "0";
  questionEl.style.opacity = "0";

  // disable buttons
  noBtn.style.display = "none";
  yesBtn.style.display = "none";

  // 💖 start celebration
  celebrateYes();

  // show romantic overlay after small delay
  setTimeout(() => {
    yesOverlay.classList.add("show");
  }, 300);
});

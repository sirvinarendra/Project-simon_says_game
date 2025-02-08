// // simon says game with async and await keyword used and event handling.
let userseq = [];
let gameseq = [];
let level = 0;
let started = false;
let hs = document.querySelector(".highestscore");
hs.innerText = localStorage.getItem('highestscore');


let title = document.querySelector(".levelupdate");

function startplay() {
  hs.innerText = localStorage.getItem('highestscore');

  if (started == false) {
    started = true;
    levelup();
    gameboxblink(level);
    console.log("gameseq:", gameseq);

    let allbtns = document.querySelectorAll(".box");
    for (btn of allbtns) {
      btn.addEventListener("click", btnpress);
    }
  }
}

//1 level up function
function levelup() {
  level++;
  title.innerText = `Level : ${level}`;
}

//2  checkans function
function checkans(l) {
  idx = l - 1;
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      userseq = [];
      gameseq = [];
      started = false;
      startplay();
    }
  } else {
    gameover();
    if(level!=0){
      --level;
    }
   
    
    if (localStorage.getItem("highestscore") < level) {
      localStorage.setItem("highestscore", level);
      console.log('highestscore: ',localStorage.getItem("highestscore"))
    }
    title.innerHTML = `Game over ! your score : <b>${level}</b> . <br> Press Play button to play again `;
    started = false;
    level = 0;
    userseq = [];
    gameseq = [];
  }
}

//3 btn press function
function btnpress() {
  let btncolor = this.getAttribute("id");
  userboxblink(btncolor);
  userseq.push(btncolor);
  console.log("Userseq : ", userseq);
  console.log("level : ", level);
  checkans(userseq.length);
}

function randomcol() {
  let arr = ["red", "yellow", "blue", "green"];
  let ran = Math.floor(Math.random() * 4);
  return arr[ran];
}

function getblinkcol(col) {
  return new Promise((resolve, reject) => {
    let x = document.querySelector(`#${col}`);

    setTimeout(() => {
      x.classList.add("blink");
      setTimeout(() => {
        x.classList.remove("blink");
      }, 300);

      resolve("promise resolved");
    }, 600);
  });
}

async function gameboxblink(x) {
  for (let i = 0; i < x; i++) {
    let col = randomcol();
    await getblinkcol(col);
    gameseq.push(col);
  }
}

function userboxblink(color) {
  let x = document.querySelector(`.${color}`);

  x.classList.add("blinkbb");
  setTimeout(() => {
    x.classList.remove("blinkbb");
    x.add;
  }, 300);
}
function gameover() {
  let x = document.querySelector("body");
  x.classList.add("fullred");
  setTimeout(() => {
    x.classList.remove("fullred");
  }, 150);
}

// todo list app code with event delegation and event bubbling

// let inptext=document.querySelector('.inp');
// let addb=document.querySelector('.addbtn');
// let ul=document.querySelector('ul');

// addb.addEventListener('click',function(){
//   let x=document.createElement('li');
//   x.innerText=inptext.value;

//   let delbtn=document.createElement('button');
//   delbtn.innerText="delete";
//   delbtn.classList.add("delete");

//   x.appendChild(delbtn);
//   ul.appendChild(x);
//   inptext.value='';
//   })

//  ul.addEventListener('click',function(event){

//   if(event.target.nodeName=='BUTTON'){
//     let z=event.target.parentElement;
//    z.remove();
//   }

//  })

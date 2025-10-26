const memoryCards = document.querySelectorAll('.pictures-container');
const userOneDiv = document.querySelector('.user-one');
const userTwoDiv = document.querySelector('.user-two');
const userOneScore = document.querySelector('.score-one');
const userTwoScore = document.querySelector('.score-two');
const restartBtn = document.querySelector('.restart-Btn');

let islocked = false;
let isflipped = false;
let firstCard;
let secondCard;
let user1Turn = true;
let user2Turn = false;
let user1Score = 0;
let user2Score = 0;

ChangeUser();

function flipCard(){
  
  if(islocked) return;
  if(this === firstCard) return;
  this.classList.add('flip');
  if(!isflipped){
    firstCard = this;
    isflipped = true;
  }else{
    secondCard = this;
    isflipped = false;
    //console.log(firstCard.dataset.animal,secondCard.dataset.animal)
    if(firstCard.dataset.animal !== secondCard.dataset.animal){
      islocked = true;
      setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        islocked = false;
      },1500);
      ChangeUser();
    }else{
      firstCard.removeEventListener('click',flipCard);
      secondCard.removeEventListener('click',flipCard);
      if(user1Turn && !user2Turn){
        user1Score ++;
      }else{
        user2Score ++;
      }
    }
    //console.log(user1Score,user2Score);
    showScore();
    //userTwoScore.innerHTML = `User One Score: ${user1Score}`;
    //userOneScore.innerHTML = `User Two Score: ${user2Score}`;
  };
};

function showScore(){
  userTwoScore.innerHTML = `User One Score: ${user1Score}`;
  userOneScore.innerHTML = `User Two Score: ${user2Score}`;
}

function ChangeUser(){
  if(user1Turn && !user2Turn){
    userTwoDiv.classList.remove('yourTurn');
    userOneDiv.classList.add('yourTurn');
    user1Turn = false;
    user2Turn = true;
  }else{
    userOneDiv.classList.remove('yourTurn');
    userTwoDiv.classList.add('yourTurn');
    user1Turn = true;
    user2Turn = false;
  }
}
  

(function shufflePosition(){
  memoryCards.forEach(card => {
    randomPosition = Math.floor(Math.random() * 16);
    card.style.order = randomPosition;
  })
})();

memoryCards.forEach(card=>{
  card.addEventListener('click', flipCard);
});

restartBtn.addEventListener('click',()=>{

  islocked = false;
  isflipped = false;
  user1Score = 0;
  user2Score = 0;

  memoryCards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  showScore();
  shufflePosition();
  ChangeUser();

})